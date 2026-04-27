/**
 * CFFR Scoring Engine  v1.1
 * ─────────────────────────────────────────────────────────────────────────────
 * VARIABLE WEIGHTS:
 *   Market Demand     25%
 *   Future Relevance  25%
 *   Aptitude          20%
 *   Interest          20%
 *   Accessibility     10%
 *
 * DUAL-PICK UPDATE (v1.1):
 *   Q3 (Activity)   — now accepts 1 OR 2 picks  → Interest score
 *   Q4 (Personality)— now accepts 1 OR 2 picks  → Aptitude score
 *   When 2 picks are made, each pick carries 0.5 weight so the
 *   total contribution per question remains identical to a single pick.
 *   This ensures the 25/25/20/20/10 model is fully preserved.
 *
 *   Result behaviour:
 *   • 1 pick  → confident signal  → top 3 recommendations
 *   • 2 picks → broader signal   → top 3 + 3 alternates flagged
 */

const { CAREER_CLUSTERS, getClusterIds, getCluster } = require("./careers");
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

const ACTIVITIES = [
  "people_difference",
  "solving_figuring",
  "creating_building",
];

const PERSONALITIES = [
  "curious_analytical", "creative_expressive", "caring_social",
  "hands_on_practical", "organized_goal_setter", "environmental_caring",
];

const JOB_VALUES = [
  "good_income", "making_difference", "building_creating",
  "creative_expression", "leadership_decisions", "research_discovery",
];

const CAREER_SPACES = [
  "ai_data_technology", "climate_renewable_energy",
  "healthcare_medicine_mental_health", "digital_media_content_design",
  "modern_agribusiness_food_tech", "finance_banking_entrepreneurship",
  "law_policy_governance", "education_community_development",
];

const FUTURE_MINDSETS = [
  "keep_learning", "prefer_established", "work_online_internationally",
  "work_within_community", "tech_human_connection", "cutting_edge",
];

// ─── Subject to Cluster Affinity ─────────────────────────────────────────────

const SUBJECT_CLUSTER_AFFINITY = {
  mathematics:           ["engineering_built", "business_finance", "technology_data", "agricultural_tech"],
  biology:               ["health_sciences", "agricultural_tech", "green_economy"],
  chemistry:             ["health_sciences", "engineering_built", "green_economy", "agricultural_tech"],
  physics:               ["engineering_built", "technology_data", "green_economy"],
  history_government:    ["social_governance", "business_finance"],
  geography:             ["green_economy", "agricultural_tech", "social_governance"],
  cre_ire:               ["social_governance", "health_sciences"],
  business_studies:      ["business_finance", "agricultural_tech", "social_governance"],
  agriculture:           ["agricultural_tech", "green_economy", "health_sciences"],
  computer_studies:      ["technology_data", "engineering_built", "creative_economy"],
  home_science:          ["health_sciences", "agricultural_tech"],
  art_design:            ["creative_economy"],
  english:               ["creative_economy", "social_governance", "business_finance"],
  kiswahili:             ["social_governance", "creative_economy"],
  integrated_science:    ["health_sciences", "engineering_built", "green_economy", "agricultural_tech"],
  agriculture_nutrition: ["agricultural_tech", "green_economy", "health_sciences"],
  creative_arts:         ["creative_economy"],
  social_studies_cre:    ["social_governance", "health_sciences"],
  physical_education:    ["health_sciences"],
  computer_ict:          ["technology_data", "engineering_built", "creative_economy"],
};

// ─── Activity to Cluster Affinity ────────────────────────────────────────────

const ACTIVITY_CLUSTER_AFFINITY = {
  people_difference: ["health_sciences", "social_governance", "agricultural_tech"],
  solving_figuring:  ["engineering_built", "technology_data", "green_economy", "business_finance"],
  creating_building: ["creative_economy", "engineering_built", "technology_data", "agricultural_tech"],
};

// ─── Secondary Personality Affinity ──────────────────────────────────────────

const SECONDARY_PERSONALITY = {
  technology_data:   ["hands_on_practical", "organized_goal_setter"],
  health_sciences:   ["organized_goal_setter", "environmental_caring"],
  engineering_built: ["hands_on_practical", "curious_analytical"],
  green_economy:     ["curious_analytical", "hands_on_practical"],
  creative_economy:  ["curious_analytical", "hands_on_practical"],
  business_finance:  ["curious_analytical", "caring_social"],
  social_governance: ["organized_goal_setter", "creative_expressive"],
  agricultural_tech: ["hands_on_practical", "curious_analytical"],
};

