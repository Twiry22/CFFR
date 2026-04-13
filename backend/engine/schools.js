/**
 * CFFR Kenya Schools & Universities Database
 * Returns 2 public + 2 private institutions per cluster.
 */

const COUNTY_REGIONS = {
  Nairobi: "nairobi_metro", Kiambu: "nairobi_metro",
  Machakos: "nairobi_metro", Kajiado: "nairobi_metro",
  Muranga: "central", Nyeri: "central", Kirinyaga: "central", Nyandarua: "central",
  Nakuru: "rift_valley", "Uasin Gishu": "rift_valley", "Trans-Nzoia": "rift_valley",
  Kericho: "rift_valley", Bomet: "rift_valley", "Elgeyo-Marakwet": "rift_valley",
  Nandi: "rift_valley", Laikipia: "rift_valley", Baringo: "rift_valley",
  Samburu: "rift_valley", Turkana: "rift_valley", "West Pokot": "rift_valley",
  Narok: "rift_valley",
  Kisumu: "western", Siaya: "western", "Homa Bay": "western", Migori: "western",
  Kisii: "western", Nyamira: "western", Kakamega: "western", Vihiga: "western",
  Bungoma: "western", Busia: "western",
  Mombasa: "coast", Kilifi: "coast", Kwale: "coast",
  "Taita-Taveta": "coast", Lamu: "coast", "Tana River": "coast",
  Meru: "eastern", "Tharaka-Nithi": "eastern", Embu: "eastern",
  Kitui: "eastern", Makueni: "eastern", Marsabit: "eastern", Isiolo: "eastern",
  Garissa: "north_eastern", Wajir: "north_eastern", Mandera: "north_eastern",
};

const REGION_ACCESSIBILITY = {
  nairobi_metro: 95, central: 80, rift_valley: 75,
  western: 70, coast: 65, eastern: 65, north_eastern: 40,
};

const BUDGET_TIERS = {
  under_30k:    { label: "Under KES 30,000/yr",        max: 30000,   score: 20 },
  "30k_80k":    { label: "KES 30,000 – 80,000/yr",     max: 80000,   score: 50 },
  "80k_150k":   { label: "KES 80,000 – 150,000/yr",    max: 150000,  score: 70 },
  "150k_300k":  { label: "KES 150,000 – 300,000/yr",   max: 300000,  score: 85 },
  over_300k:    { label: "Over KES 300,000/yr",         max: Infinity,score: 100 },
  scholarships: { label: "Exploring scholarships",      max: Infinity,score: 75 },
};

