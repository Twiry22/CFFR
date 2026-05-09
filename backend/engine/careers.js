/**
 * CFFR Career Clusters  v2.2
 * 13 Kenya-specific clusters, each mapped to a CBC Senior Secondary pathway.
 * futureRelevanceIndex: 3-year Kenya outlook (2026–2029).
 * marketDemandIndex:    Current Kenya job market demand.
 *
 * NEW in v2.0:
 *   + sports_recreation    — Football, coaching, sports science, athletics
 *   + hospitality_tourism  — Hotel management, culinary, tour guiding, events
 *   + automotive_trades    — Mechanics, auto electrical, logistics
 *   + beauty_wellness      — Hair, beauty therapy, nail tech, spa management
 * NEW in v2.1:
 *   + education_teaching   — Teaching, ECD, special needs, curriculum, training
 */

const CAREER_CLUSTERS = {

  // ── EXISTING 8 CLUSTERS ───────────────────────────────────────────────────

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
    futureGrowthLabel: "Very High Growth",
    careers: [
      "Software Engineer", "Data Analyst", "Cybersecurity Analyst",
      "AI & Machine Learning Developer", "Web Developer", "Mobile App Developer",
      "Cloud Engineer", "UX/UI Designer", "Systems Administrator",
    ],
    subjectInterest: ["mathematics", "computer_studies", "computer_ict"],
    subjectAptitude: ["mathematics", "computer_studies", "computer_ict"],
    activityKey: "solving_figuring",
    personalityKey: "curious_analytical",
    jobValueKey: "good_income",
    careerSpaceKey: "ai_data_technology",
    futureMindsetKeys: ["keep_learning", "work_online_internationally", "cutting_edge", "tech_human_connection"],
    isTechCluster: true,
    isHealthCluster: false,
  },

  health_sciences: {
    id: "health_sciences",
    name: "Health & Human Sciences",
    tagline: "Heal, support and transform lives",
    description:
      "Kenya faces a critical shortage of healthcare workers — there is one doctor for every 10,000 Kenyans. This cluster includes medicine, nursing, clinical science, mental health, pharmacy, nutrition, and public health.",
    sssPathway: "Pure Sciences",
    futureRelevanceIndex: 85,
    marketDemandIndex: 92,
    threeYearOutlook:
      "Post-pandemic investment in Kenya's health system is accelerating. Mental health awareness is rising, and the Universal Health Coverage (UHC) rollout under the Social Health Authority is creating thousands of new healthcare jobs across all 47 counties.",
    futureGrowthLabel: "High Growth",
    careers: [
      "Medical Doctor", "Clinical Officer", "Registered Nurse", "Pharmacist",
      "Nutritionist & Dietitian", "Psychologist / Counsellor", "Public Health Officer",
      "Physiotherapist", "Lab Scientist",
    ],
    subjectInterest: ["biology", "chemistry", "home_science", "agriculture_nutrition"],
    subjectAptitude: ["biology", "chemistry"],
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
    futureGrowthLabel: "High Growth",
    careers: [
      "Civil Engineer", "Electrical Engineer", "Mechanical Engineer", "Structural Engineer",
      "Urban & Regional Planner", "Quantity Surveyor", "Renewable Energy Engineer",
      "Construction Project Manager",
    ],
    subjectInterest: ["mathematics", "physics", "computer_studies"],
    subjectAptitude: ["mathematics", "physics"],
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
    futureGrowthLabel: "Very High Growth",
    careers: [
      "Environmental Scientist", "Renewable Energy Technologist", "Conservation Officer",
      "Climate Change Analyst", "Water Resource Engineer", "Environmental Lawyer",
      "Sustainability Consultant", "Wildlife Ecologist",
    ],
    subjectInterest: ["biology", "geography", "agriculture"],
    subjectAptitude: ["biology", "geography", "mathematics"],
    activityKey: "solving_figuring",
    personalityKey: "environmental_caring",
    jobValueKey: "making_difference",
    careerSpaceKey: "climate_renewable_energy",
    futureMindsetKeys: ["keep_learning", "cutting_edge", "work_within_community", "work_online_internationally"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  creative_economy: {
    id: "creative_economy",
    name: "Creative Economy & Digital Media",
    tagline: "Tell Kenya's story to the world",
    description:
      "The creator economy is booming. From graphic design, film and animation to architecture, game development, and fashion, creative professionals are in growing demand — especially as African storytelling goes global.",
    sssPathway: "Arts & Sports Science",
    futureRelevanceIndex: 72,
    marketDemandIndex: 68,
    threeYearOutlook:
      "Kenya's creative sector is expanding, especially in digital content, Afrofusion music, and film. The rise of social media and global streaming platforms has opened real income streams for creative Kenyans.",
    futureGrowthLabel: "Growing",
    careers: [
      "Graphic & Brand Designer", "Film Director / Cinematographer", "Animator & Motion Graphics Artist",
      "Architect", "Digital Content Creator", "Fashion Designer", "Game Developer",
      "Journalist & Media Producer", "Photographer",
    ],
    subjectInterest: ["art_design", "english", "computer_studies", "creative_arts"],
    subjectAptitude: ["art_design", "english", "creative_arts"],
    activityKey: "creating_building",
    personalityKey: "creative_expressive",
    jobValueKey: "creative_expression",
    careerSpaceKey: "digital_media_content_design",
    futureMindsetKeys: ["work_online_internationally", "cutting_edge", "tech_human_connection"],
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
    futureGrowthLabel: "Stable with Tech Disruption",
    careers: [
      "Accountant / CPA", "Financial Analyst", "Entrepreneur / Startup Founder",
      "Marketing & Brand Manager", "Investment Analyst", "Actuary",
      "Supply Chain Manager", "Human Resources Manager", "Fintech Specialist",
    ],
    subjectInterest: ["mathematics", "business_studies", "english"],
    subjectAptitude: ["mathematics", "business_studies"],
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
    futureGrowthLabel: "Steady Demand",
    careers: [
      "Lawyer / Advocate", "Teacher / Educator", "Social Worker", "Policy Analyst",
      "Diplomat / Foreign Service Officer", "Journalist", "Community Development Officer",
      "Human Rights Advocate", "NGO Programme Manager",
    ],
    subjectInterest: ["english", "kiswahili", "history_government", "social_studies_cre"],
    subjectAptitude: ["english", "history_government", "social_studies_cre"],
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
    futureGrowthLabel: "High Growth",
    careers: [
      "Agronomist", "Food Scientist", "Agricultural Engineer", "Veterinarian",
      "Horticulturalist", "AgriTech Entrepreneur", "Food Safety Inspector",
      "Animal Scientist", "Agribusiness Manager",
    ],
    subjectInterest: ["agriculture", "biology", "business_studies", "agriculture_nutrition"],
    subjectAptitude: ["agriculture", "biology", "mathematics", "agriculture_nutrition"],
    activityKey: "people_difference",
    personalityKey: "environmental_caring",
    jobValueKey: "making_difference",
    careerSpaceKey: "modern_agribusiness_food_tech",
    futureMindsetKeys: ["work_within_community", "keep_learning", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  // ── 4 NEW CLUSTERS ────────────────────────────────────────────────────────

  sports_recreation: {
    id: "sports_recreation",
    name: "Sports, Coaching & Recreation",
    tagline: "Turn passion for sport into a professional career",
    description:
      "Kenya is a global powerhouse in athletics and a growing force in football, rugby, and basketball. Behind every elite athlete is a team of coaches, sports scientists, physiotherapists, fitness trainers, and sports managers. This cluster is for students who live and breathe sport.",
    sssPathway: "Arts & Sports Science",
    futureRelevanceIndex: 70,
    marketDemandIndex: 65,
    threeYearOutlook:
      "Kenya's sports industry is professionalising rapidly. The government's Sports, Arts and Social Development Fund, growing football leagues, and international athletics contracts are creating structured career paths. Sports tourism and fitness culture are also booming.",
    futureGrowthLabel: "Growing",
    careers: [
      "Football / Athletics Coach",
      "Sports Scientist",
      "Physical Education Teacher",
      "Fitness Trainer / Personal Trainer",
      "Sports Physiotherapist",
      "Sports Manager / Administrator",
      "Recreation & Leisure Manager",
      "Sports Journalist / Commentator",
      "Referee / Match Official",
    ],
    subjectInterest: ["physical_education", "biology"],
    subjectAptitude: ["physical_education", "biology"],
    activityKey: "people_difference",
    personalityKey: "hands_on_practical",
    jobValueKey: "making_difference",
    careerSpaceKey: "sports_fitness_recreation",
    futureMindsetKeys: ["work_within_community", "keep_learning", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  hospitality_tourism: {
    id: "hospitality_tourism",
    name: "Hospitality, Tourism & Events",
    tagline: "Welcome the world to Kenya",
    description:
      "Kenya is one of Africa's top tourist destinations — from Maasai Mara safaris to Diani Beach and Nairobi's five-star hotels. This cluster covers hotel management, culinary arts, tour guiding, event planning, and travel management.",
    sssPathway: "Social Sciences or Arts & Sports Science",
    futureRelevanceIndex: 74,
    marketDemandIndex: 72,
    threeYearOutlook:
      "Kenya's tourism sector recovered strongly after COVID and is targeting 5 million international visitors by 2027. New luxury lodges, MICE (Meetings, Incentives, Conferences, Exhibitions) infrastructure, and Airbnb culture are all expanding job opportunities.",
    futureGrowthLabel: "High Growth",
    careers: [
      "Hotel Manager",
      "Chef / Culinary Artist",
      "Tour Guide / Safari Guide",
      "Event Planner & Manager",
      "Travel & Tourism Agent",
      "Front Office Manager",
      "Food & Beverage Manager",
      "Housekeeper / Accommodation Manager",
      "Restaurant Manager",
    ],
    subjectInterest: ["home_science", "english", "geography", "agriculture_nutrition"],
    subjectAptitude: ["home_science", "english", "business_studies"],
    activityKey: "people_difference",
    personalityKey: "caring_social",
    jobValueKey: "making_difference",
    careerSpaceKey: "hospitality_tourism_events",
    futureMindsetKeys: ["work_within_community", "work_online_internationally", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  automotive_trades: {
    id: "automotive_trades",
    name: "Automotive, Mechanics & Logistics",
    tagline: "Keep Kenya moving",
    description:
      "Every vehicle on Kenya's roads needs skilled mechanics, auto electricians, and technicians. With EVs on the rise and a booming logistics sector, this cluster is far more future-proof than most people think.",
    sssPathway: "STEM (Technical)",
    futureRelevanceIndex: 72,
    marketDemandIndex: 80,
    threeYearOutlook:
      "Kenya's road network expansion, growing matatu and logistics industries, and the shift toward electric vehicles are creating sustained demand for automotive technicians. Certified mechanics command strong incomes, especially in major towns.",
    futureGrowthLabel: "Stable High Demand",
    careers: [
      "Automotive Mechanic",
      "Auto Electrician",
      "EV (Electric Vehicle) Technician",
      "Motorcycle Mechanic",
      "Diesel Plant Mechanic",
      "Logistics & Fleet Manager",
      "Driving Instructor",
      "Spray Painter / Panel Beater",
      "Auto Parts Specialist",
    ],
    subjectInterest: ["physics", "mathematics", "computer_ict"],
    subjectAptitude: ["physics", "mathematics"],
    activityKey: "creating_building",
    personalityKey: "hands_on_practical",
    jobValueKey: "building_creating",
    careerSpaceKey: "automotive_logistics_trades",
    futureMindsetKeys: ["keep_learning", "work_within_community", "cutting_edge"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  education_teaching: {
    id: "education_teaching",
    name: "Education & Teaching",
    tagline: "Shape the next generation of Kenyans",
    description:
      "Teaching is one of Kenya's most stable and respected professions, and the CBC rollout is actively reshaping what it means to be an educator. From primary school teachers and ECD specialists to university lecturers and corporate trainers, this cluster is for people who love helping others grow and learn.",
    sssPathway: "Social Sciences or Arts & Sports Science",
    futureRelevanceIndex: 75,
    marketDemandIndex: 82,
    threeYearOutlook:
      "Kenya's CBC curriculum reforms are creating significant demand for retrained and newly qualified teachers across all levels. The government's teacher employment drive under the Teachers Service Commission (TSC) continues to absorb thousands of graduates annually. ECD and special needs education are priority growth areas.",
    futureGrowthLabel: "Steady High Demand",
    careers: [
      "Primary School Teacher",
      "Secondary School Teacher",
      "Early Childhood Development (ECD) Teacher",
      "Special Needs Educator",
      "University Lecturer / Researcher",
      "Education Administrator / Head Teacher",
      "Curriculum Developer",
      "Corporate Trainer / L&D Specialist",
      "Education Consultant",
    ],
    subjectInterest: ["english", "kiswahili", "history_government", "biology", "mathematics", "social_studies_cre"],
    subjectAptitude: ["english", "kiswahili", "history_government", "social_studies_cre"],
    activityKey: "people_difference",
    personalityKey: "caring_social",
    jobValueKey: "making_difference",
    careerSpaceKey: "education_community_development",
    futureMindsetKeys: ["work_within_community", "keep_learning", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  education_teaching: {
    id: "education_teaching",
    name: "Education & Teaching",
    tagline: "Shape the next generation of Kenyans",
    description:
      "Teaching is one of the most impactful and stable careers in Kenya. From Early Childhood Development and primary school to secondary, special needs, university lecturing, and corporate training, this cluster is for students who love learning and love helping others grow.",
    sssPathway: "Social Sciences or Arts & Sports Science",
    futureRelevanceIndex: 75,
    marketDemandIndex: 82,
    threeYearOutlook:
      "Kenya's CBC rollout is creating massive demand for retrained and newly qualified teachers at all levels. The government's Junior Secondary School expansion programme is hiring thousands of new teachers. ECD is also a rapidly growing specialisation as early education gains policy focus.",
    futureGrowthLabel: "High Steady Demand",
    careers: [
      "Primary School Teacher",
      "Secondary School Teacher",
      "Early Childhood Development (ECD) Teacher",
      "Special Needs Educator",
      "University Lecturer / Researcher",
      "Education Administrator / Head Teacher",
      "Curriculum Developer",
      "Corporate Trainer / L&D Specialist",
      "Education Consultant",
    ],
    subjectInterest: ["english", "kiswahili", "history_government", "biology", "mathematics", "social_studies_cre"],
    subjectAptitude: ["english", "kiswahili", "history_government", "social_studies_cre"],
    activityKey: "people_difference",
    personalityKey: "caring_social",
    jobValueKey: "making_difference",
    careerSpaceKey: "education_community_development",
    futureMindsetKeys: ["work_within_community", "keep_learning", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },

  beauty_wellness: {
    id: "beauty_wellness",
    name: "Beauty, Hair & Wellness",
    tagline: "Build a business out of making people feel amazing",
    description:
      "Kenya's beauty industry is worth billions and growing fast. From hair salons and barbershops to nail studios, skin clinics, and spa management, this cluster offers real entrepreneurial and employment opportunities — especially for those with flair, creativity, and people skills.",
    sssPathway: "Arts & Sports Science or Social Sciences",
    futureRelevanceIndex: 66,
    marketDemandIndex: 74,
    threeYearOutlook:
      "Kenya's beauty sector is expanding beyond salons into skincare brands, beauty tech, wellness tourism, and online tutorials. Social media has made beauty entrepreneurship accessible to young Kenyans, and demand for trained professionals is rising in hotels, clinics, and events.",
    futureGrowthLabel: "Growing",
    careers: [
      "Hair Stylist / Salon Owner",
      "Barber / Barbershop Owner",
      "Beauty Therapist",
      "Nail Technician",
      "Makeup Artist",
      "Spa & Wellness Manager",
      "Skincare & Aesthetics Therapist",
      "Beauty Product Entrepreneur",
      "Cosmetology Instructor",
    ],
    subjectInterest: ["home_science", "art_design", "biology", "creative_arts"],
    subjectAptitude: ["home_science", "art_design", "creative_arts"],
    activityKey: "creating_building",
    personalityKey: "creative_expressive",
    jobValueKey: "creative_expression",
    careerSpaceKey: "beauty_wellness_personal_care",
    futureMindsetKeys: ["work_within_community", "work_online_internationally", "tech_human_connection"],
    isTechCluster: false,
    isHealthCluster: false,
  },
};

// ─── Cluster Helpers ──────────────────────────────────────────────────────────

const getClusterIds = () => Object.keys(CAREER_CLUSTERS);
const getCluster   = (id) => CAREER_CLUSTERS[id] || null;

// ─── Personality → Specific Career Map ───────────────────────────────────────

const CAREER_PERSONALITY_MAP = {
  technology_data: {
    curious_analytical:    "Software Engineer",
    creative_expressive:   "UX/UI Designer",
    organized_goal_setter: "IT Project Manager",
    hands_on_practical:    "Systems Administrator",
    caring_social:         "IT Project Manager",
    environmental_caring:  "Cloud Engineer",
  },
  health_sciences: {
    caring_social:         "Public Health Officer",
    organized_goal_setter: "Pharmacist",
    curious_analytical:    "Lab Scientist",
    hands_on_practical:    "Physiotherapist",
    creative_expressive:   "Nutritionist & Dietitian",
    environmental_caring:  "Public Health Officer",
  },
  engineering_built: {
    hands_on_practical:    "Civil Engineer",
    curious_analytical:    "Electrical Engineer",
    organized_goal_setter: "Construction Project Manager",
    creative_expressive:   "Urban & Regional Planner",
    caring_social:         "Quantity Surveyor",
    environmental_caring:  "Renewable Energy Engineer",
  },
  green_economy: {
    environmental_caring:  "Environmental Scientist",
    curious_analytical:    "Climate Change Analyst",
    hands_on_practical:    "Water Resource Engineer",
    organized_goal_setter: "Sustainability Consultant",
    creative_expressive:   "Environmental Lawyer",
    caring_social:         "Conservation Officer",
  },
  creative_economy: {
    creative_expressive:   "Graphic & Brand Designer",
    curious_analytical:    "Game Developer",
    hands_on_practical:    "Photographer",
    caring_social:         "Journalist & Media Producer",
    organized_goal_setter: "Architect",
    environmental_caring:  "Digital Content Creator",
  },
  business_finance: {
    organized_goal_setter: "Entrepreneur / Startup Founder",
    curious_analytical:    "Financial Analyst",
    caring_social:         "Human Resources Manager",
    creative_expressive:   "Marketing & Brand Manager",
    hands_on_practical:    "Supply Chain Manager",
    environmental_caring:  "Fintech Specialist",
  },
  social_governance: {
    caring_social:         "Community Development Officer",
    organized_goal_setter: "Lawyer / Advocate",
    creative_expressive:   "Journalist",
    curious_analytical:    "Policy Analyst",
    hands_on_practical:    "Social Worker",
    environmental_caring:  "Human Rights Advocate",
  },
  agricultural_tech: {
    environmental_caring:  "Agronomist",
    hands_on_practical:    "Agricultural Engineer",
    curious_analytical:    "Food Scientist",
    caring_social:         "Veterinarian",
    organized_goal_setter: "Agribusiness Manager",
    creative_expressive:   "AgriTech Entrepreneur",
  },
  sports_recreation: {
    hands_on_practical:    "Football / Athletics Coach",
    caring_social:         "Physical Education Teacher",
    organized_goal_setter: "Sports Manager / Administrator",
    curious_analytical:    "Sports Scientist",
    creative_expressive:   "Sports Journalist / Commentator",
    environmental_caring:  "Recreation & Leisure Manager",
  },
  hospitality_tourism: {
    caring_social:         "Hotel Manager",
    creative_expressive:   "Chef / Culinary Artist",
    organized_goal_setter: "Event Planner & Manager",
    hands_on_practical:    "Tour Guide / Safari Guide",
    curious_analytical:    "Travel & Tourism Agent",
    environmental_caring:  "Food & Beverage Manager",
  },
  automotive_trades: {
    hands_on_practical:    "Automotive Mechanic",
    curious_analytical:    "Auto Electrician",
    organized_goal_setter: "Logistics & Fleet Manager",
    creative_expressive:   "Spray Painter / Panel Beater",
    caring_social:         "Driving Instructor",
    environmental_caring:  "EV (Electric Vehicle) Technician",
  },
  education_teaching: {
    caring_social:         "Primary School Teacher",
    organized_goal_setter: "Education Administrator / Head Teacher",
    creative_expressive:   "Early Childhood Development (ECD) Teacher",
    curious_analytical:    "Curriculum Developer",
    hands_on_practical:    "Special Needs Educator",
    environmental_caring:  "Education Consultant",
  },
  beauty_wellness: {
    creative_expressive:   "Hair Stylist / Salon Owner",
    caring_social:         "Beauty Therapist",
    organized_goal_setter: "Spa & Wellness Manager",
    hands_on_practical:    "Nail Technician",
    curious_analytical:    "Skincare & Aesthetics Therapist",
    environmental_caring:  "Beauty Product Entrepreneur",
  },
};

/**
 * pickCareerFromCluster
 * Returns the single best-fit career title for a personality within a cluster.
 * Falls back to the first career in the cluster list if no match.
 */
function pickCareerFromCluster(cluster, personality) {
  const map = CAREER_PERSONALITY_MAP[cluster.id];
  if (map && personality && map[personality]) return map[personality];
  return cluster.careers[0];
}

module.exports = { CAREER_CLUSTERS, getClusterIds, getCluster, pickCareerFromCluster };
