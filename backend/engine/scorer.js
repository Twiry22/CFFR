/**
 * CFFR Scoring Engine  v3.1
 * ─────────────────────────────────────────────────────────────────────────────
 * VARIABLE WEIGHTS:
 *   Market Demand     25%
 *   Future Relevance  25%
 *   Aptitude          25%
 *   Interest          15%
 *   Accessibility     10%
 *
 * v2.0 — Career specificity: 1 specific career per cluster per personality
 * v2.1 — Personality-subject alignment gate in calcAptitudeScore
 * v2.2 — Aptitude confidence dampener on final total
 * v2.3 — Q11 (KCSE cluster points) affects both Aptitude and Accessibility
 * v2.4 — Dampener floor raised from 0.50 to 0.72
 * v3.0 — Weight rebalance: Aptitude ↑ to 25%, Interest ↓ to 15%
 *         4 new clusters: sports_recreation, hospitality_tourism,
 *         automotive_trades, beauty_wellness
 *         New career spaces added to validator
 *         New subjects: physical_education, computer_ict added to affinities
 *
 * DAMPENER:
 *   Floor: 0.72 | Range: aptitude 0 → ×0.72 | aptitude 100 → ×1.00
 *   0.72 + 0.28 = 1.00 ✓
 *   Typical score range: 48–95
 *
 * Q11 APTITUDE EFFECT:
 *   above_60 → +15 pts   50_60 → +10 pts   40_50 → +6 pts
 *   30_40    → +3 pts    20_30 →  0 pts     10_20 → -3 pts
 *   below_10 → -5 pts    skipped/absent → 0 pts
 *   Only applied when student has personality alignment with the cluster.
 *
 * Q11 ACCESSIBILITY EFFECT:
 *   High points → all clusters more accessible (+5 to +15)
 *   Low points  → TVET clusters boosted, university clusters penalised
 */

const { getClusterIds, getCluster, pickCareerFromCluster } = require("./careers");
const {
  getSchoolsForStudent,
  getGeographicAccessibilityScore,
  getBudgetScore,
} = require("./schools");

// ─── Valid Answer Options ─────────────────────────────────────────────────────

const SUBJECTS = [
  "mathematics", "biology", "chemistry", "physics",
  "history_government", "geography", "cre_ire", "business_studies",
  "agriculture", "computer_studies", "home_science", "art_design",
  "english", "kiswahili",
  "integrated_science", "agriculture_nutrition", "creative_arts",
  "social_studies_cre", "physical_education", "computer_ict",
];

const ACTIVITIES     = ["people_difference", "solving_figuring", "creating_building"];
const PERSONALITIES  = [
  "curious_analytical", "creative_expressive", "caring_social",
  "hands_on_practical", "organized_goal_setter", "environmental_caring",
];
const JOB_VALUES     = [
  "good_income", "making_difference", "building_creating",
  "creative_expression", "leadership_decisions", "research_discovery",
];

// Updated: includes 4 new career spaces
const CAREER_SPACES  = [
  "ai_data_technology",
  "climate_renewable_energy",
  "healthcare_medicine_mental_health",
  "digital_media_content_design",
  "modern_agribusiness_food_tech",
  "finance_banking_entrepreneurship",
  "law_policy_governance",
  "education_community_development",
  "sports_fitness_recreation",
  "hospitality_tourism_events",
  "automotive_logistics_trades",
  "beauty_wellness_personal_care",
];

const FUTURE_MINDSETS = [
  "keep_learning", "prefer_established", "work_online_internationally",
  "work_within_community", "tech_human_connection", "cutting_edge",
];

// ─── Q11 Lookup Tables ────────────────────────────────────────────────────────

const KCSE_APTITUDE_BONUS = {
  above_60:  15,
  "50_60":   10,
  "40_50":    6,
  "30_40":    3,
  "20_30":    0,
  "10_20":   -3,
  below_10:  -5,
  skipped:    0,
};

// Clusters typically entered via TVET/diploma rather than university degree
const TVET_CLUSTERS = [
  "technology_data", "engineering_built", "agricultural_tech", "creative_economy",
  "sports_recreation", "automotive_trades", "beauty_wellness", "hospitality_tourism",
];

// ─── Subject to Cluster Affinity ─────────────────────────────────────────────