const SCHOOLS = [
  // ── TECHNOLOGY & DATA ─────────────────────────────────────────────────────
  {
    name: "University of Nairobi", location: "Nairobi", region: "nairobi_metro", type: "Public",
    clusters: ["technology_data","health_sciences","engineering_built","business_finance","social_governance","green_economy","agricultural_tech"],
    courses: {
      technology_data: "BSc Computer Science / BSc IT", health_sciences: "MBChB / BSc Nursing",
      engineering_built: "BSc Civil / Electrical / Mechanical Engineering",
      business_finance: "Bachelor of Commerce", social_governance: "LLB / BA Social Sciences",
      green_economy: "BSc Environmental Science", agricultural_tech: "BSc Agriculture",
    },
    annualCostKES: 100000, website: "https://www.uonbi.ac.ke",
    notes: "Kenya's flagship public university. HELB sponsorship available.",
  },
  {
    name: "JKUAT", location: "Juja, Kiambu", region: "nairobi_metro", type: "Public",
    clusters: ["technology_data","engineering_built","health_sciences","agricultural_tech","green_economy"],
    courses: {
      technology_data: "BSc Computer Science / BSc IT",
      engineering_built: "BSc Civil / Electrical / Mechanical Engineering",
      health_sciences: "BSc Nursing / BSc Medical Laboratory",
      agricultural_tech: "BSc Agriculture / BSc Food Technology",
      green_economy: "BSc Environmental Engineering",
    },
    annualCostKES: 90000, website: "https://www.jkuat.ac.ke",
    notes: "Top STEM university in Kenya. Strong industry connections.",
  },
  {
    name: "Kenyatta University", location: "Nairobi", region: "nairobi_metro", type: "Public",
    clusters: ["technology_data","health_sciences","social_governance","creative_economy","green_economy","business_finance"],
    courses: {
      technology_data: "BSc Computer Science", health_sciences: "BSc Nursing / BSc Nutrition",
      social_governance: "BA Education / BA Social Work", creative_economy: "BA Fine Art / BA Music",
      green_economy: "BSc Environmental Studies", business_finance: "Bachelor of Commerce",
    },
    annualCostKES: 85000, website: "https://www.ku.ac.ke",
    notes: "Strong for education, health and social sciences.",
  },
  {
    name: "Technical University of Kenya (TUK)", location: "Nairobi", region: "nairobi_metro", type: "Public",
    clusters: ["technology_data","engineering_built","creative_economy"],
    courses: {
      technology_data: "BSc Computer Science / Diploma in IT",
      engineering_built: "BSc Engineering", creative_economy: "BSc Applied Design",
    },
    annualCostKES: 75000, website: "https://www.tukenya.ac.ke",
    notes: "Affordable and well-regarded for practical technical skills.",
  },
  {
    name: "Dedan Kimathi University", location: "Nyeri", region: "central", type: "Public",
    clusters: ["technology_data","engineering_built","green_economy"],
    courses: {
      technology_data: "BSc Computer Science / BSc IT",
      engineering_built: "BSc Engineering", green_economy: "BSc Environmental Science",
    },
    annualCostKES: 80000, website: "https://www.dkut.ac.ke",
    notes: "Technology-focused. Strong for Central Kenya students.",
  },
  {
    name: "Maseno University", location: "Kisumu", region: "western", type: "Public",
    clusters: ["engineering_built","health_sciences","social_governance","green_economy"],
    courses: {
      engineering_built: "BSc Engineering", health_sciences: "BSc Nursing / BSc Medical Laboratory",
      social_governance: "BA Education / BA Social Sciences", green_economy: "BSc Environmental Science",
    },
    annualCostKES: 75000, website: "https://www.maseno.ac.ke",
    notes: "Best public university option for Western Kenya students.",
  },
  {
    name: "Masinde Muliro University", location: "Kakamega", region: "western", type: "Public",
    clusters: ["engineering_built","health_sciences","social_governance","agricultural_tech"],
    courses: {
      engineering_built: "BSc Engineering", health_sciences: "BSc Nursing / BSc Public Health",
      social_governance: "BA Education", agricultural_tech: "BSc Agriculture",
    },
    annualCostKES: 75000, website: "https://www.mmust.ac.ke",
    notes: "Main public university for Western Kenya.",
  },
  {
    name: "Moi University", location: "Eldoret", region: "rift_valley", type: "Public",
    clusters: ["health_sciences","engineering_built","agricultural_tech","social_governance","business_finance"],
    courses: {
      health_sciences: "MBChB / BSc Nursing / BSc Pharmacy",
      engineering_built: "BSc Engineering", agricultural_tech: "BSc Agriculture",
      social_governance: "LLB / BA Education", business_finance: "Bachelor of Commerce",
    },
    annualCostKES: 90000, website: "https://www.mu.ac.ke",
    notes: "Major public university for Rift Valley. Well-regarded medical school.",
  },
  {
    name: "Egerton University", location: "Njoro, Nakuru", region: "rift_valley", type: "Public",
    clusters: ["agricultural_tech","green_economy","health_sciences","business_finance"],
    courses: {
      agricultural_tech: "BSc Agriculture / BSc Food Science & Technology",
      green_economy: "BSc Environmental Science / BSc Natural Resources",
      health_sciences: "BSc Nursing / BSc Nutrition", business_finance: "BCom / Agribusiness",
    },
    annualCostKES: 85000, website: "https://www.egerton.ac.ke",
    notes: "Kenya's premier agricultural university.",
  },
  {
    name: "Pwani University", location: "Kilifi", region: "coast", type: "Public",
    clusters: ["health_sciences","social_governance","green_economy","business_finance"],
    courses: {
      health_sciences: "BSc Nursing / BSc Public Health",
      social_governance: "BA Education / BA Social Sciences",
      green_economy: "BSc Marine Biology / BSc Environmental Science",
      business_finance: "Bachelor of Commerce",
    },
    annualCostKES: 75000, website: "https://www.pu.ac.ke",
    notes: "Best public university option for Coast region students.",
  },
  {
    name: "Technical University of Mombasa", location: "Mombasa", region: "coast", type: "Public",
    clusters: ["technology_data","engineering_built","business_finance"],
    courses: {
      technology_data: "BSc Computer Science / Diploma in IT",
      engineering_built: "BSc Engineering", business_finance: "Bachelor of Commerce",
    },
    annualCostKES: 70000, website: "https://www.tum.ac.ke",
    notes: "Strong technical focus for Coast region students.",
  },
  {
    name: "NITA Institutes", location: "Multiple counties", region: "national", type: "Public",
    clusters: ["engineering_built","technology_data","agricultural_tech"],
    courses: {
      engineering_built: "Artisan / Craft Certificate in Engineering",
      technology_data: "Certificate in IT / Computer Applications",
      agricultural_tech: "Certificate in Agriculture",
    },
    annualCostKES: 25000, website: "https://www.nita.go.ke",
    notes: "Most affordable entry point. TVET pathway. HELB support available.",
  },
  {
    name: "Kenya Institute of Mass Communication (KIMC)", location: "Nairobi", region: "nairobi_metro", type: "Public",
    clusters: ["creative_economy"],
    courses: { creative_economy: "Diploma in Film / Journalism / Photography / Animation" },
    annualCostKES: 45000, website: "https://www.kimc.ac.ke",
    notes: "Kenya's top media and communication institution. Very affordable.",
  },

  // ── PRIVATE ───────────────────────────────────────────────────────────────
  {
    name: "Strathmore University", location: "Nairobi", region: "nairobi_metro", type: "Private",
    clusters: ["technology_data","business_finance","creative_economy"],
    courses: {
      technology_data: "BSc Information Technology / BSc Computer Science",
      business_finance: "Bachelor of Commerce / BSc Actuarial Science",
      creative_economy: "BSc Informatics (UX Design Track)",
    },
    annualCostKES: 200000, website: "https://www.strathmore.edu",
    notes: "Top-ranked private university for tech and business. Strong industry links.",
  },
  {
    name: "USIU-Africa", location: "Nairobi", region: "nairobi_metro", type: "Private",
    clusters: ["technology_data","business_finance","creative_economy","social_governance"],
    courses: {
      technology_data: "BSc Information Technology / BSc Computer Science",
      business_finance: "Bachelor of Business Administration",
      creative_economy: "BA Communication & Media",
      social_governance: "BA International Relations",
    },
    annualCostKES: 250000, website: "https://www.usiu.ac.ke",
    notes: "American curriculum. Strong international exchange programmes.",
  },
  {
    name: "Aga Khan University (AKU)", location: "Nairobi", region: "nairobi_metro", type: "Private",
    clusters: ["health_sciences"],
    courses: { health_sciences: "BScN Nursing / Diploma in Nursing" },
    annualCostKES: 250000, website: "https://www.aku.edu/kenya",
    notes: "World-class nursing education. Scholarship opportunities available.",
  },
  {
    name: "Mount Kenya University", location: "Thika (campuses across Kenya)", region: "central", type: "Private",
    clusters: ["health_sciences","business_finance","social_governance"],
    courses: {
      health_sciences: "BSc Nursing / Diploma in Clinical Medicine / BSc Pharmacy",
      business_finance: "Bachelor of Commerce", social_governance: "LLB / BA Education",
    },
    annualCostKES: 120000, website: "https://www.mku.ac.ke",
    notes: "Multiple campuses across Kenya. Accessible for many counties.",
  },
  {
    name: "KCA University", location: "Nairobi", region: "nairobi_metro", type: "Private",
    clusters: ["technology_data","business_finance"],
    courses: {
      technology_data: "BSc Information Technology",
      business_finance: "Bachelor of Business Administration",
    },
    annualCostKES: 120000, website: "https://www.kcau.ac.ke",
    notes: "Good mix of business and IT. Evening programmes available.",
  },
  {
    name: "Catholic University of Eastern Africa (CUEA)", location: "Nairobi", region: "nairobi_metro", type: "Private",
    clusters: ["social_governance","health_sciences","business_finance"],
    courses: {
      social_governance: "LLB / BA Social Work / BA Education",
      health_sciences: "BSc Health Sciences", business_finance: "Bachelor of Commerce",
    },
    annualCostKES: 150000, website: "https://www.cuea.edu",
    notes: "Strong for law, social sciences and education.",
  },
  {
    name: "Kenya Film School", location: "Nairobi", region: "nairobi_metro", type: "Private",
    clusters: ["creative_economy"],
    courses: { creative_economy: "Certificate / Diploma in Film Production & Direction" },
    annualCostKES: 50000, website: "https://www.kenyafilmschool.ac.ke",
    notes: "Specialist film school. Hands-on training for aspiring filmmakers.",
  },
];

