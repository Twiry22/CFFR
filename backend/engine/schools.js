/**
 * CFFR Kenya Schools & Universities Database  v4.0
 * ─────────────────────────────────────────────────────────────────────────────
 * v2.0 — level field (university | tvet), qualification filter
 * v3.0 — 4 new clusters: sports, hospitality, automotive, beauty + education
 * v4.0 — Built from live v3.0:
 *         • creative_economy stripped from non-media schools (NITA, TUK,
 *           Utalii, Kisumu Poly, NTTI, Kisumu Poly)
 *         • parallelCostKES + parallelNotes added to all public universities
 *         • Popular Nairobi TVETs + short course providers added
 *           (Zetech, KCA, MMU, MUA, Pioneer, Nairobi Aviation, KASNEB,
 *            NIBS, KSPS, Moringa, AkiraChix, ALX, Steiner, Tony's,
 *            Kudos, Dandora, Pumwani, Mathare polytechnics)
 *         • getSchoolsForStudent rewritten:
 *             LOW KCSE  → TVETs first (up to 3) → parallel unis (up to 2, exact fees)
 *             SKIPPED   → best unis by budget (up to 2) + TVETs (up to 2)
 *             HIGH KCSE → public first, then private (current behaviour)
 *         • formatSchool: includes parallelAdmission block when relevant
 *         • getScholarshipsForCluster: universal + cluster-specific with links
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
  under_30k:    { label: "Under KES 30,000/yr",        max: 30000,    score: 20 },
  "30k_80k":    { label: "KES 30,000 – 80,000/yr",     max: 80000,    score: 50 },
  "80k_150k":   { label: "KES 80,000 – 150,000/yr",    max: 150000,   score: 70 },
  "150k_300k":  { label: "KES 150,000 – 300,000/yr",   max: 300000,   score: 85 },
  over_300k:    { label: "Over KES 300,000/yr",         max: Infinity, score: 100 },
  scholarships: { label: "Exploring scholarships",      max: Infinity, score: 75 },
};

const QUALIFICATION_MAP = {
  above_60: "university",
  "50_60":  "university",
  "40_50":  "university",
  "30_40":  "university",
  "20_30":  "tvet",
  "10_20":  "tvet",
  below_10: "tvet",
  skipped:  "all",
};

const getQualificationLevel = (q11Answer) => {
  if (!q11Answer) return "all";
  return QUALIFICATION_MAP[q11Answer] || "all";
};

// ─── Schools Database ─────────────────────────────────────────────────────────

const SCHOOLS = [

  // ══════════════════════════════════════════════════════════════════════════
  // UNIVERSITIES & COLLEGES
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "University of Nairobi", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["technology_data","health_sciences","engineering_built","business_finance","social_governance","green_economy","agricultural_tech"],
    courses: {
      technology_data:   "BSc Computer Science / BSc IT",
      health_sciences:   "MBChB / BSc Nursing",
      engineering_built: "BSc Civil / Electrical / Mechanical Engineering",
      business_finance:  "Bachelor of Commerce",
      social_governance: "LLB / BA Social Sciences",
      green_economy:     "BSc Environmental Science",
      agricultural_tech: "BSc Agriculture",
    },
    annualCostKES: 100000, parallelCostKES: 180000,
    website: "https://www.uonbi.ac.ke",
    notes: "Kenya's flagship public university. HELB sponsorship available.",
    parallelNotes: "Parallel/Module II admission available for most programmes. No minimum grade — fees cover the difference. Apply directly through UoN admissions.",
  },
  {
    name: "JKUAT", location: "Juja, Kiambu", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["technology_data","engineering_built","health_sciences","agricultural_tech","green_economy"],
    courses: {
      technology_data:   "BSc Computer Science / BSc IT",
      engineering_built: "BSc Civil / Electrical / Mechanical Engineering",
      health_sciences:   "BSc Nursing / BSc Medical Laboratory",
      agricultural_tech: "BSc Agriculture / BSc Food Technology",
      green_economy:     "BSc Environmental Engineering",
    },
    annualCostKES: 90000, parallelCostKES: 160000,
    website: "https://www.jkuat.ac.ke",
    notes: "Top STEM university in Kenya. Strong industry connections.",
    parallelNotes: "Parallel admission available for Engineering, IT and Science programmes. Strong KCSE in Maths/Sciences recommended even for parallel.",
  },
  {
    name: "Kenyatta University", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["technology_data","health_sciences","social_governance","creative_economy","green_economy","business_finance","sports_recreation"],
    courses: {
      technology_data:   "BSc Computer Science",
      health_sciences:   "BSc Nursing / BSc Nutrition",
      social_governance: "BA Education / BA Social Work",
      creative_economy:  "BA Fine Art / BA Music",
      green_economy:     "BSc Environmental Studies",
      business_finance:  "Bachelor of Commerce",
      sports_recreation: "BSc Physical Education & Sports Science",
    },
    annualCostKES: 85000, parallelCostKES: 150000,
    website: "https://www.ku.ac.ke",
    notes: "Strong for education, health, sports science and social sciences.",
    parallelNotes: "Parallel admission widely available. One of the most accessible parallel routes in Kenya. Apply through KU direct admissions portal.",
  },
  {
    name: "Moi University", location: "Eldoret", region: "rift_valley",
    type: "Public", level: "university",
    clusters: ["health_sciences","engineering_built","agricultural_tech","social_governance","business_finance","sports_recreation"],
    courses: {
      health_sciences:   "MBChB / BSc Nursing / BSc Pharmacy",
      engineering_built: "BSc Engineering",
      agricultural_tech: "BSc Agriculture",
      social_governance: "LLB / BA Education",
      business_finance:  "Bachelor of Commerce",
      sports_recreation: "BSc Physical Education / Sports Management",
    },
    annualCostKES: 90000, parallelCostKES: 155000,
    website: "https://www.mu.ac.ke",
    notes: "Major public university for Rift Valley. Well-regarded medical school.",
    parallelNotes: "Parallel admission available for most non-medical programmes. Good option for Rift Valley students who narrowly missed cut-off.",
  },
  {
    name: "Egerton University", location: "Njoro, Nakuru", region: "rift_valley",
    type: "Public", level: "university",
    clusters: ["agricultural_tech","green_economy","health_sciences","business_finance"],
    courses: {
      agricultural_tech: "BSc Agriculture / BSc Food Science & Technology",
      green_economy:     "BSc Environmental Science / BSc Natural Resources",
      health_sciences:   "BSc Nursing / BSc Nutrition",
      business_finance:  "BCom / Agribusiness",
    },
    annualCostKES: 85000, parallelCostKES: 145000,
    website: "https://www.egerton.ac.ke",
    notes: "Kenya's premier agricultural university.",
    parallelNotes: "Parallel admission available for Agriculture, Food Science and Environmental programmes. Affordable parallel fees compared to other public universities.",
  },
  {
    name: "Maseno University", location: "Kisumu", region: "western",
    type: "Public", level: "university",
    clusters: ["engineering_built","health_sciences","social_governance","green_economy"],
    courses: {
      engineering_built: "BSc Engineering",
      health_sciences:   "BSc Nursing / BSc Medical Laboratory",
      social_governance: "BA Education / BA Social Sciences",
      green_economy:     "BSc Environmental Science",
    },
    annualCostKES: 75000, parallelCostKES: 140000,
    website: "https://www.maseno.ac.ke",
    notes: "Best public university option for Western Kenya students.",
    parallelNotes: "Parallel admission available. One of Kenya's most affordable parallel options. Good for Western Kenya students who missed regular cut-off.",
  },
  {
    name: "Strathmore University", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["technology_data","business_finance","creative_economy"],
    courses: {
      technology_data:  "BSc Information Technology / BSc Computer Science",
      business_finance: "Bachelor of Commerce / BSc Actuarial Science",
      creative_economy: "BSc Informatics (UX Design Track)",
    },
    annualCostKES: 200000,
    website: "https://www.strathmore.edu",
    notes: "Top-ranked private university for tech and business. Strong industry links.",
  },
  {
    name: "USIU-Africa", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["technology_data","business_finance","creative_economy","social_governance","hospitality_tourism"],
    courses: {
      technology_data:     "BSc Information Technology",
      business_finance:    "Bachelor of Business Administration",
      creative_economy:    "BA Communication & Media",
      social_governance:   "BA International Relations",
      hospitality_tourism: "BA Hospitality Management",
    },
    annualCostKES: 250000,
    website: "https://www.usiu.ac.ke",
    notes: "American curriculum. Strong international exchange programmes.",
  },
  {
    name: "Aga Khan University (AKU)", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["health_sciences"],
    courses: { health_sciences: "BScN Nursing / Diploma in Nursing" },
    annualCostKES: 250000,
    website: "https://www.aku.edu/kenya",
    notes: "World-class nursing education. Scholarship opportunities available.",
  },
  {
    name: "Mount Kenya University", location: "Thika (campuses across Kenya)", region: "central",
    type: "Private", level: "university",
    clusters: ["health_sciences","business_finance","social_governance","hospitality_tourism"],
    courses: {
      health_sciences:     "BSc Nursing / Diploma in Clinical Medicine / BSc Pharmacy",
      business_finance:    "Bachelor of Commerce",
      social_governance:   "LLB / BA Education",
      hospitality_tourism: "Diploma in Hospitality Management",
    },
    annualCostKES: 120000, parallelCostKES: 120000,
    website: "https://www.mku.ac.ke",
    notes: "Multiple campuses across Kenya. Accessible for many counties.",
    parallelNotes: "MKU is privately run — open admission to all grades. Standard fee already covers all students regardless of KCSE grade.",
  },
  {
    name: "Pwani University", location: "Kilifi", region: "coast",
    type: "Public", level: "university",
    clusters: ["health_sciences","social_governance","green_economy","business_finance","hospitality_tourism"],
    courses: {
      health_sciences:     "BSc Nursing / BSc Public Health",
      social_governance:   "BA Education / BA Social Sciences",
      green_economy:       "BSc Marine Biology / BSc Environmental Science",
      business_finance:    "Bachelor of Commerce",
      hospitality_tourism: "BA Tourism Management",
    },
    annualCostKES: 75000, parallelCostKES: 135000,
    website: "https://www.pu.ac.ke",
    notes: "Best public university option for Coast region students.",
    parallelNotes: "Parallel admission available for most programmes. Lowest parallel fees among public universities. Ideal for Coast students.",
  },
  {
    name: "Kenya Institute of Mass Communication (KIMC)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["creative_economy"],
    courses: { creative_economy: "Diploma / Degree in Film / Journalism / Photography / Animation" },
    annualCostKES: 45000,
    website: "https://www.kimc.ac.ke",
    notes: "Kenya's top media and communication institution. Highly respected by broadcasters and media houses.",
  },
  {
    name: "Multimedia University of Kenya", location: "Nairobi (Mbagathi)", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["technology_data","creative_economy","engineering_built"],
    courses: {
      technology_data:   "BSc IT / BSc Computer Science / BSc Telecommunication",
      creative_economy:  "BA Film & Animation / BA Journalism",
      engineering_built: "BSc Electrical & Electronic Engineering",
    },
    annualCostKES: 80000, parallelCostKES: 150000,
    website: "https://www.mmu.ac.ke",
    notes: "Government-chartered. Strong tech and media focus. Very popular for creative and tech students.",
    parallelNotes: "Parallel admission available for most programmes. Good mid-range parallel option in Nairobi.",
  },
  {
    name: "Zetech University", location: "Nairobi (Ruiru & Town campuses)", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["technology_data","business_finance","creative_economy","hospitality_tourism"],
    courses: {
      technology_data:     "Diploma / BSc in IT / Computer Science",
      business_finance:    "Diploma / BCom in Business & Accounting",
      creative_economy:    "Diploma in Journalism / Media",
      hospitality_tourism: "Diploma in Hospitality Management",
    },
    annualCostKES: 60000,
    website: "https://www.zetech.ac.ke",
    notes: "One of Kenya's most popular affordable private universities. Flexible payment plans.",
  },
  {
    name: "KCA University", location: "Nairobi (Ruaraka)", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["technology_data","business_finance","social_governance"],
    courses: {
      technology_data:   "BSc IT / Diploma in IT",
      business_finance:  "BCom / Diploma in Business / CPA bridge programmes",
      social_governance: "BA in Law & Governance",
    },
    annualCostKES: 70000,
    website: "https://www.kca.ac.ke",
    notes: "Very popular for business and IT. Strong CPA pathway. Affordable instalment plans.",
  },
  {
    name: "Management University of Africa (MUA)", location: "Nairobi (Westlands)", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["business_finance","social_governance"],
    courses: {
      business_finance:  "BBA / Diploma in Business Management / Leadership",
      social_governance: "BA in Governance & Ethics",
    },
    annualCostKES: 65000,
    website: "https://www.mua.ac.ke",
    notes: "Popular for working students. Evening and weekend classes available.",
  },
  {
    name: "Pioneer International University", location: "Nairobi (Westlands)", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["business_finance","technology_data","social_governance"],
    courses: {
      business_finance:  "BBA / Diploma in Business",
      technology_data:   "BSc IT",
      social_governance: "BA International Relations",
    },
    annualCostKES: 75000,
    website: "https://www.piu.ac.ke",
    notes: "Affordable private university. Popular for international relations and business.",
  },

  // Education — university
  {
    name: "Kenyatta University — School of Education", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["education_teaching","social_governance"],
    courses: {
      education_teaching: "BEd Arts / BEd Science / BEd Early Childhood / BEd Special Needs",
      social_governance:  "BA Education / BA Social Work",
    },
    annualCostKES: 85000, parallelCostKES: 150000,
    website: "https://www.ku.ac.ke",
    notes: "Kenya's leading teacher education university. Covers primary, secondary, ECD, and special needs pathways.",
    parallelNotes: "Parallel BEd available. Good option for students who missed the regular cut-off but are committed to teaching.",
  },
  {
    name: "Moi University — School of Education", location: "Eldoret", region: "rift_valley",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd Arts / BEd Science / BEd Special Needs / BEd Early Childhood",
    },
    annualCostKES: 90000, parallelCostKES: 155000,
    website: "https://www.mu.ac.ke",
    notes: "Strong teacher education programme. Best option for Rift Valley students going into teaching.",
    parallelNotes: "Parallel BEd available. Best parallel teaching option for Rift Valley students.",
  },
  {
    name: "University of Nairobi — School of Education", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd / Postgraduate Diploma in Education (PGDE) / MEd",
    },
    annualCostKES: 100000, parallelCostKES: 180000,
    website: "https://www.uonbi.ac.ke",
    notes: "Flagship education programme. PGDE ideal for graduates switching into teaching.",
    parallelNotes: "Parallel BEd and PGDE available. Apply through UoN admissions directly.",
  },
  {
    name: "Maseno University — School of Education", location: "Kisumu", region: "western",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd Arts / BEd Science / BEd Special Needs",
    },
    annualCostKES: 75000, parallelCostKES: 140000,
    website: "https://www.maseno.ac.ke",
    notes: "Best university education option for Western Kenya students.",
    parallelNotes: "Parallel BEd available. Affordable parallel option for Western Kenya students.",
  },
  {
    name: "Kenya Institute of Curriculum Development (KICD)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "Short courses in Curriculum Development / Educational Assessment / CBE Training",
    },
    annualCostKES: 20000,
    website: "https://www.kicd.ac.ke",
    notes: "Government curriculum body. Professional development for teachers and curriculum specialists.",
  },
  {
    name: "Pwani University — School of Education", location: "Kilifi", region: "coast",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: { education_teaching: "BEd Arts / BEd Science" },
    annualCostKES: 75000, parallelCostKES: 135000,
    website: "https://www.pu.ac.ke",
    notes: "Best university teacher education option for Coast region students.",
    parallelNotes: "Parallel BEd available. Lowest parallel fees for teacher education among public universities.",
  },

  // Sports — university
  {
    name: "Moi University — Department of Sports Science", location: "Eldoret", region: "rift_valley",
    type: "Public", level: "university",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "BSc Physical Education & Sports Science / Sports Management" },
    annualCostKES: 90000, parallelCostKES: 155000,
    website: "https://www.mu.ac.ke",
    notes: "One of Kenya's strongest sports science programmes. Home of many elite athletes.",
    parallelNotes: "Parallel BSc Sports Science available. Good for athletes who narrowly missed cut-off.",
  },
  {
    name: "Kenyatta University — School of Education (Physical Education)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "BSc Physical Education & Sports / BA Physical Education (Teaching)" },
    annualCostKES: 85000, parallelCostKES: 150000,
    website: "https://www.ku.ac.ke",
    notes: "Leading PE and sports education programme. Pathway into coaching and teaching.",
    parallelNotes: "Parallel PE degree available through KU direct admissions.",
  },

  // Hospitality — university
  {
    name: "USIU-Africa — School of Tourism & Hospitality", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "BA Hospitality & Tourism Management" },
    annualCostKES: 250000,
    website: "https://www.usiu.ac.ke",
    notes: "Degree-level hospitality management with strong international networks.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TVETs, DIPLOMAS & CERTIFICATES
  // ══════════════════════════════════════════════════════════════════════════

  {
    name: "Kenya Medical Training College (KMTC)", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["health_sciences"],
    courses: {
      health_sciences: "Diploma in Clinical Medicine / Nursing / Medical Laboratory / Pharmacy / Nutrition",
    },
    annualCostKES: 40000,
    website: "https://www.kmtc.ac.ke",
    notes: "Kenya's largest health training institution. Present in all regions. Highly respected diploma.",
  },
  {
    name: "Kenya Institute of Highways & Building Technology (KIHBT)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","green_economy","automotive_trades"],
    courses: {
      engineering_built: "Diploma in Civil Engineering / Building Technology",
      green_economy:     "Certificate in Environmental Technology",
      automotive_trades: "Diploma / Certificate in Automotive Engineering / Motor Vehicle Mechanics",
    },
    annualCostKES: 35000,
    website: "https://www.kihbt.go.ke",
    notes: "Government institution. Affordable diploma in engineering, construction & automotive.",
  },
  {
    name: "NITA Institutes", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","technology_data","agricultural_tech","automotive_trades","beauty_wellness"],
    courses: {
      engineering_built: "Artisan / Craft Certificate in Engineering",
      technology_data:   "Certificate in IT / Computer Applications",
      agricultural_tech: "Certificate in Agriculture",
      automotive_trades: "Certificate in Automotive Engineering / Motor Vehicle Mechanics",
      beauty_wellness:   "Certificate in Hairdressing & Beauty Therapy / Cosmetology",
    },
    annualCostKES: 25000,
    website: "https://www.nita.go.ke",
    notes: "Most affordable entry point. Present in most counties. HELB support available. No KCSE grade minimum.",
  },
  {
    name: "Technical University of Kenya (TUK) — Diploma Programmes", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["technology_data","engineering_built","automotive_trades"],
    courses: {
      technology_data:   "Diploma in IT / Computer Applications",
      engineering_built: "Diploma in Engineering",
      automotive_trades: "Diploma in Automotive Engineering",
    },
    annualCostKES: 40000,
    website: "https://www.tukenya.ac.ke",
    notes: "Affordable diploma programmes. Pathway to degree available.",
  },
  {
    name: "Utalii College", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["business_finance","social_governance","hospitality_tourism"],
    courses: {
      business_finance:    "Diploma in Tourism Management / Hospitality",
      social_governance:   "Diploma in Tour Guiding",
      hospitality_tourism: "Diploma in Hotel Management / Food & Beverage / Tour Guiding / Event Management",
    },
    annualCostKES: 35000,
    website: "https://www.utalii.co.ke",
    notes: "Kenya's premier hospitality & tourism college. Government-owned. Graduates sought by 5-star hotels nationally.",
  },
  {
    name: "Cooperative University of Kenya — Certificate Programmes", location: "Karen, Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["business_finance","agricultural_tech"],
    courses: {
      business_finance:  "Certificate in Cooperative Management / Business",
      agricultural_tech: "Certificate in Agribusiness",
    },
    annualCostKES: 30000,
    website: "https://www.cuk.ac.ke",
    notes: "Ideal for students interested in cooperative societies and rural business.",
  },
  {
    name: "Kenya Film School", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["creative_economy"],
    courses: { creative_economy: "Certificate / Diploma in Film Production & Direction" },
    annualCostKES: 50000,
    website: "https://www.kenyafilmschool.ac.ke",
    notes: "Specialist film school. Hands-on training. No strict grade requirements.",
  },
  {
    name: "Rift Valley Technical Training Institute", location: "Nakuru", region: "rift_valley",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","agricultural_tech","technology_data","automotive_trades"],
    courses: {
      engineering_built: "Diploma / Certificate in Engineering",
      agricultural_tech: "Certificate in Agriculture / Food Technology",
      technology_data:   "Certificate in IT",
      automotive_trades: "Certificate in Motor Vehicle Mechanics",
    },
    annualCostKES: 28000,
    website: "https://www.rvtti.ac.ke",
    notes: "Best TVET option for Rift Valley students.",
  },
  {
    name: "Kisumu Polytechnic", location: "Kisumu", region: "western",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","business_finance","technology_data","automotive_trades"],
    courses: {
      engineering_built: "Diploma / Certificate in Engineering",
      business_finance:  "Diploma in Business Management",
      technology_data:   "Certificate in IT / Computer Studies",
      automotive_trades: "Certificate in Motor Vehicle Mechanics",
    },
    annualCostKES: 28000,
    website: "https://www.kisumupolytechnic.ac.ke",
    notes: "Major TVET institution for Western Kenya.",
  },
  {
    name: "Mombasa Technical Training Institute", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","business_finance","technology_data","automotive_trades"],
    courses: {
      engineering_built: "Diploma in Engineering / Marine Engineering",
      business_finance:  "Diploma in Business",
      technology_data:   "Certificate in IT",
      automotive_trades: "Certificate / Diploma in Automotive Engineering",
    },
    annualCostKES: 28000,
    website: "https://www.mtti.ac.ke",
    notes: "Best TVET option for Coast region students.",
  },
  {
    name: "Kenya Agricultural & Livestock Research Organization (KALRO) Training",
    location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["agricultural_tech","green_economy"],
    courses: {
      agricultural_tech: "Certificate in Crop Production / Animal Husbandry / Agribusiness",
      green_economy:     "Certificate in Environmental Conservation",
    },
    annualCostKES: 20000,
    website: "https://www.kalro.org",
    notes: "Highly practical. Field-based training. Ideal for rural students.",
  },
  {
    name: "Nairobi Technical Training Institute", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","technology_data","business_finance","automotive_trades"],
    courses: {
      engineering_built: "Diploma / Certificate in Engineering",
      technology_data:   "Diploma in IT / Computer Science",
      business_finance:  "Diploma in Business Management / Accounting",
      automotive_trades: "Certificate in Motor Vehicle Mechanics / Auto Electrical",
    },
    annualCostKES: 30000,
    website: "https://www.ntti.ac.ke",
    notes: "One of Nairobi's most accessible technical training colleges.",
  },

  // Sports — TVET
  {
    name: "Kenya Institute of Sports (KIS)", location: "Kasarani, Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "Diploma in Sports Management / Certificate in Coaching & Officiating" },
    annualCostKES: 30000,
    website: "https://www.kis.go.ke",
    notes: "Government sports institute. Official coaching and officiating certifications. No strict KCSE grade requirements.",
  },
  {
    name: "Kenya Sports Academy", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "Certificate in Personal Training / Fitness Instruction / Sports Coaching" },
    annualCostKES: 40000,
    website: "https://kenyasportsacademy.co.ke",
    notes: "Practical, hands-on sports and fitness certifications. Short courses available.",
  },

  // Hospitality — TVET
  {
    name: "Utalii College (Hospitality Focus)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "Diploma in Hotel Management / Food & Beverage / Tour Guiding / Event Planning" },
    annualCostKES: 35000,
    website: "https://www.utalii.co.ke",
    notes: "Kenya's most respected hospitality college. Graduates are sought by 5-star hotels nationally.",
  },
  {
    name: "Kenya Utalii College — Mombasa Campus", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "Diploma in Hospitality / Tourism / Food & Beverage" },
    annualCostKES: 35000,
    website: "https://www.utalii.co.ke",
    notes: "Best option for Coast region students entering hospitality. Direct link to Mombasa's hotel industry.",
  },
  {
    name: "Bandari Maritime Academy", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["hospitality_tourism","business_finance"],
    courses: {
      hospitality_tourism: "Diploma in Tourism & Cruise Management",
      business_finance:    "Diploma in Logistics & Port Management",
    },
    annualCostKES: 30000,
    website: "https://www.bandari.ac.ke",
    notes: "Specialised marine and tourism qualifications. Unique to Coast region.",
  },
  {
    name: "African Culinary Arts Academy", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "Diploma in Culinary Arts / Professional Cooking / Pastry Arts" },
    annualCostKES: 55000,
    website: "https://www.acaaKenya.com",
    notes: "Specialist culinary training. No strict KCSE requirements. Industry placements in top hotels.",
  },

  // Automotive — TVET
  {
    name: "NITA Automotive Centres", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Artisan Certificate in Motor Vehicle Mechanics / Auto Electrical / Spray Painting" },
    annualCostKES: 25000,
    website: "https://www.nita.go.ke",
    notes: "Nationally available. Most affordable entry into automotive trades. No KCSE grade minimum.",
  },
  {
    name: "Nairobi Technical Training Institute (Auto Dept.)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Certificate in Motor Vehicle Mechanics / Auto Electrical / Diesel Plant" },
    annualCostKES: 30000,
    website: "https://www.ntti.ac.ke",
    notes: "Practical workshop-based training. Good links to local garages and fleet companies.",
  },
  {
    name: "Mombasa Technical Training Institute (Auto Dept.)", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Diploma / Certificate in Automotive Engineering / Marine Diesel" },
    annualCostKES: 28000,
    website: "https://www.mtti.ac.ke",
    notes: "Strong automotive and marine engineering track. Best for Coast region students.",
  },
  {
    name: "Rift Valley Technical Training Institute (Auto Dept.)", location: "Nakuru", region: "rift_valley",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Certificate in Motor Vehicle Mechanics / Diesel Plant Mechanics" },
    annualCostKES: 28000,
    website: "https://www.rvtti.ac.ke",
    notes: "Best TVET automotive option for Rift Valley and Western Kenya students.",
  },

  // Beauty — TVET
  {
    name: "Kenya Beauty & Cosmetology Institute (KBCI)", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Diploma in Beauty Therapy / Hair Dressing / Nail Technology / Makeup Artistry" },
    annualCostKES: 45000,
    website: "https://www.kbci.co.ke",
    notes: "Kenya's leading specialist beauty institute. Industry-recognised diplomas. No strict KCSE requirements.",
  },
  {
    name: "NITA Beauty & Fashion Centres", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing & Beauty Therapy / Cosmetology" },
    annualCostKES: 20000,
    website: "https://www.nita.go.ke",
    notes: "Most affordable option. Available across Kenya. Government-recognised certificate.",
  },
  {
    name: "Evelyn College of Design", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness","creative_economy"],
    courses: {
      beauty_wellness:  "Diploma in Fashion Design / Cosmetology",
      creative_economy: "Diploma in Fashion & Textile Design",
    },
    annualCostKES: 55000,
    website: "https://www.evelyncollege.ac.ke",
    notes: "Well-known for fashion and beauty design. Creative entrepreneurship focus.",
  },
  {
    name: "Nairobi Institute of Technology (Beauty Dept.)", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing / Beauty Therapy / Spa Management" },
    annualCostKES: 35000,
    website: "https://www.nit.ac.ke",
    notes: "Practical training with salon attachments. Short courses also available.",
  },
  {
    name: "Steiner Academy Kenya", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Professional Hairdressing / Barbering / Spa Therapy / Nail Technology" },
    annualCostKES: 50000,
    website: "https://www.steinerafrica.com",
    notes: "Premium and well-recognised beauty brand. International Steiner certification. Strong placement in hotels and spas.",
  },
  {
    name: "Tony's Beauty College", location: "Nairobi (Westlands & CBD)", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing / Nail Tech / Makeup / Beauty Therapy" },
    annualCostKES: 30000,
    website: "https://www.tonysbeautycollege.co.ke",
    notes: "One of Nairobi's most popular and affordable beauty schools. Short courses from 3 months. No KCSE requirement.",
  },
  {
    name: "Kudos Beauty College", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Cosmetology / Hairdressing / Makeup Artistry" },
    annualCostKES: 25000,
    website: "https://www.kudosbeautycollege.co.ke",
    notes: "Affordable Nairobi beauty college. Short certificate courses from 3–6 months.",
  },
  {
    name: "Kisumu Polytechnic (Beauty Dept.)", location: "Kisumu", region: "western",
    type: "Public", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing & Beauty Therapy" },
    annualCostKES: 22000,
    website: "https://www.kisumupolytechnic.ac.ke",
    notes: "Best affordable beauty training option for Western Kenya students.",
  },
  {
    name: "Mombasa Polytechnic (Beauty Dept.)", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Beauty Therapy / Hairdressing" },
    annualCostKES: 22000,
    website: "https://www.mtti.ac.ke",
    notes: "Best affordable beauty training for Coast region students.",
  },

  // Education — TVET
  {
    name: "Kenya Primary Teachers Colleges (PTCs)", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["education_teaching"],
    courses: { education_teaching: "P1 Primary Teacher Certificate (2-year programme)" },
    annualCostKES: 30000,
    website: "https://www.tsc.go.ke",
    notes: "Government-run. Includes Kagumo TTC, Mosoriot TTC, Highridge TTC, Shanzu TTC and many others. Most affordable route into primary teaching. Present in all regions.",
  },
  {
    name: "Kenya Institute of Special Education (KISE)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["education_teaching"],
    courses: { education_teaching: "Diploma in Special Needs Education / Certificate in SNE" },
    annualCostKES: 25000,
    website: "https://www.kise.ac.ke",
    notes: "Kenya's only specialist special needs education institution. Growing field with strong government demand.",
  },

  // Professional / short courses
  {
    name: "Nairobi Aviation College", location: "Nairobi (multiple campuses)", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["business_finance","technology_data","hospitality_tourism","social_governance"],
    courses: {
      business_finance:    "Diploma in Airport Management / Logistics",
      technology_data:     "Diploma in Air Traffic Systems / ICT",
      hospitality_tourism: "Diploma in Cabin Crew / Customer Service",
      social_governance:   "Diploma in Security Management",
    },
    annualCostKES: 45000,
    website: "https://www.nairobiaviationcollege.ac.ke",
    notes: "Very well-known Nairobi institution. Multiple campuses. Popular for aviation, logistics and customer service courses.",
  },
  {
    name: "KASNEB — CPA / CIFA / CS Programmes", location: "Nairobi & all counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["business_finance"],
    courses: {
      business_finance: "CPA (Certified Public Accountant) / CIFA / CS (Certified Secretaries)",
    },
    annualCostKES: 15000,
    website: "https://www.kasneb.or.ke",
    notes: "Most affordable route into accounting and finance. CPA is Kenya's most recognised finance qualification. Exams-based — no full-time campus needed.",
  },
  {
    name: "Nairobi Institute of Business Studies (NIBS)", location: "Nairobi (CBD)", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["business_finance","technology_data","social_governance"],
    courses: {
      business_finance:  "Diploma in Business Management / Accounting / Purchasing & Supplies",
      technology_data:   "Certificate / Diploma in IT",
      social_governance: "Diploma in Public Administration",
    },
    annualCostKES: 25000,
    website: "https://www.nibs.ac.ke",
    notes: "Very affordable CBD institution. Popular for diploma-level business and IT. No strict KCSE grade minimum.",
  },
  {
    name: "Kenya School of Professional Studies (KSPS)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["business_finance","social_governance"],
    courses: {
      business_finance:  "Diploma in Purchasing & Supplies / Stores Management / Business Admin",
      social_governance: "Diploma in Public Administration / Records Management",
    },
    annualCostKES: 20000,
    website: "https://www.ksps.ac.ke",
    notes: "Government institution. Very affordable. Popular for public service and supply chain pathways.",
  },
  {
    name: "Moringa School", location: "Nairobi (Ngong Road)", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["technology_data","creative_economy"],
    courses: {
      technology_data:  "Software Engineering Bootcamp / Data Science / Python / Web Development",
      creative_economy: "UX Design Bootcamp",
    },
    annualCostKES: 80000,
    website: "https://www.moringaschool.com",
    notes: "Kenya's most well-known coding bootcamp. 6-month intensive programmes. Income Share Agreement (ISA) — pay after getting a job. No prior coding experience needed.",
  },
  {
    name: "AkiraChix — codeHive Programme", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["technology_data"],
    courses: { technology_data: "Software Development — 1-year programme (women only)" },
    annualCostKES: 0,
    website: "https://www.akirachix.com",
    notes: "Fully subsidised programme for women. One of Kenya's most impactful tech training programmes. No fees for qualifying students.",
  },
  {
    name: "ALX Africa", location: "Nairobi (remote-friendly)", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["technology_data"],
    courses: { technology_data: "Software Engineering / Cloud Computing / Data Science (remote, part-time)" },
    annualCostKES: 0,
    website: "https://www.alxafrica.com",
    notes: "Free or heavily subsidised tech training. Pan-African with strong Nairobi presence. Connects graduates to global remote jobs.",
  },

  // Community polytechnics — cheapest options in Nairobi
  {
    name: "Dandora Youth Polytechnic", location: "Nairobi (Dandora)", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades","engineering_built"],
    courses: {
      automotive_trades: "Certificate in Motor Vehicle Mechanics / Auto Electrical",
      engineering_built: "Certificate in Welding & Fabrication / Electrical Installation",
    },
    annualCostKES: 15000,
    website: "https://www.tveta.go.ke",
    notes: "One of Nairobi's most affordable youth polytechnics. Excellent for students in Eastlands. HELB bursaries available.",
  },
  {
    name: "Pumwani Youth Polytechnic", location: "Nairobi (Pumwani)", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades","engineering_built","beauty_wellness"],
    courses: {
      automotive_trades: "Certificate in Motor Vehicle Mechanics",
      engineering_built: "Certificate in Electrical Installation / Plumbing",
      beauty_wellness:   "Certificate in Hairdressing & Beauty",
    },
    annualCostKES: 12000,
    website: "https://www.tveta.go.ke",
    notes: "Cheapest training option in Nairobi. County-run. Ideal for students in low-income areas. HELB bursaries available.",
  },
  {
    name: "Mathare Youth Polytechnic", location: "Nairobi (Mathare)", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades","engineering_built","beauty_wellness"],
    courses: {
      automotive_trades: "Certificate in Motor Vehicle Mechanics / Motorcycle Repair",
      engineering_built: "Certificate in Electrical Installation / Masonry",
      beauty_wellness:   "Certificate in Hairdressing",
    },
    annualCostKES: 12000,
    website: "https://www.tveta.go.ke",
    notes: "Very affordable county polytechnic. Open to school leavers of all grades.",
  },
];

// ─── Format school for output ─────────────────────────────────────────────────

const formatSchool = (school, clusterId, includeParallel = false) => ({
  name:            school.name,
  location:        school.location,
  type:            school.type,
  level:           school.level,
  levelLabel:      school.level === "tvet" ? "Diploma / Certificate / TVET" : "University / College",
  course:          school.courses[clusterId] || "Various programmes available",
  annualCostRange: `~KES ${school.annualCostKES.toLocaleString()}/yr`,
  website:         school.website,
  notes:           school.notes,
  ...(includeParallel && school.parallelCostKES ? {
    parallelAdmission: {
      available:  true,
      annualCost: `KES ${school.parallelCostKES.toLocaleString()}/yr`,
      notes:      school.parallelNotes || "Parallel/self-sponsored admission available. Contact admissions directly.",
    },
  } : {}),
});

// ─── Main function: Get schools for student ───────────────────────────────────
/**
 * LOW KCSE (20_30 / 10_20 / below_10):
 *   TVETs first (up to 3, cheapest first)
 *   → Parallel universities (up to 2, with exact parallel fees shown)
 *
 * SKIPPED KCSE (not sat yet):
 *   Best universities by budget (up to 2) + TVETs (up to 2)
 *
 * HIGH KCSE (30+ points / university qualified):
 *   Public universities first (up to 2), then private (up to 2)
 */
