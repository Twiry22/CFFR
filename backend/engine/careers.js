/**
 * CFFR Career Clusters
 * 8 Kenya-specific clusters, each mapped to a CBC Senior Secondary pathway.
 * futureRelevanceIndex: 3-year Kenya outlook (2026–2029) based on innovation trends.
 * marketDemandIndex:    Current Kenya job market demand.
 *
 * FIX v1.1: activityKey values corrected to match ACTIVITY_CLUSTER_AFFINITY
 * keys in scorer.js: "people_difference" | "solving_figuring" | "creating_building"
 * FIX v1.2: subjectInterest / subjectAptitude corrected to match SUBJECTS list
 * in scorer.js so subject-affinity scoring works correctly.
 */

const CAREER_CLUSTERS = {
  technology_data: {
    id: "technology_data",
    name: "Technology & Data",
    tagline: "Build the digital future of Kenya",
    description:
      "From software engineering to artificial intelligence, this cluster sits at the heart of Kenya's growing tech economy. Nairobi's Silicon Savannah is producing global products, and demand for digital talent continues to outpace supply.",
    sssPathway: "STEM",
    futureRelevanceIndex: 95,
    marketDemandIndex: 85,
    threeYearOutlook:
      "Kenya's tech sector is expanding rapidly. Roles in AI, data science, and cybersecurity are among the fastest-growing globally and locally. The government's Digital Economy Blueprint and Konza Techno City are actively creating structured demand.",
    futureGrowthLabel: "🔥 Very High Growth",
    careers: [
      "Software Engineer",
      "Data Analyst",
      "Cybersecurity Analyst",
      "AI & Machine Learning Developer",
      "Web Developer",
      "Mobile App Developer",
      "Cloud Engineer",
      "UX/UI Designer",
      "Systems Administrator",
    ],
    subjectInterest: ["mathematics", "computer_studies"],
    subjectAptitude: ["mathematics", "computer_studies"],
    // FIXED: was "computers_technology" — not a valid key in ACTIVITY_CLUSTER_AFFINITY
    activityKey: "solving_figuring",
    personalityKey: "curious_analytical",
    jobValueKey: "good_income",
    careerSpaceKey: "ai_data_technology",
    futureMindsetKeys: [
      "keep_learning",
      "work_online_internationally",
      "cutting_edge",
      "tech_human_connection",
    ],
    isTechCluster: true,
    isHealthCluster: false,
  },

  health_sciences: {
    id: "health_sciences",
    name: "Health & Human Sciences",
    tagline: "Heal, support and transform lives",
    description:
      "Kenya faces a critical shortage of healthcare workers – there is one doctor for every 10,000 Kenyans. This cluster includes medicine, nursing, clinical science, mental health, pharmacy, nutrition, and public health.",
    sssPathway: "Pure Sciences",
    futureRelevanceIndex: 85,
    marketDemandIndex: 92,
    threeYearOutlook:
      "Post-pandemic investment in Kenya's health system is accelerating. Mental health awareness is rising, and the Universal Health Coverage (UHC) rollout under the Social Health Authority is creating thousands of new healthcare jobs across all 47 counties.",
    futureGrowthLabel: "📈 High Growth",
    careers: [
      "Medical Doctor",
      "Clinical Officer",
      "Registered Nurse",
      "Pharmacist",
      "Nutritionist & Dietitian",
      "Psychologist / Counsellor",
      "Public Health Officer",
      "Physiotherapist",
      "Lab Scientist",
    ],
    subjectInterest: ["biology", "chemistry", "home_science"],
    subjectAptitude: ["biology", "chemistry"],
    // FIXED: was "helping_caring"
    activityKey: "people_difference",
    personalityKey: "caring_social",
    jobValueKey: "making_difference",
    careerSpaceKey: "healthcare_medicine_mental_health",
    futureMindsetKeys: ["tech_human_connection", "work_within_community", "keep_learning"],
    isTechCluster: false,
    isHealthCluster: true,
  },

  engineering_built: {
    id: "engineering_built",
    name: "Engineering & Built Environment",
    tagline: "Design and build the infrastructure Kenya needs",
    description:
      "Civil, electrical, mechanical, and structural engineering underpin Kenya's infrastructure push. From roads and railways to energy grids and smart buildings, engineers are in steady and growing demand.",
    sssPathway: "STEM",
    futureRelevanceIndex: 82,
    marketDemandIndex: 88,
    threeYearOutlook:
      "Kenya's Vision 2030 infrastructure agenda and the affordable housing programme are driving strong demand for engineers. Renewable energy projects (solar, wind, geothermal) also require electrical and mechanical engineers.",
    futureGrowthLabel: "📈 High Growth",
    careers: [
      "Civil Engineer",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Structural Engineer",
      "Urban & Regional Planner",
      "Quantity Surveyor",
      "Renewable Energy Engineer",
      "Construction Project Manager",
    ],
    subjectInterest: ["mathematics", "physics", "computer_studies"],
    subjectAptitude: ["mathematics", "physics"],
    // FIXED: was "building_fixing"
    activityKey: "creating_building",
    personalityKey: "curious_analytical",
    jobValueKey: "building_creating",
    careerSpaceKey: "climate_renewable_energy",
    futureMindsetKeys: ["keep_learning", "cutting_edge", "work_within_community"],
    isTechCluster: true,
    isHealthCluster: false,
  },

  green_economy: {
    id: "green_economy",
    name: "Green Economy & Environment",
    tagline: "Protect the planet and build climate solutions",
    description:
      "From renewable energy and climate science to conservation and environmental law, this cluster is one of the fastest-growing globally. Kenya is a continental leader in geothermal power and wildlife conservation.",
    sssPathway: "STEM or Social Sciences",
    futureRelevanceIndex: 90,
    marketDemandIndex: 75,
    threeYearOutlook:
      "Kenya's green economy is being supercharged by carbon credit markets, the Africa Climate Summit, and multi-billion donor-funded conservation projects. The shift to electric vehicles and solar energy is creating new technical roles across the country.",
    futureGrowthLabel: "🌿 Very High Growth",
    careers: [
      "Environmental Scientist",
      "Renewable Energy Technologist",
      "Conservation Officer",
      "Climate Change Analyst",
      "Water Resource Engineer",
      "Environmental Lawyer",
      "Sustainability Consultant",
      "Wildlife Ecologist",
    ],
    subjectInterest: ["biology", "geography", "agriculture"],
    subjectAptitude: ["biology", "geography", "mathematics"],
    // FIXED: was "nature_animals_food"
    activityKey: "solving_figuring",
    personalityKey: "environmental_caring",
    jobValueKey: "making_difference",
    careerSpaceKey: "climate_renewable_energy",
    futureMindsetKeys: [
      "keep_learning",
      "cutting_edge",
      "work_within_community",
      "work_online_internationally",
    ],
    isTechCluster: false,
    isHealthCluster: false,
  },

  creative_economy: {
    id: "creative_economy",
    name: "Creative Economy & Digital Media",
    tagline: "Tell Kenya's story to the world",
    description:
      "The creator economy is booming. From graphic design, film and animation to architecture, game development, and fashion, creative professionals are in growing demand – especially as African storytelling goes global.",
    sssPathway: "Arts & Sports Science",
    futureRelevanceIndex: 72,
    marketDemandIndex: 68,
    threeYearOutlook:
      "Kenya's creative sector is expanding, especially in digital content, Afrofusion music, and film. The rise of social media and global streaming platforms has opened real income streams for creative Kenyans. Competition is high but opportunities are global.",
    futureGrowthLabel: "🎨 Growing",
    careers: [
      "Graphic & Brand Designer",
      "Film Director / Cinematographer",
      "Animator & Motion Graphics Artist",
      "Architect",
      "Digital Content Creator",
      "Fashion Designer",
      "Game Developer",
      "Journalist & Media Producer",
      "Photographer",
    ],
    subjectInterest: ["art_design", "english", "computer_studies"],
    subjectAptitude: ["art_design", "english"],
    // FIXED: was "creating_art"
    activityKey: "creating_building",
    personalityKey: "creative_expressive",
    jobValueKey: "creative_expression",
    careerSpaceKey: "digital_media_content_design",
    futureMindsetKeys: [
      "work_online_internationally",
      "cutting_edge",
      "tech_human_connection",
    ],
    isTechCluster: false,
    isHealthCluster: false,
  },

  business_finance: {
    id: "business_finance",
    name: "Business, Finance & Entrepreneurship",
    tagline: "Drive commerce and create economic value",
    description:
      "Kenya has one of the most vibrant entrepreneurship cultures in Africa. From banking and finance to marketing, accounting, and startups, this cluster underpins every sector of the economy.",
    sssPathway: "Social Sciences",
    futureRelevanceIndex: 72,
    marketDemandIndex: 80,
    threeYearOutlook:
      "Fintech continues to disrupt traditional banking in Kenya, creating roles at the intersection of finance and technology. Entrepreneurship support ecosystems are maturing. Accounting and audit remain stable, high-paying professions.",
    futureGrowthLabel: "💼 Stable with Tech Disruption",
    careers: [
      "Accountant / CPA",
      "Financial Analyst",
      "Entrepreneur / Startup Founder",
      "Marketing & Brand Manager",
      "Investment Analyst",
      "Actuary",
      "Supply Chain Manager",
      "Human Resources Manager",
      "Fintech Specialist",
    ],
    subjectInterest: ["mathematics", "business_studies", "english"],
    subjectAptitude: ["mathematics", "business_studies"],
    // FIXED: was "organizing_leading"
    activityKey: "solving_figuring",
    personalityKey: "organized_goal_setter",
    jobValueKey: "good_income",
    careerSpaceKey: "finance_banking_entrepreneurship",
    futureMindsetKeys: ["keep_learning", "tech_human_connection", "work_online_internationally"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  social_governance: {
    id: "social_governance",
    name: "Social Sciences, Law & Governance",
    tagline: "Shape policy, uphold justice, empower communities",
    description:
      "Lawyers, educators, social workers, diplomats, and policy analysts are the backbone of a functioning society. Kenya's growing legal, NGO, and government sectors offer stable and meaningful careers.",
    sssPathway: "Social Sciences",
    futureRelevanceIndex: 65,
    marketDemandIndex: 70,
    threeYearOutlook:
      "Devolution has increased demand for skilled county government workers. The NGO and development sector remains one of Kenya's largest employers. Law, especially in areas of tech regulation, land rights, and human rights, is growing.",
    futureGrowthLabel: "⚖️ Steady Demand",
    careers: [
      "Lawyer / Advocate",
      "Teacher / Educator",
      "Social Worker",
      "Policy Analyst",
      "Diplomat / Foreign Service Officer",
      "Journalist",
      "Community Development Officer",
      "Human Rights Advocate",
      "NGO Programme Manager",
    ],
    subjectInterest: ["english", "kiswahili", "history_government"],
    subjectAptitude: ["english", "history_government"],
    // FIXED: was "communicating_teaching"
    activityKey: "people_difference",
    personalityKey: "caring_social",
    jobValueKey: "making_difference",
    careerSpaceKey: "law_policy_governance",
    futureMindsetKeys: ["work_within_community", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  agricultural_tech: {
    id: "agricultural_tech",
    name: "Agricultural & Food Technology",
    tagline: "Feed Kenya and lead the agri-tech revolution",
    description:
      "Kenya's agriculture sector employs over 40% of the population but is being transformed by precision farming, drone technology, and food processing. Modern agribusiness is no longer just farming — it's science, data, and global markets.",
    sssPathway: "STEM or Social Sciences",
    futureRelevanceIndex: 86,
    marketDemandIndex: 78,
    threeYearOutlook:
      "AgriTech is one of Kenya's most exciting emerging sectors. Drone spraying, soil analytics, mobile apps for farmers, and cold chain logistics are creating entirely new job categories. Kenya is a major global exporter of tea, coffee, and horticulture.",
    futureGrowthLabel: "🌾 High Growth",
    careers: [
      "Agronomist",
      "Food Scientist",
      "Agricultural Engineer",
      "Veterinarian",
      "Horticulturalist",
      "AgriTech Entrepreneur",
      "Food Safety Inspector",
      "Animal Scientist",
      "Agribusiness Manager",
    ],
    subjectInterest: ["agriculture", "biology", "business_studies"],
    subjectAptitude: ["agriculture", "biology", "mathematics"],
    // FIXED: was "nature_animals_food"
    activityKey: "people_difference",
    personalityKey: "environmental_caring",
    jobValueKey: "making_difference",
    careerSpaceKey: "modern_agribusiness_food_tech",
    futureMindsetKeys: [
      "work_within_community",
      "keep_learning",
      "tech_human_connection",
    ],
    isTechCluster: false,
    isHealthCluster: false,
  },
};

const getClusterIds = () => Object.keys(CAREER_CLUSTERS);
const getCluster = (id) => CAREER_CLUSTERS[id] || null;

module.exports = { CAREER_CLUSTERS, getClusterIds, getCluster };