// ─── Helper: normalise single or array answers ───────────────────────────────
// Returns an array of [value, weight] pairs.
// 1 pick  → [[value, 1.0]]
// 2 picks → [[val1, 0.5], [val2, 0.5]]
// Ensures the total weight always sums to 1.0.

function toWeightedPicks(raw, maxPicks = 1) {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  const picks = arr.slice(0, maxPicks);
  const weight = 1 / picks.length;
  return picks.map((v) => [v, weight]);
}

// ─── Scoring Functions ────────────────────────────────────────────────────────

function calcInterestScore(answers, cluster) {
  let points = 0;

  // Q1 — enjoyed subjects (up to 3 × 10 pts) — multi-select, unchanged
  const subjectsEnjoyed = answers.q1 || [];
  subjectsEnjoyed.forEach((subject) => {
    if (SUBJECT_CLUSTER_AFFINITY[subject]?.includes(cluster.id)) points += 10;
  });

  // Q3 — activity (1 OR 2 picks, weight-split)
  // Full value of this question = 20 pts. Each pick earns weight × 20.
  const activityPicks = toWeightedPicks(answers.q3, 2);
  activityPicks.forEach(([activity, weight]) => {
    const activityClusters = ACTIVITY_CLUSTER_AFFINITY[activity] || [];
    if (activityClusters.includes(cluster.id)) points += Math.round(20 * weight);
  });

  // Q5 — job value (1 OR 2 picks, weight-split)
  // Full value = 15 pts. Each pick earns weight × 15.
  const jobValuePicks = toWeightedPicks(answers.q5, 2);
  jobValuePicks.forEach(([val, weight]) => {
    if (val === cluster.jobValueKey) points += Math.round(15 * weight);
  });

  // Q7 — career space (multi-select up to 3, unchanged)
  const careerSpaces = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (careerSpaces.includes(cluster.careerSpaceKey)) points += 35;

  return Math.min(points, 100);
}

function calcAptitudeScore(answers, cluster) {
  let points = 0;

  // Q2 — best subjects (up to 3 × 11 pts) — multi-select, unchanged
  const subjectsBest = answers.q2 || [];
  subjectsBest.forEach((subject) => {
    if (SUBJECT_CLUSTER_AFFINITY[subject]?.includes(cluster.id)) points += 11;
  });

  // Q4 — personality (1 OR 2 picks, weight-split)
  // Primary match = 30 pts, secondary match = 15 pts — each scaled by weight.
  const personalityPicks = toWeightedPicks(answers.q4, 2);
  personalityPicks.forEach(([personality, weight]) => {
    if (personality === cluster.personalityKey) {
      points += Math.round(30 * weight);
    } else if (SECONDARY_PERSONALITY[cluster.id]?.includes(personality)) {
      points += Math.round(15 * weight);
    }
  });

  // Q6 — tech comfort (scale, unchanged)
  const q6Level = parseInt(answers.q6, 10) || 1;
  if (cluster.isTechCluster) {
    points += Math.round((q6Level / 5) * 37);
  } else if (cluster.isHealthCluster) {
    points += Math.round((q6Level / 5) * 20);
  } else {
    points += Math.round((q6Level / 5) * 12);
  }

  return Math.min(points, 100);
}

function calcFutureRelevanceScore(answers, cluster) {
  let studentPoints = 0;

  const q6Level = parseInt(answers.q6, 10) || 1;
  const techFutureClusters = [
    "technology_data", "engineering_built",
    "green_economy", "health_sciences", "agricultural_tech",
  ];
  if (techFutureClusters.includes(cluster.id)) {
    studentPoints += Math.round((q6Level / 5) * 25);
  } else {
    studentPoints += Math.round((q6Level / 5) * 10);
  }

  // Q7 multi-select boost (unchanged)
  const careerSpaces = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (careerSpaces.includes(cluster.careerSpaceKey)) studentPoints += 25;

  // Q8 — future mindset (1 OR 2 picks, weight-split)
  const mindsetPicks = toWeightedPicks(answers.q8, 2);
  mindsetPicks.forEach(([val, weight]) => {
    if (cluster.futureMindsetKeys?.includes(val)) studentPoints += Math.round(15 * weight);
  });

  const inherentPoints = (cluster.futureRelevanceIndex / 100) * 35;
  return Math.min(Math.round(studentPoints + inherentPoints), 100);
}