const getSchoolsForStudent = (clusterId, county, budgetTier, q11Answer = null) => {
  const region    = COUNTY_REGIONS[county] || "nairobi_metro";
  const budget    = BUDGET_TIERS[budgetTier];
  const qualLevel = getQualificationLevel(q11Answer);

  if (!budget) return [];

  const baseFilter = (school) =>
    school.clusters.includes(clusterId) &&
    (school.region === region ||
     school.region === "nairobi_metro" ||
     school.region === "national");

  // ── LOW KCSE: TVETs first → parallel universities ─────────────────────────
  const isLowKcse = ["20_30", "10_20", "below_10"].includes(q11Answer);
  if (isLowKcse) {
    const tvets = SCHOOLS
      .filter((s) => baseFilter(s) && s.level === "tvet")
      .sort((a, b) => a.annualCostKES - b.annualCostKES)
      .slice(0, 3)
      .map((s) => formatSchool(s, clusterId, false));

    const parallel = SCHOOLS
      .filter((s) =>
        baseFilter(s) &&
        s.level === "university" &&
        s.parallelCostKES &&
        (s.parallelCostKES <= budget.max || budgetTier === "scholarships")
      )
      .sort((a, b) => a.parallelCostKES - b.parallelCostKES)
      .slice(0, 2)
      .map((s) => formatSchool(s, clusterId, true));

    return [...tvets, ...parallel];
  }

  // ── SKIPPED KCSE: best universities by budget + TVETs ────────────────────
  if (qualLevel === "all") {
    const universities = SCHOOLS
      .filter((s) =>
        baseFilter(s) && s.level === "university" &&
        (s.annualCostKES <= budget.max || budgetTier === "scholarships")
      )
      .sort((a, b) => a.annualCostKES - b.annualCostKES)
      .slice(0, 2)
      .map((s) => formatSchool(s, clusterId, false));

    const tvets = SCHOOLS
      .filter((s) =>
        baseFilter(s) && s.level === "tvet" &&
        (s.annualCostKES <= budget.max || budgetTier === "scholarships")
      )
      .sort((a, b) => a.annualCostKES - b.annualCostKES)
      .slice(0, 2)
      .map((s) => formatSchool(s, clusterId, false));

    return [...universities, ...tvets];
  }

  // ── HIGH KCSE: public first, then private ─────────────────────────────────
  if (qualLevel === "university") {
    const eligible = SCHOOLS.filter((s) =>
      baseFilter(s) && s.level === "university" &&
      (s.annualCostKES <= budget.max || budgetTier === "scholarships")
    ).sort((a, b) => a.annualCostKES - b.annualCostKES);

    const pub  = eligible.filter((s) => s.type === "Public").slice(0, 2);
    const priv = eligible.filter((s) => s.type === "Private").slice(0, 2);
    return [...pub, ...priv].map((s) => formatSchool(s, clusterId, false));
  }

  // ── TVET qualified ────────────────────────────────────────────────────────
  return SCHOOLS
    .filter((s) =>
      baseFilter(s) && s.level === "tvet" &&
      (s.annualCostKES <= budget.max || budgetTier === "scholarships")
    )
    .sort((a, b) => a.annualCostKES - b.annualCostKES)
    .slice(0, 4)
    .map((s) => formatSchool(s, clusterId, false));
};

