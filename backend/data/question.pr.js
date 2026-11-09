/**
 * CFFR Professional — Questionnaire  v3.1
 * v3.1: Q5 + 2 options (q5k notes/minutes, q5l keeping everyone organised);
 *       Q7 reworded so "rest" isn't the obvious answer; Track Record now only
 *       requires role, field and duration (type + day-to-day are optional).
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * User-facing section numbers (generic — never reveal what a section
 * measures; see publicQuestions()):
 *   1  The Basics            (Q1–Q3, free)
 *   2  Your Track Record     (repeatable role entries — WORK_HISTORY_FIELD, free)
 *      ─── payment gate ───
 *   3  Aptitude              (Q5, Q6)
 *   4  Interest              (Q7, Q9)
 *   5  Future Relevance      (Q10, Q11)
 *   6  Market Demand         (Q12, Q13)
 *   7  Based on your story   (Q4, Q8 — AI-read from Track Record; see below)
 *   8  Accessibility         (Q16, Q14, Q15, Q17, Q18)
 */

const { SECTORS } = require("./sectors.pr");
const { COUNTIES } = require("./counties.pr");
const { STUDY_FIELDS } = require("./studyfields.pr");
const { CAREER_FIELDS } = require("./careerfields.pr");

const FREE_QUESTIONS = 3; // Q1–Q3 (Section 1) are free; payment gate sits after Track Record, before Section 3

const sectorOptions = () =>
  Object.entries(SECTORS).map(([id, s]) => ({ id: `sec-${id}`, label: s.label }));

const growingSectorOptions = () =>
  Object.entries(SECTORS)
    .filter(([, s]) => s.growth >= 4)
    .map(([id, s]) => ({ id: `grow-${id}`, label: s.label }));

const careerfieldOptions = () =>
  CAREER_FIELDS.map((f) => ({ id: f.id, label: f.label, keywords: f.keywords }));

const HISTORY_FALLBACK_OPTIONS = [
  { id: "num", icon: null, label: "Working with numbers or data" },
  { id: "spk", icon: null, label: "Talking to people and building relationships" },
  { id: "ops", icon: null, label: "Organising, planning or keeping things on track" },
  { id: "fix", icon: null, label: "Fixing, building or troubleshooting things" },
  { id: "cre", icon: null, label: "Writing, designing or creating" },
  { id: "led", icon: null, label: "Leading or being in charge of a team" },
  { id: "tea", icon: null, label: "Teaching, coaching or explaining things" },
  { id: "car", icon: null, label: "Caring for or supporting people" },
];

