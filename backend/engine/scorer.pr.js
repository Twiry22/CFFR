/**
 * CFFR Professional — Scoring Engine  v1.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Separate from the High School engine (scorer.js), which is untouched.
 *
 * Scores every one of the 21 sectors in sectors.pr.js, ranks them, then picks
 * a specific career field (careerfields.pr.js) inside each of the top 3.
 *
 * FACTOR WEIGHTS (sum to 100%)
 *   Market Demand        25%   sector demand now (+ Q12, Q18 reach)
 *   Future Relevance     25%   3-year stability: growth + demand, and how well
 *                              the person fits the sector's pace of change (Q10, Q11, Q12)
 *   Aptitude             20%   strengths (Q4, Q5, Q6) + what they studied (Q1, Q2)
 *   Previous Experience  20%   Track Record: months in this sector or a related one
 *   Accessibility         5%   county tier, relocation, commute, network, internet
 *   Interest              5%   Q7 career fields, Q8 enjoyed tasks, Q13 growing sectors
 *
 * DEALBREAKERS (Q9) are applied AFTER the weighted total as a multiplier, so a
 * "workplace nightmare" pulls a sector down hard instead of being drowned out
 * by a 5% factor. Floor ×0.60.
 *
 * QUALIFICATION GATES: careers like Accountant, Engineer, Nurse or Advocate need
 * a matching qualification (studyfields.pr.js gates) or a Track Record entry in
 * that field. Gated careers are never recommended without one; the sector can
 * still rank, with a non-gated career picked inside it.
 *
 * SECTOR TRAIT CODES (sectors.pr.js `defaults`) — meanings as read by this file.
 * ⚠ Inferred from the Q9 effects and the values; confirm and fix here if wrong.
 *   t  pace of tech change in the field (1–5)        → Q10
 *   e  share of work that is new / still forming (0–1) → Q11 "emerging"
 *   m  depth of mastery the field rewards (1–5)       → Q11 "mastery"
 *   r  share of roles that can be done remotely (0–1)  → Q15, Q18
 *   st structure / fixed routine (1–5)                → Q9 "rigid 9-to-5"
 *   nu numbers & screen work (1–5)                    → Q9 "behind screens"
 *   pe people contact (1–5)                           → Q9 "people all day"
 *   fx fixing / hands-on repair (1–5)                 → Q9 "fixing broken things"
 *   sw shift work (1–5)                               → Q9 "shiftwork"
 *   fw fieldwork (1–5)                                → Q9 "constant fieldwork"
 *   h  not used yet (meaning unconfirmed)
 */

const { SECTORS }       = require("../data/sectors.pr");
const { COUNTIES }      = require("../data/counties.pr");
const { STUDY_FIELDS }  = require("../data/studyfields.pr");
const { CAREER_FIELDS } = require("../data/careerfields.pr");
const { QUESTIONS }     = require("../data/question.pr");

const WEIGHTS = {
  marketDemand:    0.25,
  futureRelevance: 0.25,
  aptitude:        0.20,
  experience:      0.20,
  accessibility:   0.05,
  interest:        0.05,
};

const DEALBREAKER_FLOOR = 0.60;

// Half the score (market demand + future relevance) is the same for everyone,
// so on its own it would push hot sectors onto people with no link to them.
// A sector can only make the top 3 if at least one of these personal factors
// clears its bar. If fewer than 3 sectors qualify, the rest fill by score.
const PERSONAL_FIT_BARS = { aptitude: 40, experience: 30, interest: 40 };

// ─── Lookups ─────────────────────────────────────────────────────────────────

const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
const FIELD_BY_ID    = Object.fromEntries(CAREER_FIELDS.map((f) => [f.id, f]));
const STUDY_BY_ID    = Object.fromEntries(STUDY_FIELDS.map((s) => [s.id, s]));
const COUNTY_BY_ID   = Object.fromEntries(COUNTIES.map((c) => [c.id, c]));
const SECTOR_IDS     = Object.keys(SECTORS);

const NO_FIELD_IDS = ["other-havent-worked", "other-not-listed"];