function calcMarketDemandScore(answers, cluster) {
  let score = cluster.marketDemandIndex;
  const highDemandClusters = ["technology_data", "health_sciences", "engineering_built", "business_finance"];
  // Q5 dual-pick: boost if any pick is good_income
  const jobValuePicks = Array.isArray(answers.q5) ? answers.q5 : answers.q5 ? [answers.q5] : [];
  if (jobValuePicks.includes("good_income") && highDemandClusters.includes(cluster.id)) {
    score = Math.min(score + 8, 100);
  }
  return Math.round(score);
}

function calcAccessibilityScore(answers, cluster) {
  const geoScore    = getGeographicAccessibilityScore(answers.q9);
  const budgetScore = getBudgetScore(answers.q10);
  const raw         = budgetScore * 0.6 + geoScore * 0.4;

  if (answers.q10 === "under_30k") {
    const tvetClusters = ["technology_data", "engineering_built", "agricultural_tech", "creative_economy"];
    if (tvetClusters.includes(cluster.id)) return Math.min(Math.round(raw + 10), 50);
    return Math.min(Math.round(raw), 40);
  }

  return Math.min(Math.round(raw), 100);
}

// ─── Fit Explanation ──────────────────────────────────────────────────────────

function generateFitExplanation(answers, cluster) {
  const parts = [];

  const subjectLabels = {
    mathematics: "Mathematics", biology: "Biology", chemistry: "Chemistry",
    physics: "Physics", history_government: "History & Government",
    geography: "Geography", cre_ire: "CRE / IRE",
    business_studies: "Business Studies", agriculture: "Agriculture",
    computer_studies: "Computer Studies", home_science: "Home Science",
    art_design: "Art & Design", english: "English", kiswahili: "Kiswahili",
    integrated_science: "Integrated Science",
    agriculture_nutrition: "Agriculture & Nutrition",
    creative_arts: "Creative Arts", computer_ict: "Computer Science / ICT",
  };

  const matchedSubjects = (answers.q1 || []).filter((s) =>
    SUBJECT_CLUSTER_AFFINITY[s]?.includes(cluster.id)
  );
  if (matchedSubjects.length > 0) {
    const names = matchedSubjects.map((s) => subjectLabels[s] || s).join(" and ");
    parts.push(`Your enjoyment of ${names} aligns well with this path.`);
  }

  const careerSpaces = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (careerSpaces.includes(cluster.careerSpaceKey)) {
    parts.push(`You identified ${cluster.name} as one of your most exciting future career spaces.`);
  }

  // Q4 can now be 1 or 2 picks — check if any match the cluster's personality key
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
    parts.push(`This cluster suits ${personalityDescriptions[cluster.personalityKey] || "your personality type"}.`);
  }

  const mindsetMessages = {
    keep_learning:               "Your readiness to keep learning puts you well ahead in this fast-evolving field.",
    work_online_internationally: "Your ambition to work online or internationally is a great fit here.",
    cutting_edge:                "Your appetite for cutting-edge work is exactly what this cluster demands.",
    tech_human_connection:       "Your desire to blend technology with human connection is a growing strength in this field.",
    work_within_community:       "Your focus on local community impact is well-matched here.",
    prefer_established:          "This is one of Kenya's most established career tracks, aligning with your preference for stability.",
  };
  const mindsetPicks = Array.isArray(answers.q8) ? answers.q8 : answers.q8 ? [answers.q8] : [];
  const matchedMindset = mindsetPicks.find((m) => cluster.futureMindsetKeys?.includes(m));
  if (matchedMindset && mindsetMessages[matchedMindset]) {
    parts.push(mindsetMessages[matchedMindset]);
  }

  const aptitudeSubjects = (answers.q2 || []).filter((s) =>
    SUBJECT_CLUSTER_AFFINITY[s]?.includes(cluster.id)
  );
  if (aptitudeSubjects.length > 0 && parts.length < 3) {
    const names = aptitudeSubjects.map((s) => subjectLabels[s] || s).join(" and ");
    parts.push(`Your strong performance in ${names} gives you a solid academic foundation for this path.`);
  }

  if (parts.length === 0) {
    parts.push(`Based on your overall profile, ${cluster.name} is a strong direction worth exploring.`);
  }

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

  const techReadinessMap = { 1: "Low", 2: "Basic", 3: "Moderate", 4: "Confident", 5: "Very High" };
  const q6Level = parseInt(answers.q6, 10) || 1;

  // Q4 can now be 1 or 2 picks — show the first (primary) for the profile label
  const primaryPersonality = Array.isArray(answers.q4) ? answers.q4[0] : answers.q4;

  // Detect if the student used dual-pick on Q3 or Q4
  const isUndecided =
    (Array.isArray(answers.q3) && answers.q3.length === 2) ||
    (Array.isArray(answers.q4) && answers.q4.length === 2) ||
    (Array.isArray(answers.q5) && answers.q5.length === 2) ||
    (Array.isArray(answers.q8) && answers.q8.length === 2);

  return {
    personalityType:   personalityMap[primaryPersonality] || "Curious Learner",
    techReadiness:     techReadinessMap[q6Level] || "Moderate",
    subjectBreadth:    (answers.q1 || []).length > 2 ? "Broad" : "Focused",
    academicAlignment: (answers.q1 || []).length > 0 && (answers.q2 || []).length > 0
      ? "Interest and aptitude are aligned"
      : "Interests slightly ahead of current performance",
    exploratoryProfile: isUndecided,   // flag used by frontend to show alternate paths
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

    // WEIGHTS: Market 25%, Future 25%, Aptitude 20%, Interest 20%, Access 10%
    const total =
      marketDemand    * 0.25 +
      futureRelevance * 0.25 +
      aptitude        * 0.20 +
      interest        * 0.20 +
      accessibility   * 0.10;

    const scores = {
      interest, aptitude, futureRelevance,
      marketDemand, accessibility,
      total: Math.round(total),
    };

    const schools        = getSchoolsForStudent(id, answers.q9, answers.q10);
    const fitExplanation = generateFitExplanation(answers, cluster);

    results.push({ cluster, scores, schools, fitExplanation });
  }

  results.sort((a, b) => b.scores.total - a.scores.total);

  const studentProfile = generateStudentProfile(answers);

  // ── Top 3 (primary recommendations) ────────────────────────────────────────
  const top3 = results.slice(0, 3);

  const recommendations = top3.map((r, idx) => ({
    rank:              idx + 1,
    clusterId:         r.cluster.id,
    clusterName:       r.cluster.name,
    tagline:           r.cluster.tagline,
    sssPathway:        r.cluster.sssPathway,
    futureGrowthLabel: r.cluster.futureGrowthLabel,
    threeYearOutlook:  r.cluster.threeYearOutlook,
    careers:           r.cluster.careers,
    matchScore:        r.scores.total,
    scoreBreakdown: {
      interest:        r.scores.interest,
      aptitude:        r.scores.aptitude,
      futureRelevance: r.scores.futureRelevance,
      marketDemand:    r.scores.marketDemand,
      accessibility:   r.scores.accessibility,
    },
    whyItFitsYou:       r.fitExplanation,
    recommendedSchools: r.schools,
  }));

  // ── Alternate 3 (shown only when student used dual-pick = exploratory) ──────
  // These give the undecided student 6 paths total to explore.
  let alternateRecommendations = [];
  if (studentProfile.exploratoryProfile) {
    const next3 = results.slice(3, 6);
    alternateRecommendations = next3.map((r, idx) => ({
      rank:              idx + 4,
      clusterId:         r.cluster.id,
      clusterName:       r.cluster.name,
      tagline:           r.cluster.tagline,
      sssPathway:        r.cluster.sssPathway,
      futureGrowthLabel: r.cluster.futureGrowthLabel,
      threeYearOutlook:  r.cluster.threeYearOutlook,
      careers:           r.cluster.careers,
      matchScore:        r.scores.total,
      scoreBreakdown: {
        interest:        r.scores.interest,
        aptitude:        r.scores.aptitude,
        futureRelevance: r.scores.futureRelevance,
        marketDemand:    r.scores.marketDemand,
        accessibility:   r.scores.accessibility,
      },
      whyItFitsYou:       r.fitExplanation,
      recommendedSchools: r.schools,
    }));
  }

  return {
    success:        true,
    studentProfile,
    recommendations,
    ...(studentProfile.exploratoryProfile && {
      alternateRecommendations,
      exploratoryNote:
        "You selected two options for some questions; that tells us you're still exploring and that's perfectly normal. " +
        "Below are your top 3 career paths based on your full profile, plus 3 additional paths worth considering as you learn more about yourself.",
    }),
    disclaimer:
      "CFFR is a directional tool, not a final verdict. Your interests will grow and change, therefore consider retaking this assessment at key points in your education to see how your profile evolves.",
    generatedAt: new Date().toISOString(),
  };
}