const QUESTIONS = [
  // ═══ SECTION 1 — THE BASICS (free, context only) ═════════════════════════
  {
    id: "q1", section: "The Basics", type: "single", maxPicks: 1,
    text: "What's the highest level of education you've completed?",
    options: [
      { id: "q1a", icon: null, label: "Certificate",                          value: 2 },
      { id: "q1b", icon: null, label: "Diploma",                              value: 3 },
      { id: "q1c", icon: null, label: "Bachelor's",                           value: 4 },
      { id: "q1d", icon: null, label: "Master's or beyond",                   value: 5 },
      { id: "q1e", icon: null, label: "Still pursuing",                       value: 3 },
      { id: "q1f", icon: null, label: "None of these quite fit — and that's okay too", value: 1 },
    ],
  },
  {
    id: "q2", section: "The Basics", type: "single", maxPicks: 1,
    text: "What did you study, or what's your area of qualification?",
    options: STUDY_FIELDS.map((s) => ({ id: `q2-${s.id}`, icon: null, label: s.label, value: s.id })),
  },
  {
    id: "q3", section: "The Basics", type: "single", maxPicks: 1,
    text: "Where are things at for you right now?",
    options: [
      { id: "q3a", icon: "", label: "Employed",          value: "employed" },
      { id: "q3b", icon: "", label: "Self-employed",     value: "self-employed" },
      { id: "q3c", icon: "", label: "Between roles",     value: "between" },
      { id: "q3d", icon: "", label: "Still job hunting", value: "hunting" },
      { id: "q3e", icon: "", label: "It's complicated",  value: "complicated" },
    ],
  },

  // ─────────────────────────── payment gate sits here ───────────────────────

  // ═══ SECTION 3 — APTITUDE (Q5, Q6 — Q4 moved to Section 7) ═══════════════
  {
    id: "q5", section: "Aptitude", dimension: "aptitude", type: "multi", maxPicks: 2,
    text: "What's a task people annoyingly always come to you for? Everyone has one.",
    hint: "Pick up to 2.",
    options: [
      { id: "q5a", icon: "", label: "Sorting out the numbers or the budget" },
      { id: "q5b", icon: "", label: "Writing or fixing up someone else's message" },
      { id: "q5c", icon: "", label: "Fixing the thing that just broke" },
      { id: "q5d", icon: "", label: "Finding where something got misplaced" },
      { id: "q5e", icon: "", label: "Making something look good" },
      { id: "q5f", icon: "", label: "Smoothing over an awkward conversation" },
      { id: "q5g", icon: "", label: "Planning the whole thing, start to finish" },
      { id: "q5h", icon: "", label: "Sorting out a tech problem" },
      { id: "q5i", icon: "", label: "Listening when someone needs to vent" },
      { id: "q5j", icon: "", label: "Talking someone into (or out of) something" },
      { id: "q5k", icon: "", label: "Taking notes or minutes in a meeting" },
      { id: "q5l", icon: "", label: "Keeping everyone organised: schedules, files and follow-ups" },
    ],
  },
  {
    id: "q6", section: "Aptitude", dimension: "aptitude", type: "single", maxPicks: 1,
    text: "Think of a time work felt effortless, like you were cheating somehow. What were you doing?",
    options: [
      { id: "q6a", icon: null, label: "Crunching numbers or spotting a pattern in data" },
      { id: "q6b", icon: null, label: "Having a great conversation that got something done" },
      { id: "q6c", icon: null, label: "Getting a messy plan into perfect order" },
      { id: "q6d", icon: null, label: "Building, fixing or figuring out how something works" },
      { id: "q6e", icon: null, label: "Making something creative from scratch" },
      { id: "q6f", icon: null, label: "Rallying a group to actually get something done" },
      { id: "q6g", icon: null, label: "Helping someone understand something for the first time" },
      { id: "q6h", icon: null, label: "Being there for someone who needed it" },
    ],
  },

  // ═══ SECTION 4 — INTEREST (Q7, Q9 — Q8 moved to Section 7) ═══════════════
  {
    // v3: now uses the flat, searchable career-field list (259 fields) instead
    // of the 21 broad sectors, per "spoil them for choice" — this is asking
    // what they'd want to do NEXT, distinct from Track Record's "what have you
    // done" field which uses the same searchable list.
    id: "q7", section: "Interest", dimension: "interest", type: "multi", maxPicks: 3,
    text: "Which of these would you genuinely enjoy doing on a normal workday?",
    hint: "Imagine they all pay the same and you already have the skills. Search or scroll, pick up to 3.",
    searchable: true,
    options: careerfieldOptions(),
  },
  {
    id: "q9", section: "Interest", dimension: "interest", type: "multi", maxPicks: 2,
    text: "Pick your workplace nightmare.",
    hint: "What you'd avoid, not what you want.",
    options: [
      { id: "q9a", icon: "", label: "A rigid 9-to-5",                                 effects: { avoid: "structure" } },
      { id: "q9b", icon: "", label: "Behind screens forever",                            effects: { avoid: "numbers" } },
      { id: "q9c", icon: "", label: "People all day, every day",                       effects: { avoid: "people" } },
      { id: "q9d", icon: "", label: "Fixing broken things nobody else wants to touch",  effects: { avoid: "fixing" } },
      { id: "q9e", icon: "", label: "Shiftwork; including weekends and nights",        effects: { avoid: "shiftwork" } },
      { id: "q9f", icon: "", label: "Constant fieldwork",                              effects: { avoid: "fieldwork" } },
      { id: "q9g", icon: "", label: "None of these; I'm easy",                        effects: {} },
    ],
  },

  // ═══ SECTION 5 — FUTURE RELEVANCE ═════════════════════════════════════════
  {
    id: "q10", section: "Future Relevance", dimension: "future", type: "single", maxPicks: 1,
    text: "A new tool drops tomorrow that changes how your field works. What would be your reaction?",
    options: [
      { id: "q10a", icon: "", label: "Excited",           value: "excited" },
      { id: "q10b", icon: "", label: "Fine, I'll manage",  value: "fine" },
      { id: "q10c", icon: "", label: "Please no",          value: "avoid" },
    ],
  },
  {
    id: "q11", section: "Future Relevance", dimension: "future", type: "single", maxPicks: 1,
    text: "Deep mastery of one craft, or riding the wave of something new and still forming, which pulls you more?",
    options: [
      { id: "q11a", icon: "", label: "Deep mastery of one craft",         value: "mastery" },
      { id: "q11b", icon: "", label: "Riding the wave of something new",  value: "emerging" },
      { id: "q11c", icon: "", label: "Honestly, a bit of both",            value: "both" },
    ],
  },

  // ═══ SECTION 6 — MARKET DEMAND ════════════════════════════════════════════
  {
    // v2: doesn't ask the user to guess what's hiring — we hold that data, so
    // asking them to guess it was backwards. Asks how much a hot market
    // should matter to their result instead; pairs with Q11.
    id: "q12", section: "Market Demand", dimension: "market", type: "single", maxPicks: 1,
    text: "How much does it matter to you that your next move is in a field that's actively hiring right now?",
    options: [
      { id: "q12a", icon: null, label: "It's essential — I need to land somewhere in demand", value: "essential" },
      { id: "q12b", icon: null, label: "It matters, but I'll consider a slower-growing field if it fits me well", value: "matters" },
      { id: "q12c", icon: null, label: "I'm willing to gamble on something newer or less proven", value: "gamble" },
    ],
  },
  {
    // Stays at the 21-sector level (not the 259-field list): demand/growth
    // numbers in sectors.pr.js are curated per sector, not per granular field —
    // going more granular here would fake a precision we don't actually have.
    id: "q13", section: "Market Demand", dimension: "market", type: "multi", maxPicks: 3,
    text: "Of these growing sectors, which ones make you go \"huh, I could actually do that\"?",
    hint: "Pick up to 3.",
    options: growingSectorOptions(),
  },

  // ═══ SECTION 7 — BASED ON YOUR STORY (AI-read from Track Record) ══════════
  {
    id: "q4", section: "Aptitude", dimension: "aptitude", type: "single", maxPicks: 1,
    displaySection: "Based on your story",
    text: "Scanning back over your previous roles, what came easiest to you?",
    hint: "Pulled from your Track Record answers.",
    dynamicFromHistory: true,
    options: HISTORY_FALLBACK_OPTIONS,
  },
  {
    id: "q8", section: "Interest", dimension: "interest", type: "multi", maxPicks: 2,
    displaySection: "Based on your story",
    text: "And which of those tasks did you secretly enjoy; even the ones that weren't really your job?",
    hint: "Pick up to 2. If nothing fits, pick what's closest.",
    dynamicFromHistory: true,
    options: [...HISTORY_FALLBACK_OPTIONS, { id: "none", icon: null, label: "None of it, honestly" }],
  },

  // ═══ SECTION 8 — ACCESSIBILITY (relocation → county → commute → network → internet) ═══
  {
    id: "q16", section: "Accessibility", dimension: "accessibility", type: "single", maxPicks: 1,
    text: "Would relocating be on the table, or is that a hard no?",
    options: [
      { id: "q16a", icon: "", label: "Yes, anywhere in Kenya",          value: "domestic" },
      { id: "q16b", icon: "", label: "Yes, even abroad",                 value: "abroad" },
      { id: "q16c", icon: "", label: "Maybe, for the right opportunity", value: "maybe" },
      { id: "q16d", icon: "", label: "Hard no — I'm staying put",        value: "no" },
    ],
  },
  {
    id: "q14", section: "Accessibility", dimension: "accessibility", type: "single", maxPicks: 1,
    text: "Where are you based?",
    options: COUNTIES.map((c) => ({ id: `q14-${c.id}`, icon: null, label: c.label, value: c.id })),
  },
  {
    id: "q15", section: "Accessibility", dimension: "accessibility", type: "single", maxPicks: 1,
    text: "How far are you willing to commute for the right role?",
    hint: "Traffic is a factor.",
    options: [
      { id: "q15a", icon: "", label: "Only within my immediate area",       value: 1 },
      { id: "q15b", icon: "", label: "Up to an hour each way",              value: 2 },
      { id: "q15c", icon: "", label: "I'll commute far for the right role", value: 3 },
      { id: "q15d", icon: "", label: "Doesn't matter — I want remote work", value: 4 },
    ],
  },
  {
    id: "q17", section: "Accessibility", dimension: "accessibility", type: "single", maxPicks: 1,
    text: "Do you know anyone currently working in a field you're curious about?",
    hint: "Sometimes it's not just what you know.",
    options: [
      { id: "q17a", icon: null, label: "Yes, several people", value: 3 },
      { id: "q17b", icon: null, label: "Yes, one or two",     value: 2 },
      { id: "q17c", icon: null, label: "Not really",          value: 1 },
      { id: "q17d", icon: null, label: "Not at all",          value: 0 },
    ],
  },
  {
    // Also captures interest in remote work with companies OUTSIDE Kenya, not
    // just internet reliability — feeds `reach` (ke vs global) for blending
    // market demand by where someone will actually work.
    id: "q18", section: "Accessibility", dimension: "accessibility", type: "single", maxPicks: 1,
    text: "Reliable internet / remote-work setup?",
    options: [
      { id: "q18a", icon: "", label: "Yes, and I'm open to remote roles with companies outside Kenya too", value: { internet: 2, reach: "global" } },
      { id: "q18b", icon: "", label: "Yes, but I'd rather work with local employers",                       value: { internet: 2, reach: "local" } },
      { id: "q18c", icon: "", label: "Sometimes / limited",                                                 value: { internet: 1, reach: "local" } },
      { id: "q18d", icon: "", label: "Limited access",                                                        value: { internet: 0, reach: "local" } },
    ],
  },
];