/** The answer's option object (looked up by option id), or null. */
function optionOf(qid, optionId) {
  const q = QUESTION_BY_ID[qid];
  if (!q || optionId == null) return null;
  return q.options.find((o) => o.id === optionId) || null;
}

/** The option's `value` (falls back to the id itself). */
function valueOf(qid, optionId) {
  const o = optionOf(qid, optionId);
  return o ? (o.value !== undefined ? o.value : o.id) : null;
}

const asArray = (v) => (Array.isArray(v) ? v : v != null && v !== "" ? [v] : []);

/** [[pick, weight]] with weights summing to 1, like the High School engine. */
function weightedPicks(raw, maxPicks) {
  const picks = asArray(raw).slice(0, maxPicks);
  return picks.map((p) => [p, 1 / picks.length]);
}

const clamp = (n, lo = 0, hi = 100) => Math.min(Math.max(n, lo), hi);

// ─── Strengths (skills) ──────────────────────────────────────────────────────
// Same 8 skill codes as Q4/Q8: num spk ops fix cre led tea car

const SKILL_LABELS = {
  num: "working with numbers and data",
  spk: "talking to people and building relationships",
  ops: "organising and keeping things on track",
  fix: "fixing, building and troubleshooting",
  cre: "writing, designing and creating",
  led: "leading and rallying people",
  tea: "teaching and explaining",
  car: "caring for and supporting people",
};

const Q5_SKILL = {
  q5a: "num", q5b: "cre", q5c: "fix", q5d: "ops", q5e: "cre", q5f: "spk",
  q5g: "ops", q5h: "fix", q5i: "car", q5j: "spk", q5k: "ops", q5l: "ops",
};
const Q6_SKILL = {
  q6a: "num", q6b: "spk", q6c: "ops", q6d: "fix",
  q6e: "cre", q6f: "led", q6g: "tea", q6h: "car",
};

/** Which strengths each sector leans on: [primary skills, secondary skills]. */
const SECTOR_SKILLS = {
  tech:        [["fix", "num"], ["cre", "ops"]],
  data:        [["num"],        ["fix", "ops"]],
  finance:     [["num", "ops"], ["spk"]],
  business:    [["ops", "led"], ["spk", "num"]],
  sales:       [["spk"],        ["cre", "led"]],
  health:      [["car"],        ["tea", "ops"]],
  edu:         [["tea"],        ["car", "spk"]],
  social:      [["car", "spk"], ["ops", "tea"]],
  law:         [["spk", "ops"], ["cre", "led"]],
  eng:         [["fix", "num"], ["ops", "led"]],
  energy:      [["fix", "num"], ["ops"]],
  agri:        [["fix", "ops"], ["num"]],
  trades:      [["fix"],        ["ops"]],
  manuf:       [["fix", "ops"], ["num"]],
  logistics:   [["ops"],        ["num", "spk"]],
  hospitality: [["spk", "car"], ["ops"]],
  creative:    [["cre"],        ["spk"]],
  security:    [["led", "car"], ["ops", "fix"]],
  property:    [["spk"],        ["num", "ops"]],
  science:     [["num"],        ["fix", "cre"]],
  personal:    [["car", "cre"], ["spk"]],
};

/** 1 for a primary skill of the sector, 0.5 for secondary, else 0. */
function skillFit(sectorId, skill) {
  const [primary, secondary] = SECTOR_SKILLS[sectorId] || [[], []];
  if (primary.includes(skill)) return 1;
  if (secondary.includes(skill)) return 0.5;
  return 0;
}

// ─── Qualification gates ─────────────────────────────────────────────────────