// ─── Scholarships ─────────────────────────────────────────────────────────────

const SCHOLARSHIPS = {
  universal: [
    {
      name: "HELB — Higher Education Loans Board", type: "Loan + Bursary",
      coverage: "Tuition + upkeep stipend. Loans KES 40,000–60,000/yr. Bursaries for needy students.",
      eligibility: "Kenyan citizen joining university or TVET. Apply after getting admission letter.",
      applyUrl: "https://www.helb.co.ke", deadline: "Rolling — apply as soon as you get admission",
    },
    {
      name: "Equity Bank Wings to Fly", type: "Full Scholarship",
      coverage: "Full secondary school scholarship. University bursaries for former beneficiaries.",
      eligibility: "Bright students from low-income families.",
      applyUrl: "https://www.equitygroupfoundation.com/wings-to-fly", deadline: "January–March annually",
    },
    {
      name: "Mastercard Foundation Scholars Program", type: "Full Scholarship",
      coverage: "Full tuition, accommodation, meals, laptop and stipend. Kenya and international universities.",
      eligibility: "Young Africans with strong academic potential and financial need.",
      applyUrl: "https://mastercardfdn.org/all/scholars", deadline: "Varies by partner university",
    },
    {
      name: "Kenya Government Bursary Fund (NG-CDF)", type: "Bursary",
      coverage: "KES 5,000–30,000/yr. Varies by constituency.",
      eligibility: "Students in financial need. Apply through your local MP's NG-CDF office.",
      applyUrl: "https://www.ngcdf.go.ke", deadline: "Each constituency sets own deadline — check locally",
    },
    {
      name: "Commonwealth Scholarships", type: "Full Scholarship",
      coverage: "Full postgraduate scholarships to UK universities. Living allowance included.",
      eligibility: "Kenyan citizens. Postgraduate level. Strong undergraduate degree required.",
      applyUrl: "https://cscuk.fcdo.gov.uk/apply", deadline: "November–December annually",
    },
  ],
  technology_data: [
    {
      name: "Google Generation Scholarship — Africa", type: "Partial Scholarship + Mentorship",
      coverage: "USD 1,000 + Google mentorship + developer community access.",
      eligibility: "Computer Science / IT students. Strong academic record.",
      applyUrl: "https://buildyourfuture.withgoogle.com/scholarships", deadline: "October–December annually",
    },
    {
      name: "ALX Africa — Free Software Engineering", type: "Full Training Scholarship",
      coverage: "12-month software engineering programme fully funded. Remote.",
      eligibility: "18+ years. No prior coding experience needed.",
      applyUrl: "https://www.alxafrica.com/software-engineering", deadline: "Rolling intake",
    },
    {
      name: "AkiraChix codeHive (Women in Tech)", type: "Full Scholarship",
      coverage: "1-year coding programme fully subsidised for women.",
      eligibility: "Women 18–25. Nairobi-based. No prior coding needed.",
      applyUrl: "https://akirachix.com/programs", deadline: "February–March annually",
    },
  ],
  health_sciences: [
    {
      name: "Aga Khan Foundation International Scholarship", type: "50% Grant + 50% Loan",
      coverage: "Partial scholarship for postgraduate health studies internationally.",
      eligibility: "Kenyan students pursuing postgraduate studies abroad. Financial need + merit.",
      applyUrl: "https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme",
      deadline: "March annually",
    },
    {
      name: "Amref Health Africa Scholarships", type: "Partial Scholarship",
      coverage: "Supports health students from underserved communities in East Africa.",
      eligibility: "Kenyan health science students. Financial need prioritised.",
      applyUrl: "https://amref.org/scholarships", deadline: "June–August annually",
    },
  ],
  engineering_built: [
    {
      name: "DAAD Scholarships (Germany)", type: "Full Scholarship",
      coverage: "Full masters/PhD funding in Germany. Engineering and STEM focus.",
      eligibility: "Kenyan graduates. Strong undergraduate degree. German or English programmes.",
      applyUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships",
      deadline: "October–November annually",
    },
    {
      name: "Engineers Without Borders — Scholarship Fund", type: "Partial Scholarship",
      coverage: "Project-based learning funding for engineering students.",
      eligibility: "Engineering students with community development focus.",
      applyUrl: "https://www.ewb-uk.org", deadline: "Rolling",
    },
  ],
  green_economy: [
    {
      name: "WWF — Russell E. Train Fellowship", type: "Full Scholarship",
      coverage: "Full postgraduate scholarship for conservation and environmental studies.",
      eligibility: "Kenyan students. Masters level. Conservation / environmental science focus.",
      applyUrl: "https://www.worldwildlife.org/projects/russell-e-train-fellowships",
      deadline: "December–February annually",
    },
    {
      name: "Africa Climate Foundation Fellowships", type: "Fellowship + Stipend",
      coverage: "Research stipend and mentorship for climate-focused students.",
      eligibility: "Students and young professionals in environment/climate fields.",
      applyUrl: "https://africaclimatefoundation.org", deadline: "Varies — check website",
    },
  ],
  creative_economy: [
    {
      name: "Goethe Institut — Arts Scholarships East Africa", type: "Partial Scholarship + Residency",
      coverage: "Arts residencies, training grants and project funding for creatives.",
      eligibility: "Kenyan artists, filmmakers, designers. Portfolio required.",
      applyUrl: "https://www.goethe.de/en/kul/del/stip.html", deadline: "Varies by programme",
    },
    {
      name: "Sundance Institute — East Africa Fellowship", type: "Fellowship",
      coverage: "Film development support, mentorship and festival access.",
      eligibility: "Emerging African filmmakers with a project in development.",
      applyUrl: "https://www.sundance.org/programs/artist-programs", deadline: "Rolling",
    },
  ],
  business_finance: [
    {
      name: "KASNEB — CPA Fee Waiver Programme", type: "Partial Fee Waiver",
      coverage: "Reduced exam fees for needy students sitting CPA / CIFA / CS.",
      eligibility: "Kenyan students registered with KASNEB. Financial need.",
      applyUrl: "https://www.kasneb.or.ke", deadline: "Each exam sitting",
    },
    {
      name: "African Development Bank — Coding for Employment", type: "Full Training Grant",
      coverage: "Business and digital skills training fully funded.",
      eligibility: "Young Kenyans 18–35. Focus on entrepreneurship and finance.",
      applyUrl: "https://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/coding-for-employment",
      deadline: "Rolling",
    },
  ],
  social_governance: [
    {
      name: "Ford Foundation International Fellowships", type: "Full Scholarship",
      coverage: "Full postgraduate funding internationally. Social justice focus.",
      eligibility: "Kenyans from marginalised communities. Masters/PhD level.",
      applyUrl: "https://www.fordfoundation.org/work/investing-in-individuals/international-fellowships-program",
      deadline: "September–November annually",
    },
    {
      name: "Hubert H. Humphrey Fellowship (USA)", type: "Full Fellowship",
      coverage: "10-month programme at a US university. Leadership and public policy.",
      eligibility: "Mid-career Kenyan professionals in law, governance, education.",
      applyUrl: "https://www.humphreyfellowship.org", deadline: "August annually",
    },
  ],
  agricultural_tech: [
    {
      name: "FAO / IFAD Young Agripreneurs Fund", type: "Grant + Training",
      coverage: "Business development grants and agri-training for young farmers.",
      eligibility: "Kenyan youth 18–35 in agriculture or agribusiness.",
      applyUrl: "https://www.ifad.org/en/youth", deadline: "Rolling",
    },
    {
      name: "Bayer Foundation — Food & Nutrition Scholarship", type: "Partial Scholarship",
      coverage: "Supports students in food science, agriculture, and nutrition.",
      eligibility: "Undergraduate students in agriculture / food technology.",
      applyUrl: "https://www.bayer-foundation.com", deadline: "March–May annually",
    },
  ],
  sports_recreation: [
    {
      name: "Sports Kenya — National Sports Fund Bursaries", type: "Bursary",
      coverage: "Fee support for talented athletes pursuing sports education.",
      eligibility: "Student-athletes with national or county-level competitive record.",
      applyUrl: "https://www.sports.go.ke", deadline: "Check with Sports Kenya annually",
    },
    {
      name: "NCAA International Student-Athlete Scholarships (USA)", type: "Athletic Scholarship",
      coverage: "Full or partial scholarship to US universities for elite athletes.",
      eligibility: "Kenyan athletes with strong competitive record. English proficiency required.",
      applyUrl: "https://www.ncaa.org/sports/2014/10/6/recruiting-internationally.aspx",
      deadline: "18 months before intended enrolment",
    },
  ],
  hospitality_tourism: [
    {
      name: "Kenya Tourism Board — Hospitality Training Grants", type: "Training Grant",
      coverage: "Subsidised training at Utalii College and other tourism institutions.",
      eligibility: "Kenyan youth entering hospitality. Financial need prioritised.",
      applyUrl: "https://www.tourism.go.ke", deadline: "Check KTB website annually",
    },
    {
      name: "UNWTO — Themis Scholarships", type: "Partial Scholarship",
      coverage: "Tourism management training at international institutions.",
      eligibility: "Tourism students and professionals from developing countries.",
      applyUrl: "https://www.unwto.org/themis-foundation", deadline: "Rolling",
    },
  ],
  automotive_trades: [
    {
      name: "TVETA — Technical Skills Development Fund", type: "Bursary",
      coverage: "Fee subsidies for TVET students in technical trades including automotive.",
      eligibility: "Kenyan students enrolled at a registered TVET institution.",
      applyUrl: "https://www.tveta.go.ke", deadline: "Each semester — apply through your institution",
    },
    {
      name: "GIZ Kenya — TVET Skills Programme", type: "Training Grant",
      coverage: "Fully funded technical skills training in automotive and related trades.",
      eligibility: "Young Kenyans 18–30 in technical training.",
      applyUrl: "https://www.giz.de/en/worldwide/kenya.html",
      deadline: "Rolling — check GIZ Kenya office",
    },
  ],
  beauty_wellness: [
    {
      name: "TVETA — Beauty & Cosmetology Bursary", type: "Bursary",
      coverage: "Fee subsidies for registered beauty and cosmetology TVET students.",
      eligibility: "Kenyan students at a TVETA-registered beauty institution.",
      applyUrl: "https://www.tveta.go.ke", deadline: "Each semester",
    },
    {
      name: "L'Oréal — Hairdressing Scholarship Programme", type: "Partial Scholarship + Product Support",
      coverage: "Training support and professional product kits for hairdressing students.",
      eligibility: "Students enrolled in a recognised hairdressing programme.",
      applyUrl: "https://www.loreal.com/en/commitments-and-responsibilities/for-society/education",
      deadline: "Check L'Oréal East Africa office",
    },
  ],
  education_teaching: [
    {
      name: "Teachers Service Commission (TSC) — P1 Sponsorship", type: "Government Sponsorship",
      coverage: "Subsidised P1 teacher training at government PTCs. Guaranteed employment pipeline.",
      eligibility: "Kenyan students with KCSE C- and above. Government-sponsored slots limited.",
      applyUrl: "https://www.tsc.go.ke", deadline: "After KCSE results — check TSC annually",
    },
    {
      name: "UNESCO — Education Sector Fellowships", type: "Fellowship",
      coverage: "Postgraduate study and research in education policy internationally.",
      eligibility: "Education professionals and graduate students. English or French required.",
      applyUrl: "https://www.unesco.org/en/fellowships", deadline: "March–May annually",
    },
  ],
};

const getScholarshipsForCluster = (clusterId) => ({
  universal:       SCHOLARSHIPS.universal,
  clusterSpecific: SCHOLARSHIPS[clusterId] || [],
});

// ─── Accessibility & Budget helpers ──────────────────────────────────────────

const getGeographicAccessibilityScore = (county) => {
  const region = COUNTY_REGIONS[county];
  return REGION_ACCESSIBILITY[region] || 55;
};

const getBudgetScore = (budgetTier) => {
  return BUDGET_TIERS[budgetTier]?.score || 50;
};

module.exports = {
  SCHOOLS, COUNTY_REGIONS, BUDGET_TIERS, SCHOLARSHIPS,
  getSchoolsForStudent,
  getScholarshipsForCluster,
  getGeographicAccessibilityScore,
  getBudgetScore,
  getQualificationLevel,
};