// ═══ SECTION 2 — TRACK RECORD (repeatable; not a QUESTIONS entry) ═════════════
const WORK_HISTORY_FIELD = {
  section: "Your Track Record",
  intro: "Tell us about the roles you've held. Yes, even the 2-month internship counts. Especially that one.",
  minEntries: 0,
  maxEntries: 8,
  entryFields: [
    { id: "title", label: "What did you do? (role or title)", type: "text", required: true },
    {
      id: "type", label: "Type", type: "single", required: false,
      options: [
        { id: "fulltime",   label: "Full-time" },
        { id: "parttime",   label: "Part-time" },
        { id: "internship", label: "Internship" },
        { id: "attachment", label: "Attachment" },
        { id: "volunteer",  label: "Volunteer" },
        { id: "gig",        label: "Freelance / Gig" },
      ],
    },
    {
      // v3: searchable flat list (259 fields), not the old 21-sector dropdown
      id: "sector", label: "Where? (the field or industry)", type: "single", required: true,
      searchable: true, options: careerfieldOptions(),
    },
    { id: "duration", label: "For how long?", type: "text", required: true, placeholder: "e.g. 2 months, 3 years" },
    {
      id: "dayToDay", label: "What did you actually do day-to-day?", type: "textarea", required: false,
      placeholder: "The job description, minus the corporate fluff.", maxLength: 500,
    },
    {
      id: "praisedFor", label: "What's something you got noticeably good at, or got praised for, there?",
      type: "textarea", required: false, placeholder: "This one quietly does a lot of the scoring 👀", maxLength: 300,
    },
  ],
};

// ─── Public payload: generic "Section N" only. No `effects`, `dimension`, or
// internal `section` name ever leaves this file. ───
const publicQuestions = () => {
  const order = [];
  for (const q of QUESTIONS) {
    const label = q.displaySection || q.section;
    if (!order.includes(label)) order.push(label);
  }
  const sectionNumber = { [order[0]]: 1 };
  let n = 3; // 2 is reserved for Track Record, which isn't in QUESTIONS
  for (const label of order.slice(1)) sectionNumber[label] = n++;

  return QUESTIONS.map((q, i) => ({
    id: q.id,
    sectionLabel: `Section ${sectionNumber[q.displaySection || q.section]}`,
    type: q.type,
    maxPicks: q.maxPicks,
    hint: q.hint || null,
    searchable: q.searchable || false,
    text: q.text,
    dynamicFromHistory: q.dynamicFromHistory || false,
    free: i < FREE_QUESTIONS,
    options: q.options.map((o) => ({ id: o.id, icon: o.icon ?? null, label: o.label, keywords: o.keywords || undefined })),
  }));
};

module.exports = { QUESTIONS, WORK_HISTORY_FIELD, FREE_QUESTIONS, HISTORY_FALLBACK_OPTIONS, publicQuestions };