const SUBJECT_CLUSTER_AFFINITY = {
  mathematics:           ["technology_data", "engineering_built", "business_finance", "agricultural_tech", "automotive_trades"],
  biology:               ["health_sciences", "agricultural_tech", "green_economy", "sports_recreation", "beauty_wellness"],
  chemistry:             ["health_sciences", "engineering_built", "green_economy", "agricultural_tech"],
  physics:               ["engineering_built", "technology_data", "green_economy", "automotive_trades"],
  history_government:    ["social_governance", "business_finance", "education_teaching"],
  geography:             ["green_economy", "agricultural_tech", "social_governance", "hospitality_tourism"],
  cre_ire:               ["social_governance", "health_sciences", "education_teaching"],
  business_studies:      ["business_finance", "agricultural_tech", "social_governance", "hospitality_tourism"],
  agriculture:           ["agricultural_tech", "green_economy", "health_sciences"],
  computer_studies:      ["technology_data", "engineering_built", "creative_economy"],
  home_science:          ["health_sciences", "agricultural_tech", "hospitality_tourism", "beauty_wellness"],
  art_design:            ["creative_economy", "beauty_wellness"],
  english:               ["creative_economy", "social_governance", "business_finance", "hospitality_tourism", "education_teaching"],
  kiswahili:             ["social_governance", "creative_economy", "hospitality_tourism", "education_teaching"],
  integrated_science:    ["health_sciences", "engineering_built", "green_economy", "agricultural_tech"],
  agriculture_nutrition: ["agricultural_tech", "green_economy", "health_sciences", "hospitality_tourism"],
  creative_arts:         ["creative_economy", "beauty_wellness", "sports_recreation"],
  social_studies_cre:    ["social_governance", "health_sciences", "education_teaching"],
  physical_education:    ["health_sciences", "sports_recreation", "education_teaching"],
  computer_ict:          ["technology_data", "engineering_built", "creative_economy", "automotive_trades"],
};

// ─── Activity to Cluster Affinity ────────────────────────────────────────────

const ACTIVITY_CLUSTER_AFFINITY = {
  people_difference: [
    "health_sciences", "social_governance", "agricultural_tech",
    "sports_recreation", "hospitality_tourism", "education_teaching",
  ],
  solving_figuring:  [
    "technology_data", "engineering_built", "green_economy",
    "business_finance", "automotive_trades",
  ],
  creating_building: [
    "creative_economy", "engineering_built", "technology_data",
    "agricultural_tech", "automotive_trades", "beauty_wellness",
  ],
};

// ─── Secondary Personality Affinity ──────────────────────────────────────────