// ─── Input Validator ──────────────────────────────────────────────────────────

function validateAnswers(answers) {
  const errors = [];

  if (!answers || typeof answers !== "object") {
    return { valid: false, errors: ["Request body must be a JSON object with an 'answers' key."] };
  }

  // Q1 — enjoyed subjects (multi-select, 1–3)
  if (!Array.isArray(answers.q1) || answers.q1.length === 0 || answers.q1.length > 3)
    errors.push("Q1: Please select between 1 and 3 subjects you enjoyed.");
  else if (!answers.q1.every((s) => SUBJECTS.includes(s)))
    errors.push("Q1: One or more invalid subject selections.");

  // Q2 — best subjects (multi-select, 1–3)
  if (!Array.isArray(answers.q2) || answers.q2.length === 0 || answers.q2.length > 3)
    errors.push("Q2: Please select between 1 and 3 subjects you performed best in.");
  else if (!answers.q2.every((s) => SUBJECTS.includes(s)))
    errors.push("Q2: One or more invalid subject selections.");

  // Q3 — activity (1 OR 2 picks) ← UPDATED
  const q3 = Array.isArray(answers.q3) ? answers.q3 : answers.q3 ? [answers.q3] : [];
  if (q3.length === 0 || q3.length > 2)
    errors.push("Q3: Please select 1 or 2 activities that describe you.");
  else if (!q3.every((a) => ACTIVITIES.includes(a)))
    errors.push("Q3: One or more invalid activity selections.");

  // Q4 — personality (1 OR 2 picks) ← UPDATED
  const q4 = Array.isArray(answers.q4) ? answers.q4 : answers.q4 ? [answers.q4] : [];
  if (q4.length === 0 || q4.length > 2)
    errors.push("Q4: Please select 1 or 2 personality descriptions.");
  else if (!q4.every((p) => PERSONALITIES.includes(p)))
    errors.push("Q4: One or more invalid personality selections.");

  // Q5 — job value (1 OR 2 picks)
  const q5 = Array.isArray(answers.q5) ? answers.q5 : answers.q5 ? [answers.q5] : [];
  if (q5.length === 0 || q5.length > 2)
    errors.push("Q5: Please select 1 or 2 things that matter most to you.");
  else if (!q5.every((v) => JOB_VALUES.includes(v)))
    errors.push("Q5: One or more invalid job value selections.");

  // Q6 — tech comfort (1–5 scale)
  const q6 = parseInt(answers.q6, 10);
  if (isNaN(q6) || q6 < 1 || q6 > 5)
    errors.push("Q6: Tech comfort level must be between 1 and 5.");

  // Q7 — career space (multi-select, 1–3)
  const q7 = Array.isArray(answers.q7) ? answers.q7 : answers.q7 ? [answers.q7] : [];
  if (q7.length === 0 || q7.length > 3)
    errors.push("Q7: Please select between 1 and 3 career spaces.");
  else if (!q7.every((s) => CAREER_SPACES.includes(s)))
    errors.push("Q7: One or more invalid career space selections.");

  // Q8 — future mindset (1 OR 2 picks)
  const q8 = Array.isArray(answers.q8) ? answers.q8 : answers.q8 ? [answers.q8] : [];
  if (q8.length === 0 || q8.length > 2)
    errors.push("Q8: Please select 1 or 2 mindset statements.");
  else if (!q8.every((v) => FUTURE_MINDSETS.includes(v)))
    errors.push("Q8: One or more invalid mindset selections.");

  // Q9 — county (string)
  if (!answers.q9 || typeof answers.q9 !== "string" || answers.q9.trim() === "")
    errors.push("Q9: Please select your school county.");

  // Q10 — budget (single pick)
  const validBudgetTiers = ["under_30k", "30k_80k", "80k_150k", "150k_300k", "over_300k", "scholarships"];
  if (!validBudgetTiers.includes(answers.q10))
    errors.push("Q10: Please select an education budget range.");

  return { valid: errors.length === 0, errors };
}

module.exports = { runCFFRAssessment, validateAnswers };