const GATED_FIELDS = {
  "fin-accounting": "acct", "fin-auditing": "acct", "fin-forensic": "acct",
  "eng-civil": "eng", "eng-mechanical": "eng", "eng-electrical": "eng", "eng-mining": "eng",
  "eng-industrial": "eng", "eng-marine-eng": "eng", "eng-aeronautical": "eng",
  "eng-architecture": "arch", "eng-quantity-surveying": "arch", "eng-surveying": "arch",
  "health-medicine": "health", "health-nursing": "health", "health-midwifery": "health",
  "health-clinical-officer": "health", "health-lab": "health", "health-dental": "health",
  "health-physio": "health", "health-radiography": "health", "health-optometry": "health",
  "health-nutrition": "health", "health-occupational-therapy": "health",
  "health-speech-therapy": "health",
  "health-pharmacy": "pharm",
  "health-veterinary": "vet",
  "edu-primary": "edu", "edu-secondary": "edu", "edu-ecde": "edu", "edu-special-needs": "edu",
  "law-legal-practice": "law", "law-judiciary": "law",
};

const GATE_LABELS = {
  acct: "an accounting qualification (e.g. CPA)",
  eng:  "an engineering degree and EBK registration",
  arch: "an architecture or surveying qualification",
  health: "a health qualification and council registration",
  pharm: "a pharmacy qualification and PPB registration",
  vet:  "a veterinary qualification",
  edu:  "a teaching qualification and TSC registration",
  law:  "a law degree and admission to the bar",
};

// ─── Track Record parsing ────────────────────────────────────────────────────

const TYPE_WEIGHT = {
  fulltime: 1, parttime: 0.6, gig: 0.7, internship: 0.5, attachment: 0.4, volunteer: 0.4,
};
const DEFAULT_TYPE_WEIGHT = 0.8;   // type left blank (it's optional now)
const DEFAULT_MONTHS      = 6;     // duration we couldn't read

/** "2 months", "3 yrs", "1.5 years", "a year", "2 years 6 months", "6 weeks" → months */
function parseDurationMonths(text) {
  const s = String(text || "").toLowerCase().replace(/\ban?\b/g, "1");
  let months = 0;
  let matched = false;
  const re = /(\d+(?:\.\d+)?)\s*(years?|yrs?|y\b|months?|mos?|mths?|m\b|weeks?|wks?|w\b|days?|d\b)/g;
  let m;
  while ((m = re.exec(s))) {
    const n = parseFloat(m[1]);
    const unit = m[2][0];
    matched = true;
    if (unit === "y") months += n * 12;
    else if (unit === "m") months += n;
    else if (unit === "w") months += n / 4.33;
    else if (unit === "d") months += n / 30;
  }
  if (!matched) {
    const bare = s.match(/(\d+(?:\.\d+)?)/);    // a bare number → assume months
    return bare ? Math.min(parseFloat(bare[1]), 600) : DEFAULT_MONTHS;
  }
  return Math.min(months, 600);
}

/** Normalised Track Record entries: { fieldId, sectorId|null, months, effective } */
function readHistory(history) {
  return asArray(history)
    .filter((e) => e && typeof e === "object")
    .map((e) => {
      const fieldId  = e.sector;
      const field    = FIELD_BY_ID[fieldId];
      const sectorId = field && !NO_FIELD_IDS.includes(fieldId) ? field.sector : null;
      const months   = parseDurationMonths(e.duration);
      const weight   = TYPE_WEIGHT[e.type] ?? DEFAULT_TYPE_WEIGHT;
      return { title: String(e.title || "").trim(), fieldId, sectorId, months, effective: months * weight };
    })
    .filter((e) => e.fieldId !== "other-havent-worked");
}

// ─── Profile built once from the answers ─────────────────────────────────────

