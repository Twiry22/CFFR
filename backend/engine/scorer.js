/**
 * CFFR Scoring Engine  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * VARIABLE WEIGHTS:
 *   Market Demand     25%
 *   Future Relevance  25%
 *   Aptitude          20%
 *   Interest          20%
 *   Accessibility     10%
 *
 * v2.0 CAREER SPECIFICITY UPDATE:
 *   PRIMARY recommendations (3 careers):
 *     — 1 specific career picked from each of the top 3 clusters
 *     — Career chosen by matching student's PRIMARY personality (Q4 pick 1)
 *
 *   ALTERNATE recommendations (3 careers, shown if dual-pick on Q4):
 *     — 1 specific career picked from each of the top 3 clusters
 *     — Career chosen by matching student's SECONDARY personality (Q4 pick 2)
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
const CAREER_SPACES  = [
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
  mathematics:           ["technology_data", "engineering_built", "business_finance", "agricultural_tech"],
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
  solving_figuring:  ["technology_data", "engineering_built", "green_economy", "business_finance"],
  creating_building: ["creative_economy", "engineering_built", "technology_data", "agricultural_tech"],
};

// ─── Secondary Personality Affinity ──────────────────────────────────────────

const SECONDARY_PERSONALITY = {
  technology_data:   ["hands_on_practical",    "organized_goal_setter"],
  health_sciences:   ["organized_goal_setter",  "environmental_caring"],
  engineering_built: ["hands_on_practical",     "curious_analytical"],
  green_economy:     ["curious_analytical",     "hands_on_practical"],
  creative_economy:  ["curious_analytical",     "hands_on_practical"],
  business_finance:  ["curious_analytical",     "caring_social"],
  social_governance: ["organized_goal_setter",  "creative_expressive"],
  agricultural_tech: ["hands_on_practical",     "curious_analytical"],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function toWeightedPicks(raw, maxPicks = 1) {
  if (!raw) return [];
  const arr    = Array.isArray(raw) ? raw : [raw];
  const picks  = arr.slice(0, maxPicks);
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

  (answers.q2 || []).forEach((subject) => {
    if (SUBJECT_CLUSTER_AFFINITY[subject]?.includes(cluster.id)) points += 11;
  });

  toWeightedPicks(answers.q4, 2).forEach(([personality, weight]) => {
    if (personality === cluster.personalityKey) {
      points += Math.round(30 * weight);
    } else if (SECONDARY_PERSONALITY[cluster.id]?.includes(personality)) {
      points += Math.round(15 * weight);
    }
  });

  const q6Level = parseInt(answers.q6, 10) || 1;
  if (cluster.isTechCluster)        points += Math.round((q6Level / 5) * 37);
  else if (cluster.isHealthCluster) points += Math.round((q6Level / 5) * 20);
  else                              points += Math.round((q6Level / 5) * 12);

  return Math.min(points, 100);
}

function calcFutureRelevanceScore(answers, cluster) {
  let studentPoints = 0;
  const q6Level = parseInt(answers.q6, 10) || 1;

  const techFutureClusters = [
    "technology_data", "engineering_built",
    "green_economy", "health_sciences", "agricultural_tech",
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
  const highDemandClusters = ["business_finance", "engineering_built", "technology_data", "health_sciences"];
  const jobValuePicks = Array.isArray(answers.q5) ? answers.q5 : answers.q5 ? [answers.q5] : [];
  if (jobValuePicks.includes("good_income") && highDemandClusters.includes(cluster.id))
    score = Math.min(score + 8, 100);
  return Math.round(score);
}

function calcAccessibilityScore(answers, cluster) {
  const geoScore    = getGeographicAccessibilityScore(answers.q9);
  const budgetScore = getBudgetScore(answers.q10);
  const raw         = budgetScore * 0.6 + geoScore * 0.4;

  if (answers.q10 === "under_30k") {
    const tvetClusters = ["technology_data", "engineering_built", "agricultural_tech", "creative_economy"];
    return tvetClusters.includes(cluster.id)
      ? Math.min(Math.round(raw + 10), 50)
      : Math.min(Math.round(raw), 40);
  }
  return Math.min(Math.round(raw), 100);
}

// ─── Fit Explanation ──────────────────────────────────────────────────────────

function generateFitExplanation(answers, cluster, specificCareer) {
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
    parts.push(`This role suits ${personalityDescriptions[cluster.personalityKey] || "your personality type"}.`);
  }

  const mindsetMessages = {
    keep_learning:               "Your readiness to keep learning puts you well ahead in this fast-evolving field.",
    work_online_internationally: "Your ambition to work online or internationally is a great fit here.",
    cutting_edge:                "Your appetite for cutting-edge work is exactly what this role demands.",
    tech_human_connection:       "Your desire to blend technology with human connection is a growing strength here.",
    work_within_community:       "Your focus on local community impact is well-matched to this career.",
    prefer_established:          "This is one of Kenya's most established career tracks.",
  };
  const mindsetPicks = Array.isArray(answers.q8) ? answers.q8 : answers.q8 ? [answers.q8] : [];
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
    parts.push(`Based on your overall profile, becoming a ${specificCareer} is a strong direction worth exploring.`);

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
  const q6Level          = parseInt(answers.q6, 10) || 1;
  const primaryPersonality = Array.isArray(answers.q4) ? answers.q4[0] : answers.q4;
  const hasSecondaryPersonality = Array.isArray(answers.q4) && answers.q4.length === 2;

  return {
    personalityType:        personalityMap[primaryPersonality] || "Curious Learner",
    techReadiness:          techReadinessMap[q6Level] || "Moderate",
    subjectBreadth:         (answers.q1 || []).length > 2 ? "Broad" : "Focused",
    academicAlignment:      (answers.q1 || []).length > 0 && (answers.q2 || []).length > 0
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

    const total =
      marketDemand    * 0.25 +
      futureRelevance * 0.25 +
      aptitude        * 0.20 +
      interest        * 0.20 +
      accessibility   * 0.10;

    results.push({
      cluster,
      scores: { interest, aptitude, futureRelevance, marketDemand, accessibility, total: Math.round(total) },
      schools: getSchoolsForStudent(id, answers.q9, answers.q10),
    });
  }

  results.sort((a, b) => b.scores.total - a.scores.total);

  const studentProfile       = generateStudentProfile(answers);
  const allPersonalityPicks  = Array.isArray(answers.q4) ? answers.q4 : answers.q4 ? [answers.q4] : [];
  const primaryPersonality   = allPersonalityPicks[0] || null;
  const secondaryPersonality = allPersonalityPicks[1] || null;

  // ── Top 3: 1 specific career per cluster, chosen by primary personality ─────
  const top3 = results.slice(0, 3);

  const recommendations = top3.map((r, idx) => {
    const specificCareer = pickCareerFromCluster(r.cluster, primaryPersonality);
    return {
      rank:              idx + 1,
      specificCareer,
      clusterId:         r.cluster.id,
      clusterName:       r.cluster.name,
      tagline:           r.cluster.tagline,
      sssPathway:        r.cluster.sssPathway,
      futureGrowthLabel: r.cluster.futureGrowthLabel,
      threeYearOutlook:  r.cluster.threeYearOutlook,
      matchScore:        r.scores.total,
      scoreBreakdown:    r.scores,
      whyItFitsYou:      generateFitExplanation(answers, r.cluster, specificCareer),
      recommendedSchools: r.schools,
    };
  });

  // ── Alternates: same top 3 clusters, careers chosen by secondary personality ─
  let alternateRecommendations = [];
  if (studentProfile.hasSecondaryPersonality && secondaryPersonality) {
    alternateRecommendations = top3.map((r, idx) => {
      const specificCareer = pickCareerFromCluster(r.cluster, secondaryPersonality);
      return {
        rank:              idx + 4,
        specificCareer,
        clusterId:         r.cluster.id,
        clusterName:       r.cluster.name,
        tagline:           r.cluster.tagline,
        sssPathway:        r.cluster.sssPathway,
        futureGrowthLabel: r.cluster.futureGrowthLabel,
        threeYearOutlook:  r.cluster.threeYearOutlook,
        matchScore:        r.scores.total,
        scoreBreakdown:    r.scores,
        whyItFitsYou:      generateFitExplanation(answers, r.cluster, specificCareer),
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
        "Your top 3 are based on your primary personality. The 3 below reflect your second personality and are also worth exploring.",
    }),
    disclaimer:
      "CFFR is a directional tool, not a final verdict. Your interests will grow and change, thereforeconsider retaking this assessment at key points in your education.",
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

  const validBudgetTiers = ["under_30k", "30k_80k", "80k_150k", "150k_300k", "over_300k", "scholarships"];
  if (!validBudgetTiers.includes(answers.q10)) errors.push("Q10: Please select an education budget range.");

  return { valid: errors.length === 0, errors };
}

module.exports = { runCFFRAssessment, validateAnswers };