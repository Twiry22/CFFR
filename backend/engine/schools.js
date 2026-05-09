/**
 * CFFR Kenya Schools & Universities Database  v3.0
 * ─────────────────────────────────────────────────────────────────────────────
 * v2.0 — Added `level` field (university | tvet | both) and qualification filter.
 * v3.0 — Added schools for 4 new clusters:
 *         sports_recreation, hospitality_tourism, automotive_trades, beauty_wellness
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

  // ════════════════════════════════════════════════════════════════════════════
  // EXISTING UNIVERSITIES & COLLEGES
  // ════════════════════════════════════════════════════════════════════════════

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
    annualCostKES: 100000, website: "https://www.uonbi.ac.ke",
    notes: "Kenya's flagship public university. HELB sponsorship available.",
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
    annualCostKES: 90000, website: "https://www.jkuat.ac.ke",
    notes: "Top STEM university in Kenya. Strong industry connections.",
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
    annualCostKES: 85000, website: "https://www.ku.ac.ke",
    notes: "Strong for education, health, sports science and social sciences.",
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
    annualCostKES: 90000, website: "https://www.mu.ac.ke",
    notes: "Major public university for Rift Valley. Well-regarded medical school.",
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
    annualCostKES: 85000, website: "https://www.egerton.ac.ke",
    notes: "Kenya's premier agricultural university.",
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
    annualCostKES: 75000, website: "https://www.maseno.ac.ke",
    notes: "Best public university option for Western Kenya students.",
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
    annualCostKES: 200000, website: "https://www.strathmore.edu",
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
    annualCostKES: 250000, website: "https://www.usiu.ac.ke",
    notes: "American curriculum. Strong international exchange programmes.",
  },
  {
    name: "Aga Khan University (AKU)", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["health_sciences"],
    courses: { health_sciences: "BScN Nursing / Diploma in Nursing" },
    annualCostKES: 250000, website: "https://www.aku.edu/kenya",
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
    annualCostKES: 120000, website: "https://www.mku.ac.ke",
    notes: "Multiple campuses across Kenya. Accessible for many counties.",
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
    annualCostKES: 75000, website: "https://www.pu.ac.ke",
    notes: "Best public university option for Coast region students.",
  },
  {
    name: "Kenya Institute of Mass Communication (KIMC)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["creative_economy"],
    courses: { creative_economy: "Diploma in Film / Journalism / Photography / Animation" },
    annualCostKES: 45000, website: "https://www.kimc.ac.ke",
    notes: "Kenya's top media and communication institution.",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // EXISTING TVETs & DIPLOMAS
  // ════════════════════════════════════════════════════════════════════════════

  {
    name: "Kenya Institute of Highways & Building Technology (KIHBT)",
    location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["engineering_built", "green_economy"],
    courses: {
      engineering_built: "Diploma in Civil Engineering / Building Technology",
      green_economy:     "Certificate in Environmental Technology",
    },
    annualCostKES: 35000, website: "https://www.kihbt.go.ke",
    notes: "Government institution. Affordable diploma in engineering & construction.",
  },
  {
    name: "NITA Institutes", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","technology_data","agricultural_tech","creative_economy","automotive_trades"],
    courses: {
      engineering_built: "Artisan / Craft Certificate in Engineering",
      technology_data:   "Certificate in IT / Computer Applications",
      agricultural_tech: "Certificate in Agriculture",
      creative_economy:  "Certificate in Graphic Design / Fashion",
      automotive_trades: "Certificate in Automotive Engineering / Motor Vehicle Mechanics",
    },
    annualCostKES: 25000, website: "https://www.nita.go.ke",
    notes: "Most affordable entry point. Present in most counties. HELB support available.",
  },
  {
    name: "Kenya Medical Training College (KMTC)", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["health_sciences"],
    courses: {
      health_sciences: "Diploma in Clinical Medicine / Nursing / Medical Laboratory / Pharmacy / Nutrition",
    },
    annualCostKES: 40000, website: "https://www.kmtc.ac.ke",
    notes: "Kenya's largest health training institution. Present in all regions. Highly respected diploma.",
  },
  {
    name: "Technical University of Kenya (TUK) — Diploma Programmes",
    location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["technology_data","engineering_built","creative_economy","automotive_trades"],
    courses: {
      technology_data:   "Diploma in IT / Computer Applications",
      engineering_built: "Diploma in Engineering",
      creative_economy:  "Diploma in Applied Design",
      automotive_trades: "Diploma in Automotive Engineering",
    },
    annualCostKES: 40000, website: "https://www.tukenya.ac.ke",
    notes: "Affordable diploma programmes. Pathway to degree available.",
  },
  {
    name: "Utalii College", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["business_finance","creative_economy","social_governance","hospitality_tourism"],
    courses: {
      business_finance:    "Diploma in Tourism Management / Hospitality",
      creative_economy:    "Certificate in Food & Beverage / Events",
      social_governance:   "Diploma in Tour Guiding",
      hospitality_tourism: "Diploma in Hotel Management / Food & Beverage / Tour Guiding / Event Management",
    },
    annualCostKES: 35000, website: "https://www.utalii.co.ke",
    notes: "Kenya's premier hospitality & tourism college. Government-owned. Highly respected in the industry.",
  },
  {
    name: "Cooperative University of Kenya — Certificate Programmes",
    location: "Karen, Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["business_finance","agricultural_tech"],
    courses: {
      business_finance:  "Certificate in Cooperative Management / Business",
      agricultural_tech: "Certificate in Agribusiness",
    },
    annualCostKES: 30000, website: "https://www.cuk.ac.ke",
    notes: "Ideal for students interested in cooperative societies and rural business.",
  },
  {
    name: "Kenya Film School", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["creative_economy"],
    courses: { creative_economy: "Certificate / Diploma in Film Production & Direction" },
    annualCostKES: 50000, website: "https://www.kenyafilmschool.ac.ke",
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
    annualCostKES: 28000, website: "https://www.rvtti.ac.ke",
    notes: "Best TVET option for Rift Valley students.",
  },
  {
    name: "Kisumu Polytechnic", location: "Kisumu", region: "western",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","business_finance","technology_data","creative_economy","automotive_trades"],
    courses: {
      engineering_built: "Diploma / Certificate in Engineering",
      business_finance:  "Diploma in Business Management",
      technology_data:   "Certificate in IT / Computer Studies",
      creative_economy:  "Certificate in Fashion & Design",
      automotive_trades: "Certificate in Motor Vehicle Mechanics",
    },
    annualCostKES: 28000, website: "https://www.kisumupolytechnic.ac.ke",
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
    annualCostKES: 28000, website: "https://www.mtti.ac.ke",
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
    annualCostKES: 20000, website: "https://www.kalro.org",
    notes: "Highly practical. Field-based training. Ideal for rural students.",
  },
  {
    name: "Nairobi Technical Training Institute", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["engineering_built","technology_data","business_finance","creative_economy","automotive_trades"],
    courses: {
      engineering_built: "Diploma / Certificate in Engineering",
      technology_data:   "Diploma in IT / Computer Science",
      business_finance:  "Diploma in Business Management / Accounting",
      creative_economy:  "Certificate in Graphic Design",
      automotive_trades: "Certificate in Motor Vehicle Mechanics / Auto Electrical",
    },
    annualCostKES: 30000, website: "https://www.ntti.ac.ke",
    notes: "One of Nairobi's most accessible technical training colleges.",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // NEW: SPORTS & RECREATION
  // ════════════════════════════════════════════════════════════════════════════

  {
    name: "Moi University — Department of Sports Science", location: "Eldoret", region: "rift_valley",
    type: "Public", level: "university",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "BSc Physical Education & Sports Science / Sports Management" },
    annualCostKES: 90000, website: "https://www.mu.ac.ke",
    notes: "One of Kenya's strongest sports science programmes. Home of many elite athletes.",
  },
  {
    name: "Kenyatta University — School of Education (Physical Education)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "BSc Physical Education & Sports / BA Physical Education (Teaching)" },
    annualCostKES: 85000, website: "https://www.ku.ac.ke",
    notes: "Leading PE and sports education programme. Pathway into coaching and teaching.",
  },
  {
    name: "Kenya Institute of Sports (KIS)", location: "Kasarani, Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "Diploma in Sports Management / Certificate in Coaching & Officiating" },
    annualCostKES: 30000, website: "https://www.kis.go.ke",
    notes: "Government sports institute. Official coaching and officiating certifications. No strict KCSE grade requirements.",
  },
  {
    name: "Kenya Sports Academy", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["sports_recreation"],
    courses: { sports_recreation: "Certificate in Personal Training / Fitness Instruction / Sports Coaching" },
    annualCostKES: 40000, website: "https://kenyasportsacademy.co.ke",
    notes: "Practical, hands-on sports and fitness certifications. Short courses available.",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // NEW: HOSPITALITY, TOURISM & EVENTS
  // ════════════════════════════════════════════════════════════════════════════

  {
    name: "Utalii College (Hospitality Focus)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "Diploma in Hotel Management / Food & Beverage / Tour Guiding / Event Planning" },
    annualCostKES: 35000, website: "https://www.utalii.co.ke",
    notes: "Kenya's most respected hospitality college. Graduates are sought by 5-star hotels nationally.",
  },
  {
    name: "Kenya Utalii College — Mombasa Campus", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "Diploma in Hospitality / Tourism / Food & Beverage" },
    annualCostKES: 35000, website: "https://www.utalii.co.ke",
    notes: "Best option for Coast region students entering hospitality. Direct link to Mombasa's hotel industry.",
  },
  {
    name: "USIU-Africa — School of Tourism & Hospitality", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "university",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "BA Hospitality & Tourism Management" },
    annualCostKES: 250000, website: "https://www.usiu.ac.ke",
    notes: "Degree-level hospitality management with strong international networks.",
  },
  {
    name: "Bandari Maritime Academy", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["hospitality_tourism", "business_finance"],
    courses: {
      hospitality_tourism: "Diploma in Tourism & Cruise Management",
      business_finance:    "Diploma in Logistics & Port Management",
    },
    annualCostKES: 30000, website: "https://www.bandari.ac.ke",
    notes: "Specialised marine and tourism qualifications. Unique to Coast region.",
  },
  {
    name: "African Culinary Arts Academy", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["hospitality_tourism"],
    courses: { hospitality_tourism: "Diploma in Culinary Arts / Professional Cooking / Pastry Arts" },
    annualCostKES: 55000, website: "https://www.acaaKenya.com",
    notes: "Specialist culinary training. No strict KCSE requirements. Industry placements in top hotels.",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // NEW: AUTOMOTIVE TRADES & MECHANICS
  // ════════════════════════════════════════════════════════════════════════════

  {
    name: "Kenya Institute of Highways & Building Technology (Automotive Dept.)",
    location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Diploma / Certificate in Automotive Engineering / Motor Vehicle Mechanics" },
    annualCostKES: 35000, website: "https://www.kihbt.go.ke",
    notes: "Government-accredited automotive training. Affordable and well-recognised by employers.",
  },
  {
    name: "Nairobi Technical Training Institute (Auto Dept.)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Certificate in Motor Vehicle Mechanics / Auto Electrical / Diesel Plant" },
    annualCostKES: 30000, website: "https://www.ntti.ac.ke",
    notes: "Practical workshop-based training. Good links to local garages and fleet companies.",
  },
  {
    name: "NITA Automotive Centres", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Artisan Certificate in Motor Vehicle Mechanics / Auto Electrical / Spray Painting" },
    annualCostKES: 25000, website: "https://www.nita.go.ke",
    notes: "Nationally available. Most affordable entry into automotive trades. No KCSE grade minimum.",
  },
  {
    name: "Mombasa Technical Training Institute (Auto Dept.)", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Diploma / Certificate in Automotive Engineering / Marine Diesel" },
    annualCostKES: 28000, website: "https://www.mtti.ac.ke",
    notes: "Strong automotive and marine engineering track. Best for Coast region students.",
  },
  {
    name: "Rift Valley Technical Training Institute (Auto Dept.)", location: "Nakuru", region: "rift_valley",
    type: "Public", level: "tvet",
    clusters: ["automotive_trades"],
    courses: { automotive_trades: "Certificate in Motor Vehicle Mechanics / Diesel Plant Mechanics" },
    annualCostKES: 28000, website: "https://www.rvtti.ac.ke",
    notes: "Best TVET automotive option for Rift Valley and Western Kenya students.",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // NEW: BEAUTY, HAIR & WELLNESS
  // ════════════════════════════════════════════════════════════════════════════

  {
    name: "Kenya Beauty & Cosmetology Institute (KBCI)", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Diploma in Beauty Therapy / Hair Dressing / Nail Technology / Makeup Artistry" },
    annualCostKES: 45000, website: "https://www.kbci.co.ke",
    notes: "Kenya's leading specialist beauty institute. Industry-recognised diplomas. No strict KCSE requirements.",
  },
  {
    name: "NITA Beauty & Fashion Centres", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing & Beauty Therapy / Cosmetology" },
    annualCostKES: 20000, website: "https://www.nita.go.ke",
    notes: "Most affordable option. Available across Kenya. Government-recognised certificate.",
  },
  {
    name: "Evelyn College of Design", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness", "creative_economy"],
    courses: {
      beauty_wellness: "Diploma in Fashion Design / Cosmetology",
      creative_economy: "Diploma in Fashion & Textile Design",
    },
    annualCostKES: 55000, website: "https://www.evelyncollege.ac.ke",
    notes: "Well-known for fashion and beauty design. Creative entrepreneurship focus.",
  },
  {
    name: "Nairobi Institute of Technology (Beauty Dept.)", location: "Nairobi", region: "nairobi_metro",
    type: "Private", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing / Beauty Therapy / Spa Management" },
    annualCostKES: 35000, website: "https://www.nit.ac.ke",
    notes: "Practical training with salon attachments. Short courses also available.",
  },
  {
    name: "Kisumu Polytechnic (Beauty Dept.)", location: "Kisumu", region: "western",
    type: "Public", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Hairdressing & Beauty Therapy" },
    annualCostKES: 22000, website: "https://www.kisumupolytechnic.ac.ke",
    notes: "Best affordable beauty training option for Western Kenya students.",
  },
  {
    name: "Mombasa Polytechnic (Beauty Dept.)", location: "Mombasa", region: "coast",
    type: "Public", level: "tvet",
    clusters: ["beauty_wellness"],
    courses: { beauty_wellness: "Certificate in Beauty Therapy / Hairdressing" },
    annualCostKES: 22000, website: "https://www.mtti.ac.ke",
    notes: "Best affordable beauty training for Coast region students.",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // NEW: EDUCATION & TEACHING
  // ════════════════════════════════════════════════════════════════════════════

  {
    name: "Kenyatta University — School of Education", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["education_teaching", "social_governance"],
    courses: {
      education_teaching: "BEd Arts / BEd Science / BEd Early Childhood / BEd Special Needs",
      social_governance:  "BA Education / BA Social Work",
    },
    annualCostKES: 85000, website: "https://www.ku.ac.ke",
    notes: "Kenya's leading teacher education university. Covers primary, secondary, ECD, and special needs pathways.",
  },
  {
    name: "Moi University — School of Education", location: "Eldoret", region: "rift_valley",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd Arts / BEd Science / BEd Special Needs / BEd Early Childhood",
    },
    annualCostKES: 90000, website: "https://www.mu.ac.ke",
    notes: "Strong teacher education programme. Best option for Rift Valley students going into teaching.",
  },
  {
    name: "University of Nairobi — School of Education", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd / Postgraduate Diploma in Education (PGDE) / MEd",
    },
    annualCostKES: 100000, website: "https://www.uonbi.ac.ke",
    notes: "Flagship university education programme. PGDE is ideal for graduates switching into teaching.",
  },
  {
    name: "Maseno University — School of Education", location: "Kisumu", region: "western",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd Arts / BEd Science / BEd Special Needs",
    },
    annualCostKES: 75000, website: "https://www.maseno.ac.ke",
    notes: "Best university education option for Western Kenya students.",
  },
  {
    name: "Kenya Primary Teachers Colleges (PTCs)", location: "Multiple counties", region: "national",
    type: "Public", level: "tvet",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "P1 Primary Teacher Certificate (2-year programme)",
    },
    annualCostKES: 30000, website: "https://www.tsc.go.ke",
    notes: "Government-run. Includes Kagumo TTC, Mosoriot TTC, Highridge TTC, Shanzu TTC and many others. Most affordable route into primary teaching. Present in all regions.",
  },
  {
    name: "Kenya Institute of Special Education (KISE)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "tvet",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "Diploma in Special Needs Education / Certificate in SNE",
    },
    annualCostKES: 25000, website: "https://www.kise.ac.ke",
    notes: "Kenya's only specialist special needs education institution. Growing field with strong government demand.",
  },
  {
    name: "Kenya Institute of Curriculum Development (KICD)", location: "Nairobi", region: "nairobi_metro",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "Short courses in Curriculum Development / Educational Assessment / CBE Training",
    },
    annualCostKES: 20000, website: "https://www.kicd.ac.ke",
    notes: "Government curriculum body. Offers professional development for practising teachers and curriculum specialists.",
  },
  {
    name: "Pwani University — School of Education", location: "Kilifi", region: "coast",
    type: "Public", level: "university",
    clusters: ["education_teaching"],
    courses: {
      education_teaching: "BEd Arts / BEd Science",
    },
    annualCostKES: 75000, website: "https://www.pu.ac.ke",
    notes: "Best university teacher education option for Coast region students.",
  },
];
// ─── Main function: Get schools for student ───────────────────────────────────

const getSchoolsForStudent = (clusterId, county, budgetTier, q11Answer = null) => {
  const region    = COUNTY_REGIONS[county] || "nairobi_metro";
  const budget    = BUDGET_TIERS[budgetTier];
  const qualLevel = getQualificationLevel(q11Answer);

  if (!budget) return [];

  const matches = SCHOOLS.filter((school) => {
    const clusterMatch = school.clusters.includes(clusterId);
    const budgetMatch  = school.annualCostKES <= budget.max || budgetTier === "scholarships";
    const regionMatch  = school.region === region ||
                         school.region === "nairobi_metro" ||
                         school.region === "national";

    const qualMatch =
      qualLevel === "all"        ? true :
      qualLevel === "university" ? school.level === "university" :
      qualLevel === "tvet"       ? school.level === "tvet" :
      true;

    return clusterMatch && budgetMatch && regionMatch && qualMatch;
  }).sort((a, b) => a.annualCostKES - b.annualCostKES);

  if (qualLevel === "all") {
    const universities = matches.filter((s) => s.level === "university").slice(0, 2);
    const tvets        = matches.filter((s) => s.level === "tvet").slice(0, 2);
    return [...universities, ...tvets].map((school) => formatSchool(school, clusterId));
  }

  if (qualLevel === "university") {
    const publicSchools  = matches.filter((s) => s.type === "Public").slice(0, 2);
    const privateSchools = matches.filter((s) => s.type === "Private").slice(0, 2);
    return [...publicSchools, ...privateSchools].map((school) => formatSchool(school, clusterId));
  }

  // TVET — show up to 4
  return matches.slice(0, 4).map((school) => formatSchool(school, clusterId));
};

// ─── Format school for output ─────────────────────────────────────────────────

const formatSchool = (school, clusterId) => ({
  name:            school.name,
  location:        school.location,
  type:            school.type,
  level:           school.level,
  levelLabel:      school.level === "tvet" ? "Diploma / Certificate / TVET" : "University / College",
  course:          school.courses[clusterId] || "Various programmes available",
  annualCostRange: `~KES ${school.annualCostKES.toLocaleString()}`,
  website:         school.website,
  notes:           school.notes,
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
  SCHOOLS, COUNTY_REGIONS, BUDGET_TIERS,
  getSchoolsForStudent,
  getGeographicAccessibilityScore,
  getBudgetScore,
  getQualificationLevel,
};