function buildProfile(answers, history) {
  const study      = STUDY_BY_ID[valueOf("q2", answers.q2)] || STUDY_BY_ID.none;
  const eduLevel   = Number(valueOf("q1", answers.q1)) || 1;
  const roles      = readHistory(history);

  const gates = new Set(study.gates);
  roles.forEach((r) => { if (GATED_FIELDS[r.fieldId]) gates.add(GATED_FIELDS[r.fieldId]); });

  // Strength weights: Q4 (30), Q5 (24 split across picks), Q6 (20)
  const strengths = {};
  const add = (skill, pts) => { if (skill) strengths[skill] = (strengths[skill] || 0) + pts; };
  if (answers.q4 && SKILL_LABELS[answers.q4]) add(answers.q4, 30);
  weightedPicks(answers.q5, 2).forEach(([id, w]) => add(Q5_SKILL[id], 24 * w));
  add(Q6_SKILL[answers.q6], 20);

  const avoid = asArray(answers.q9)
    .map((id) => optionOf("q9", id)?.effects?.avoid)
    .filter(Boolean);

  const county  = COUNTY_BY_ID[valueOf("q14", answers.q14)];
  const q18     = valueOf("q18", answers.q18) || { internet: 1, reach: "local" };

  return {
    study, eduLevel, roles, gates, strengths, avoid,
    totalMonths:   roles.reduce((s, r) => s + r.effective, 0),
    q7Fields:      asArray(answers.q7).filter((id) => FIELD_BY_ID[id] && !NO_FIELD_IDS.includes(id)),
    q8:            asArray(answers.q8).filter((id) => SKILL_LABELS[id]),
    q13Sectors:    asArray(answers.q13).map((id) => String(id).replace(/^grow-/, "")),
    toolReaction:  valueOf("q10", answers.q10),           // excited | fine | avoid
    craftPull:     valueOf("q11", answers.q11),           // mastery | emerging | both
    hiringMatters: valueOf("q12", answers.q12),           // essential | matters | gamble
    relocation:    valueOf("q16", answers.q16),           // domestic | abroad | maybe | no
    countyTier:    county ? county.tier : 3,
    countyLabel:   county ? county.label : null,
    commute:       Number(valueOf("q15", answers.q15)) || 2, // 1–4 (4 = wants remote)
    network:       Number(valueOf("q17", answers.q17)) || 0, // 0–3
    internet:      q18.internet,
    reach:         q18.reach,
  };
}

// ─── Factor 1: Market Demand (25%) ───────────────────────────────────────────

function calcMarketDemand(p, sectorId) {
  const s = SECTORS[sectorId];
  let score = (s.demand / 5) * 100;

  // Q12: for someone who needs to land somewhere in demand, hot markets
  // count for more and slow ones for less.
  if (p.hiringMatters === "essential") {
    if (s.demand >= 4) score += 8;
    if (s.demand <= 2) score -= 12;
  }

  // Q18: open to remote work for companies outside Kenya → remote-friendly
  // sectors have a bigger job market for this person.
  if (p.reach === "global" && p.internet >= 2) score += s.defaults.r * 15;

  return Math.round(clamp(score));
}

// ─── Factor 2: Future Relevance (25%) — 3-year stability ─────────────────────

function calcFutureRelevance(p, sectorId) {
  const s = SECTORS[sectorId];
  const d = s.defaults;

  // Stability over ~3 years: mostly growth, steadied by today's demand.
  let score = ((s.growth * 0.7 + s.demand * 0.3) / 5) * 85;

  // Q10: how they react to new tools vs how fast the field changes.
  if (p.toolReaction === "excited")    score += d.t * 3;            // up to +15
  else if (p.toolReaction === "avoid") score -= Math.max(d.t - 2, 0) * 6; // up to −18

  // Q11: what kind of field pulls them.
  if (p.craftPull === "mastery")       score += d.m * 2;            // up to +10
  else if (p.craftPull === "emerging") score += d.e * 15;           // up to +12
  else if (p.craftPull === "both")     score += d.m + d.e * 7;

  // Q12: willing to gamble on something newer → fast-growing fields count more.
  if (p.hiringMatters === "gamble" && s.growth >= 5) score += 8;

  return Math.round(clamp(score));
}

// ─── Factor 3: Aptitude (20%) ────────────────────────────────────────────────

function calcAptitude(p, sectorId) {
  let score = 0;

  // Strengths: up to 74 pts from Q4/Q5/Q6
  for (const [skill, pts] of Object.entries(p.strengths)) {
    score += pts * skillFit(sectorId, skill);
  }

  // What they studied: head start toward its related sectors
  const idx = p.study.sectors.indexOf(sectorId);
  if (idx === 0) score += 22;
  else if (idx > 0) score += 14;

  // Level of education: small, general lift (Certificate 2 … Master's 5)
  score += ((p.eduLevel - 1) / 4) * 8;

  return Math.round(clamp(score));
}