/**
 * Returns exactly 4 schools: 2 Public + 2 Private
 * Filtered by cluster, budget and region.
 */
const getSchoolsForStudent = (clusterId, county, budgetTier) => {
  const region = COUNTY_REGIONS[county] || "nairobi_metro";
  const budget = BUDGET_TIERS[budgetTier];
  if (!budget) return [];

  const matches = SCHOOLS.filter((school) => {
    const clusterMatch = school.clusters.includes(clusterId);
    const budgetMatch  = school.annualCostKES <= budget.max || budgetTier === "scholarships";
    const regionMatch  = school.region === region ||
                         school.region === "nairobi_metro" ||
                         school.region === "national";
    return clusterMatch && budgetMatch && regionMatch;
  }).sort((a, b) => a.annualCostKES - b.annualCostKES);

  // Separate public and private
  const publicSchools  = matches.filter((s) => s.type === "Public").slice(0, 2);
  const privateSchools = matches.filter((s) => s.type === "Private").slice(0, 2);

  // Combine: public first, then private
  return [...publicSchools, ...privateSchools].map((school) => ({
    name:            school.name,
    location:        school.location,
    type:            school.type,
    course:          school.courses[clusterId] || "Various programmes available",
    annualCostRange: `~KES ${school.annualCostKES.toLocaleString()}`,
    website:         school.website,
    notes:           school.notes,
  }));
};

const getGeographicAccessibilityScore = (county) => {
  const region = COUNTY_REGIONS[county];
  return REGION_ACCESSIBILITY[region] || 55;
};

const getBudgetScore = (budgetTier) => {
  return BUDGET_TIERS[budgetTier]?.score || 50;
};

module.exports = {
  SCHOOLS, COUNTY_REGIONS, BUDGET_TIERS,
  getSchoolsForStudent, getGeographicAccessibilityScore, getBudgetScore,
};