const SECONDARY_PERSONALITY = {
  technology_data:    ["hands_on_practical",   "organized_goal_setter"],
  health_sciences:    ["organized_goal_setter", "environmental_caring"],
  engineering_built:  ["hands_on_practical",    "curious_analytical"],
  green_economy:      ["curious_analytical",    "hands_on_practical"],
  creative_economy:   ["curious_analytical",    "hands_on_practical"],
  business_finance:   ["curious_analytical",    "caring_social"],
  social_governance:  ["organized_goal_setter", "creative_expressive"],
  agricultural_tech:  ["hands_on_practical",    "curious_analytical"],
  sports_recreation:  ["caring_social",         "organized_goal_setter"],
  hospitality_tourism:["organized_goal_setter", "creative_expressive"],
  automotive_trades:  ["curious_analytical",    "organized_goal_setter"],
  beauty_wellness:    ["caring_social",         "hands_on_practical"],
  education_teaching: ["organized_goal_setter", "creative_expressive"],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function toWeightedPicks(raw, maxPicks = 1) {
  if (!raw) return [];
  const arr   = Array.isArray(raw) ? raw : [raw];
  const picks = arr.slice(0, maxPicks);
  const weight = 1 / picks.length;
  return picks.map((v) => [v, weight]);
}

// ─── Scoring Functions ────────────────────────────────────────────────────────

function calcInterestScore(answers, cluster) {
  let points = 0;

  (answers.q1 || []).forEach((subject) => {
    if (SUBJECT_CLUSTER_AFFINITY[subject]?.includes(cluster.id)) points += 10;
  });

  toWeightedPicks(answers.q3, 2).forEach(([activity, weight]) => {
    if ((ACTIVITY_CLUSTER_AFFINITY[activity] || []).includes(cluster.id))
      points += Math.round(20 * weight);
  });

  toWeightedPicks(answers.q5, 2).forEach(([val, weight]) => {
    if (val === cluster.jobValueKey) points += Math.round(15 * weight);
  });

  const careerSpaces = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (careerSpaces.includes(cluster.careerSpaceKey)) points += 35;

  return Math.min(points, 100);
}

function calcAptitudeScore(answers, cluster) {
  let points = 0;

  // ── Personality alignment check ───────────────────────────────────────────
  const personalityPicks  = Array.isArray(answers.q4) ? answers.q4 : answers.q4 ? [answers.q4] : [];
  const hasPrimaryMatch   = personalityPicks.includes(cluster.personalityKey);
  const hasSecondaryMatch = personalityPicks.some((p) =>
    SECONDARY_PERSONALITY[cluster.id]?.includes(p)
  );
  const hasAnyPersonalityMatch = hasPrimaryMatch || hasSecondaryMatch;

  // ── Q2 subject points — halved when personality is fully misaligned ───────
  (answers.q2 || []).forEach((subject) => {
    if (SUBJECT_CLUSTER_AFFINITY[subject]?.includes(cluster.id)) {
      points += hasAnyPersonalityMatch ? 11 : 5;
    }
  });

  // ── Personality points ────────────────────────────────────────────────────
  toWeightedPicks(answers.q4, 2).forEach(([personality, weight]) => {
    if (personality === cluster.personalityKey) {
      points += Math.round(30 * weight);
    } else if (SECONDARY_PERSONALITY[cluster.id]?.includes(personality)) {
      points += Math.round(15 * weight);
    }
  });

  // ── Tech readiness bonus ──────────────────────────────────────────────────
  const q6Level = parseInt(answers.q6, 10) || 1;
  if (cluster.isTechCluster)        points += Math.round((q6Level / 5) * 37);
  else if (cluster.isHealthCluster) points += Math.round((q6Level / 5) * 20);
  else                              points += Math.round((q6Level / 5) * 12);

  // ── Q11 KCSE cluster points bonus ────────────────────────────────────────
  if (hasAnyPersonalityMatch) {
    const kcseBonus = KCSE_APTITUDE_BONUS[answers.q11] ?? 0;
    points += kcseBonus;
  }

  return Math.min(Math.max(points, 0), 100);
}

function calcFutureRelevanceScore(answers, cluster) {
  let studentPoints = 0;
  const q6Level = parseInt(answers.q6, 10) || 1;

  const techFutureClusters = [
    "technology_data", "engineering_built", "green_economy",
    "health_sciences", "agricultural_tech", "automotive_trades",
  ];
  studentPoints += techFutureClusters.includes(cluster.id)
    ? Math.round((q6Level / 5) * 25)
    : Math.round((q6Level / 5) * 10);

  const careerSpaces = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (careerSpaces.includes(cluster.careerSpaceKey)) studentPoints += 25;

  toWeightedPicks(answers.q8, 2).forEach(([val, weight]) => {
    if (cluster.futureMindsetKeys?.includes(val))
      studentPoints += Math.round(15 * weight);
  });

  return Math.min(Math.round(studentPoints + (cluster.futureRelevanceIndex / 100) * 35), 100);
}

function calcMarketDemandScore(answers, cluster) {
  let score = cluster.marketDemandIndex;
  const highDemandClusters = [
    "business_finance", "engineering_built", "technology_data",
    "health_sciences", "automotive_trades", "education_teaching",
  ];
  const jobValuePicks = Array.isArray(answers.q5) ? answers.q5 : answers.q5 ? [answers.q5] : [];
  if (jobValuePicks.includes("good_income") && highDemandClusters.includes(cluster.id))
    score = Math.min(score + 8, 100);
  return Math.round(score);
}

function calcAccessibilityScore(answers, cluster) {
  const geoScore    = getGeographicAccessibilityScore(answers.q9);
  const budgetScore = getBudgetScore(answers.q10);
  let raw           = budgetScore * 0.6 + geoScore * 0.4;

  // ── Base budget cap for very low budgets ──────────────────────────────────
  if (answers.q10 === "under_30k") {
    const tvetBoost = TVET_CLUSTERS.includes(cluster.id) ? 10 : 0;
    raw = Math.min(Math.round(raw + tvetBoost), 50);
  }

  // ── Q11 KCSE cluster points effect on accessibility ───────────────────────
  const q11 = answers.q11;
  let kcseAdjustment = 0;

  if (q11 && q11 !== "skipped") {
    if      (q11 === "above_60") kcseAdjustment = 15;
    else if (q11 === "50_60")    kcseAdjustment = 10;
    else if (q11 === "40_50")    kcseAdjustment = 5;
    else if (q11 === "30_40")    kcseAdjustment = 0;
    else if (q11 === "20_30")    kcseAdjustment = TVET_CLUSTERS.includes(cluster.id) ?  10 : -10;
    else if (q11 === "10_20")    kcseAdjustment = TVET_CLUSTERS.includes(cluster.id) ?  15 : -20;
    else if (q11 === "below_10") kcseAdjustment = TVET_CLUSTERS.includes(cluster.id) ?  20 : -30;
  }

  return Math.min(Math.max(Math.round(raw + kcseAdjustment), 0), 100);
}

// ─── Fit Explanation ──────────────────────────────────────────────────────────

function generateFitExplanation(answers, cluster, specificCareer) {
  const parts = [];

  const subjectLabels = {
    mathematics:           "Mathematics",
    biology:               "Biology",
    chemistry:             "Chemistry",
    physics:               "Physics",
    history_government:    "History & Government",
    geography:             "Geography",
    cre_ire:               "CRE / IRE",
    business_studies:      "Business Studies",
    agriculture:           "Agriculture",
    computer_studies:      "Computer Studies",
    home_science:          "Home Science",
    art_design:            "Art & Design",
    english:               "English",
    kiswahili:             "Kiswahili",
    integrated_science:    "Integrated Science",
    agriculture_nutrition: "Agriculture & Nutrition",
    creative_arts:         "Creative Arts",
    computer_ict:          "Computer Science / ICT",
    physical_education:    "Physical Education",
    social_studies_cre:    "Social Studies / CRE",
  };

  const matchedSubjects = (answers.q1 || []).filter(
    (s) => SUBJECT_CLUSTER_AFFINITY[s]?.includes(cluster.id)
  );
  if (matchedSubjects.length > 0) {
    const names = matchedSubjects.map((s) => subjectLabels[s] || s).join(" and ");
    parts.push(`Your enjoyment of ${names} aligns well with a career as a ${specificCareer}.`);
  }

  const careerSpaces = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (careerSpaces.includes(cluster.careerSpaceKey)) {
    parts.push(`You identified ${cluster.name} as one of your most exciting future career spaces.`);
  }

  const personalityPicks = Array.isArray(answers.q4) ? answers.q4 : answers.q4 ? [answers.q4] : [];
  const personalityDescriptions = {
    curious_analytical:    "your analytical and curious nature",
    creative_expressive:   "your creative and expressive personality",
    caring_social:         "your caring and people-focused approach",
    hands_on_practical:    "your hands-on, practical mindset",
    organized_goal_setter: "your organised, goal-driven character",
    environmental_caring:  "your deep care for the environment and community",
  };
  if (personalityPicks.includes(cluster.personalityKey)) {
    parts.push(
      `This role suits ${personalityDescriptions[cluster.personalityKey] || "your personality type"}.`
    );
  }

  const mindsetMessages = {
    keep_learning:               "Your readiness to keep learning puts you well ahead in this fast-evolving field.",
    work_online_internationally: "Your ambition to work online or internationally is a great fit here.",
    cutting_edge:                "Your appetite for cutting-edge work is exactly what this role demands.",
    tech_human_connection:       "Your desire to blend technology with human connection is a growing strength here.",
    work_within_community:       "Your focus on local community impact is well-matched to this career.",
    prefer_established:          "This is one of Kenya's most established career tracks.",
  };
  const mindsetPicks   = Array.isArray(answers.q8) ? answers.q8 : answers.q8 ? [answers.q8] : [];
  const matchedMindset = mindsetPicks.find((m) => cluster.futureMindsetKeys?.includes(m));
  if (matchedMindset && mindsetMessages[matchedMindset]) parts.push(mindsetMessages[matchedMindset]);

  const aptitudeSubjects = (answers.q2 || []).filter(
    (s) => SUBJECT_CLUSTER_AFFINITY[s]?.includes(cluster.id)
  );
  if (aptitudeSubjects.length > 0 && parts.length < 3) {
    const names = aptitudeSubjects.map((s) => subjectLabels[s] || s).join(" and ");
    parts.push(`Your strong performance in ${names} gives you a solid foundation for this path.`);
  }

  if (parts.length === 0)
    parts.push(
      `Based on your overall profile, becoming a ${specificCareer} is a strong direction worth exploring.`
    );

  return parts.slice(0, 3).join(" ");
}

// ─── Student Profile ──────────────────────────────────────────────────────────

function generateStudentProfile(answers) {
  const personalityMap = {
    curious_analytical:    "Analytical Explorer",
    creative_expressive:   "Creative Visionary",
    caring_social:         "Compassionate Connector",
    hands_on_practical:    "Practical Builder",
    organized_goal_setter: "Strategic Leader",
    environmental_caring:  "Purpose-Driven Changemaker",
  };
  const techReadinessMap        = { 1: "Low", 2: "Basic", 3: "Moderate", 4: "Confident", 5: "Very High" };
  const q6Level                 = parseInt(answers.q6, 10) || 1;
  const primaryPersonality      = Array.isArray(answers.q4) ? answers.q4[0] : answers.q4;
  const hasSecondaryPersonality = Array.isArray(answers.q4) && answers.q4.length === 2;

  return {
    personalityType:   personalityMap[primaryPersonality] || "Curious Learner",
    techReadiness:     techReadinessMap[q6Level] || "Moderate",
    subjectBreadth:    (answers.q1 || []).length > 2 ? "Broad" : "Focused",
    academicAlignment: (answers.q1 || []).length > 0 && (answers.q2 || []).length > 0
      ? "Interest and aptitude are aligned"
      : "Interests slightly ahead of current performance",
    hasSecondaryPersonality,
  };
}

// ─── Main Assessment Function ─────────────────────────────────────────────────

function runCFFRAssessment(answers) {
  const clusterIds = getClusterIds();
  const results    = [];

  for (const id of clusterIds) {
    const cluster = getCluster(id);

    const interest        = calcInterestScore(answers, cluster);
    const aptitude        = calcAptitudeScore(answers, cluster);
    const futureRelevance = calcFutureRelevanceScore(answers, cluster);
    const marketDemand    = calcMarketDemandScore(answers, cluster);
    const accessibility   = calcAccessibilityScore(answers, cluster);

    // ── Weighted total (v3.1 weights) ──────────────────────────────────────
    // Dampener removed — weights alone govern the score.
    // Expected range: strong match 75–88 | average 60–74 | weak 45–59
    const total = Math.round(
      marketDemand    * 0.25 +
      futureRelevance * 0.25 +
      aptitude        * 0.25 +
      interest        * 0.15 +
      accessibility   * 0.10
    );

    results.push({
      cluster,
      scores: { interest, aptitude, futureRelevance, marketDemand, accessibility, total },
    });
  }

  results.sort((a, b) => b.scores.total - a.scores.total);

  const resultsWithSchools = results.map((r) => ({
    ...r,
    schools: getSchoolsForStudent(r.cluster.id, answers.q9, answers.q10, answers.q11),
  }));

  const studentProfile       = generateStudentProfile(answers);
  const allPersonalityPicks  = Array.isArray(answers.q4) ? answers.q4 : answers.q4 ? [answers.q4] : [];
  const primaryPersonality   = allPersonalityPicks[0] || null;
  const secondaryPersonality = allPersonalityPicks[1] || null;

  const top3 = resultsWithSchools.slice(0, 3);

  const recommendations = top3.map((r, idx) => {
    const specificCareer = pickCareerFromCluster(r.cluster, primaryPersonality);
    return {
      rank:               idx + 1,
      specificCareer,
      clusterId:          r.cluster.id,
      clusterName:        r.cluster.name,
      tagline:            r.cluster.tagline,
      sssPathway:         r.cluster.sssPathway,
      futureGrowthLabel:  r.cluster.futureGrowthLabel,
      threeYearOutlook:   r.cluster.threeYearOutlook,
      matchScore:         r.scores.total,
      scoreBreakdown:     r.scores,
      whyItFitsYou:       generateFitExplanation(answers, r.cluster, specificCareer),
      recommendedSchools: r.schools,
    };
  });

  let alternateRecommendations = [];
  if (studentProfile.hasSecondaryPersonality && secondaryPersonality) {
    alternateRecommendations = top3.map((r, idx) => {
      const specificCareer = pickCareerFromCluster(r.cluster, secondaryPersonality);
      return {
        rank:               idx + 4,
        specificCareer,
        clusterId:          r.cluster.id,
        clusterName:        r.cluster.name,
        tagline:            r.cluster.tagline,
        sssPathway:         r.cluster.sssPathway,
        futureGrowthLabel:  r.cluster.futureGrowthLabel,
        threeYearOutlook:   r.cluster.threeYearOutlook,
        matchScore:         r.scores.total,
        scoreBreakdown:     r.scores,
        whyItFitsYou:       generateFitExplanation(answers, r.cluster, specificCareer),
        recommendedSchools: r.schools,
      };
    });
  }

  return {
    success: true,
    studentProfile,
    recommendations,
    ...(studentProfile.hasSecondaryPersonality && {
      alternateRecommendations,
      exploratoryNote:
        "You selected two personality types; so we found careers that fit both sides of you. " +
        "Your top 3 are based on your primary personality. The 3 below reflect your second personality " +
        "and are also worth exploring.",
    }),
    disclaimer:
      "CFFR is a directional tool, not a final verdict. Your interests will grow and change, " +
      "therefore consider retaking this assessment at key points in your education.",
    generatedAt: new Date().toISOString(),
  };
}

// ─── Input Validator ──────────────────────────────────────────────────────────

function validateAnswers(answers) {
  const errors = [];

  if (!answers || typeof answers !== "object")
    return { valid: false, errors: ["Request body must be a JSON object with an 'answers' key."] };

  if (!Array.isArray(answers.q1) || answers.q1.length === 0 || answers.q1.length > 3)
    errors.push("Q1: Please select between 1 and 3 subjects you enjoyed.");
  else if (!answers.q1.every((s) => SUBJECTS.includes(s)))
    errors.push("Q1: One or more invalid subject selections.");

  if (!Array.isArray(answers.q2) || answers.q2.length === 0 || answers.q2.length > 3)
    errors.push("Q2: Please select between 1 and 3 subjects you performed best in.");
  else if (!answers.q2.every((s) => SUBJECTS.includes(s)))
    errors.push("Q2: One or more invalid subject selections.");

  const q3 = Array.isArray(answers.q3) ? answers.q3 : answers.q3 ? [answers.q3] : [];
  if (q3.length === 0 || q3.length > 2) errors.push("Q3: Please select 1 or 2 activities.");
  else if (!q3.every((a) => ACTIVITIES.includes(a))) errors.push("Q3: Invalid activity selection.");

  const q4 = Array.isArray(answers.q4) ? answers.q4 : answers.q4 ? [answers.q4] : [];
  if (q4.length === 0 || q4.length > 2) errors.push("Q4: Please select 1 or 2 personality descriptions.");
  else if (!q4.every((p) => PERSONALITIES.includes(p))) errors.push("Q4: Invalid personality selection.");

  const q5 = Array.isArray(answers.q5) ? answers.q5 : answers.q5 ? [answers.q5] : [];
  if (q5.length === 0 || q5.length > 2) errors.push("Q5: Please select 1 or 2 job values.");
  else if (!q5.every((v) => JOB_VALUES.includes(v))) errors.push("Q5: Invalid job value selection.");

  const q6 = parseInt(answers.q6, 10);
  if (isNaN(q6) || q6 < 1 || q6 > 5) errors.push("Q6: Tech comfort level must be between 1 and 5.");

  const q7 = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (q7.length === 0 || q7.length > 3) errors.push("Q7: Please select between 1 and 3 career spaces.");
  else if (!q7.every((s) => CAREER_SPACES.includes(s))) errors.push("Q7: Invalid career space selection.");

  const q8 = Array.isArray(answers.q8) ? answers.q8 : answers.q8 ? [answers.q8] : [];
  if (q8.length === 0 || q8.length > 2) errors.push("Q8: Please select 1 or 2 mindset statements.");
  else if (!q8.every((v) => FUTURE_MINDSETS.includes(v))) errors.push("Q8: Invalid mindset selection.");

  if (!answers.q9 || typeof answers.q9 !== "string" || answers.q9.trim() === "")
    errors.push("Q9: Please select your school county.");

  const validBudgetTiers = [
    "under_30k", "30k_80k", "80k_150k", "150k_300k", "over_300k", "scholarships",
  ];
  if (!validBudgetTiers.includes(answers.q10))
    errors.push("Q10: Please select an education budget range.");

  const validKcse = [
    "above_60", "50_60", "40_50", "30_40", "20_30", "10_20", "below_10", "skipped",
  ];
  if (answers.q11 !== undefined && answers.q11 !== null && !validKcse.includes(answers.q11))
    errors.push("Q11: Invalid KCSE cluster points selection.");

  return { valid: errors.length === 0, errors };
}

module.exports = { runCFFRAssessment, validateAnswers };