// ─── Factor 4: Previous Experience (20%) ─────────────────────────────────────

function calcExperience(p, sectorId) {
  const related = SECTORS[sectorId].related;
  let direct = 0;
  let near = 0;
  for (const r of p.roles) {
    if (r.sectorId === sectorId) direct += r.effective;
    else if (r.sectorId && related.includes(r.sectorId)) near += r.effective;
  }
  const relevant = direct + near * 0.5;

  // Diminishing returns: 1 yr ≈ 34, 2 yrs ≈ 54, 4 yrs ≈ 74 of the 85.
  const relevantPts = 85 * (1 - Math.exp(-relevant / 24));
  // Any work at all shows employability: up to 15.
  const generalPts  = 15 * (1 - Math.exp(-p.totalMonths / 24));

  return Math.round(clamp(relevantPts + generalPts));
}

// ─── Factor 5: Accessibility (5%) ────────────────────────────────────────────

function calcAccessibility(p, sectorId) {
  const r = SECTORS[sectorId].defaults.r;
  let score = 0;

  // Where they are, softened by willingness to move
  let geo = p.countyTier * 12;                                         // 12–60
  if (p.relocation === "domestic" || p.relocation === "abroad") geo = Math.max(geo, 60);
  else if (p.relocation === "maybe") geo = Math.max(geo, 45);
  score += geo;

  // Commute / remote preference against how remote-able the sector is
  if (p.commute === 4) score += r * 20 - (1 - r) * 15;                 // wants remote
  else score += (p.commute - 1) * 5;                                   // 0–10

  // Internet makes remote-friendly sectors reachable from anywhere
  score += (p.internet / 2) * r * 15;

  // Knowing people in the field
  score += p.network * 5;                                              // 0–15

  return Math.round(clamp(score));
}

// ─── Factor 6: Interest (5%) ─────────────────────────────────────────────────

function calcInterest(p, sectorId) {
  const related = SECTORS[sectorId].related;
  let score = 0;

  for (const id of p.q7Fields) {
    const sec = FIELD_BY_ID[id].sector;
    if (sec === sectorId) score += 40;
    else if (related.includes(sec)) score += 10;
  }
  weightedPicks(p.q8, 2).forEach(([skill, w]) => { score += 25 * w * skillFit(sectorId, skill); });
  if (p.q13Sectors.includes(sectorId)) score += 20;

  return Math.round(clamp(score));
}

// ─── Dealbreakers (Q9) ───────────────────────────────────────────────────────

const AVOID_TRAIT = {
  structure: "st", numbers: "nu", people: "pe", fixing: "fx", shiftwork: "sw", fieldwork: "fw",
};
const AVOID_LABELS = {
  structure: "a rigid 9-to-5", numbers: "being behind screens all day",
  people: "dealing with people all day", fixing: "fixing broken things",
  shiftwork: "shift work", fieldwork: "constant fieldwork",
};

function dealbreakerMultiplier(p, sectorId) {
  const d = SECTORS[sectorId].defaults;
  let mult = 1;
  const hits = [];
  for (const avoid of p.avoid) {
    const level = d[AVOID_TRAIT[avoid]] || 0;
    if (level >= 5)      { mult *= 0.80; hits.push(avoid); }
    else if (level >= 4) { mult *= 0.88; hits.push(avoid); }
  }
  return { mult: Math.max(mult, DEALBREAKER_FLOOR), hits };
}

// ─── Picking a specific career inside a sector ───────────────────────────────

function isOpen(fieldId, p) {
  const gate = GATED_FIELDS[fieldId];
  return !gate || p.gates.has(gate);
}

function pickCareers(p, sectorId) {
  const inSector = CAREER_FIELDS.filter((f) => f.sector === sectorId && !NO_FIELD_IDS.includes(f.id));
  const score = (f) => {
    let pts = 0;
    if (p.q7Fields.includes(f.id)) pts += 100;                       // they asked for it
    pts += p.roles.filter((r) => r.fieldId === f.id).reduce((s, r) => s + 20 + r.effective, 0);
    return pts;
  };
  const ranked = inSector
    .map((f, i) => ({ f, pts: score(f), i }))
    .sort((a, b) => b.pts - a.pts || a.i - b.i);

  const openRanked = ranked.filter((x) => isOpen(x.f.id, p));
  const open   = openRanked.map((x) => x.f);
  // Nothing in their answers points at a specific field here → don't pretend
  // we know which one; name the sector and list fields to explore instead.
  const hasSignal = openRanked.length > 0 && openRanked[0].pts > 0;
  // A gated career they explicitly picked but don't qualify for yet
  const needsQualification = ranked
    .filter((x) => !isOpen(x.f.id, p) && x.pts > 0)
    .map((x) => ({ id: x.f.id, label: x.f.label, requires: GATE_LABELS[GATED_FIELDS[x.f.id]] }));

  return {
    main: hasSignal ? open[0] : null,
    alternatives: hasSignal ? open.slice(1, 3) : open.slice(0, 3),
    needsQualification: needsQualification.slice(0, 2),
  };
}

// ─── Explanations ────────────────────────────────────────────────────────────

const fmtMonths = (m) => {
  if (m >= 12) {
    const y = Math.round((m / 12) * 2) / 2;
    return `${y} year${y === 1 ? "" : "s"}`;
  }
  const r = Math.max(1, Math.round(m));
  return `${r} month${r === 1 ? "" : "s"}`;
};

function whyItFits(p, sectorId, career, hits) {
  const s = SECTORS[sectorId];
  const parts = [];

  const direct = p.roles.filter((r) => r.sectorId === sectorId);
  const near   = p.roles.filter((r) => r.sectorId && s.related.includes(r.sectorId));
  if (direct.length) {
    const months = direct.reduce((a, r) => a + r.months, 0);
    parts.push(`You already have about ${fmtMonths(months)} of experience in this field, which gives you a real head start.`);
  } else if (near.length) {
    parts.push(`Your experience in ${FIELD_BY_ID[near[0].fieldId].label.toLowerCase()} carries over well into this field.`);
  }

  if (career && p.q7Fields.includes(career.id)) {
    parts.push(`You picked ${career.label} as something you'd genuinely enjoy doing.`);
  }

  const topSkill = Object.entries(p.strengths)
    .filter(([sk]) => skillFit(sectorId, sk) === 1)
    .sort((a, b) => b[1] - a[1])[0];
  if (topSkill) parts.push(`It plays to your strength in ${SKILL_LABELS[topSkill[0]]}.`);

  if (parts.length < 3) {
    if (s.growth >= 5)      parts.push("It's one of the fastest-growing sectors in Kenya over the next few years.");
    else if (s.demand >= 5) parts.push("Employers in this sector are hiring actively right now.");
  }
  if (parts.length === 0) parts.push(`Your overall profile lines up well with ${s.label.toLowerCase()}.`);

  const out = parts.slice(0, 3);
  if (hits.length) {
    out.push(`Heads up: this field often involves ${hits.map((h) => AVOID_LABELS[h]).join(" and ")}, which you said you'd rather avoid.`);
  }
  return out.join(" ");
}

const outlookLabel = (growth) =>
  growth >= 5 ? "Fast-growing" : growth >= 4 ? "Growing" : growth >= 3 ? "Steady" : "Slow-moving";

// ─── Main ────────────────────────────────────────────────────────────────────

function runProAssessment({ answers = {}, history = [] } = {}) {
  const p = buildProfile(answers, history);

  const results = SECTOR_IDS.map((sectorId) => {
    const scores = {
      marketDemand:    calcMarketDemand(p, sectorId),
      futureRelevance: calcFutureRelevance(p, sectorId),
      aptitude:        calcAptitude(p, sectorId),
      experience:      calcExperience(p, sectorId),
      accessibility:   calcAccessibility(p, sectorId),
      interest:        calcInterest(p, sectorId),
    };
    const weighted = Object.entries(WEIGHTS).reduce((sum, [k, w]) => sum + scores[k] * w, 0);
    const { mult, hits } = dealbreakerMultiplier(p, sectorId);
    scores.total = Math.round(weighted * mult);
    return { sectorId, scores, hits };
  }).sort((a, b) => b.scores.total - a.scores.total);

  const hasPersonalFit = (r) =>
    Object.entries(PERSONAL_FIT_BARS).some(([k, bar]) => r.scores[k] >= bar);
  const fitting = results.filter(hasPersonalFit);
  const top3 = [...fitting, ...results.filter((r) => !hasPersonalFit(r))].slice(0, 3);

  const recommendations = top3.map((r, i) => {
    const s = SECTORS[r.sectorId];
    const careers = pickCareers(p, r.sectorId);
    return {
      rank:               i + 1,
      sectorId:           r.sectorId,
      sectorName:         s.label,
      specificCareer:     careers.main ? careers.main.label : s.label,
      careerFieldId:      careers.main ? careers.main.id : null,
      alsoConsider:       careers.alternatives.map((f) => f.label),
      needsQualification: careers.needsQualification,
      outlook:            outlookLabel(s.growth),
      matchScore:         r.scores.total,
      scoreBreakdown:     r.scores,
      dealbreakers:       r.hits.map((h) => AVOID_LABELS[h]),
      whyItFitsYou:       whyItFits(p, r.sectorId, careers.main, r.hits),
    };
  });

  // Careers they picked in Q7 that need a qualification they haven't told us about
  const qualificationNotes = p.q7Fields
    .filter((id) => !isOpen(id, p))
    .map((id) => ({ id, label: FIELD_BY_ID[id].label, requires: GATE_LABELS[GATED_FIELDS[id]] }));

  const topStrengths = Object.entries(p.strengths)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([sk]) => SKILL_LABELS[sk]);

  return {
    success: true,
    product: "professional",
    profile: {
      strengths:       topStrengths,
      experience:      p.totalMonths > 0 ? fmtMonths(p.roles.reduce((a, r) => a + r.months, 0)) : "None yet",
      rolesListed:     p.roles.length,
      studied:         p.study.label,
      location:        p.countyLabel,
    },
    recommendations,
    qualificationNotes,
    weights: WEIGHTS,
    disclaimer:
      "CFFR is a directional tool, not a final verdict. Use these results as a starting point " +
      "for conversations, research and small experiments, and retake it as your experience grows.",
    generatedAt: new Date().toISOString(),
  };
}

// ─── Validation ──────────────────────────────────────────────────────────────

const REQUIRED = ["q1", "q2", "q3", "q5", "q6", "q7", "q9", "q10", "q11", "q12", "q13",
                  "q14", "q15", "q16", "q17", "q18"];
const HISTORY_REQUIRED = ["q4", "q8"];

function validateProAnswers({ answers, history } = {}) {
  const errors = [];
  if (!answers || typeof answers !== "object") {
    return { valid: false, errors: ["Request body must include an 'answers' object."] };
  }
  const roles = asArray(history);
  const required = roles.length ? [...REQUIRED, ...HISTORY_REQUIRED] : REQUIRED;

  for (const qid of required) {
    const q = QUESTION_BY_ID[qid];
    const picks = asArray(answers[qid]);
    if (picks.length === 0) { errors.push(`${qid.toUpperCase()}: missing answer.`); continue; }
    if (picks.length > q.maxPicks) errors.push(`${qid.toUpperCase()}: pick at most ${q.maxPicks}.`);
    if (!picks.every((id) => q.options.some((o) => o.id === id))) {
      errors.push(`${qid.toUpperCase()}: invalid option.`);
    }
  }

  if (roles.length > 8) errors.push("Track Record: at most 8 roles.");
  roles.forEach((r, i) => {
    if (!r || !String(r.title || "").trim()) errors.push(`Role ${i + 1}: missing title.`);
    if (!r || !FIELD_BY_ID[r.sector])         errors.push(`Role ${i + 1}: invalid field.`);
    if (!r || !String(r.duration || "").trim()) errors.push(`Role ${i + 1}: missing duration.`);
  });

  return { valid: errors.length === 0, errors };
}

module.exports = { runProAssessment, validateProAnswers, parseDurationMonths, WEIGHTS };
