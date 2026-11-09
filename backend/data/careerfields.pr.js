/**
 * CFFR Professional — Career Fields  v1.0
 * ─────────────────────────────────────────────────────────────────────────────
 */

const f = (id, label, sector, keywords = []) => ({ id, label, sector, keywords });

const CAREER_FIELDS = [
  // ── TECH ─────────────────────────────────────────────────────────────────
  f("tech-software-dev","Software development","tech",["coding","programming","developer"]),
  f("tech-web-dev","Web development","tech",["website","frontend","backend"]),
  f("tech-mobile-dev","Mobile app development","tech",["android","ios","app"]),
  f("tech-it-support","IT support / helpdesk","tech",["computer repair","tech support"]),
  f("tech-networking","Networking & systems administration","tech",["network","server","sysadmin"]),
  f("tech-cybersecurity","Cybersecurity","tech",["security","hacking","infosec"]),
  f("tech-cloud","Cloud computing","tech",["aws","azure","cloud engineer"]),
  f("tech-qa","Software testing / QA","tech",["quality assurance","tester"]),
  f("tech-ecommerce","E-commerce platforms","tech",["online store","shopify"]),
  f("tech-telecom","Telecommunications","tech",["fibre","network technician"]),

  // ── DATA ─────────────────────────────────────────────────────────────────
  f("data-analysis","Data analysis","data",["excel","reporting","insights"]),
  f("data-science","Data science","data",["machine learning","statistics"]),
  f("data-bi","Business intelligence","data",["dashboards","power bi"]),
  f("data-research","Market & social research","data",["surveys","research"]),
  f("data-gis","GIS / mapping","data",["geospatial","mapping"]),

  // ── FINANCE ──────────────────────────────────────────────────────────────
  f("fin-accounting","Accounting & bookkeeping","finance",["ledger","kasneb"]),
  f("fin-auditing","Auditing","finance",["audit","compliance"]),
  f("fin-banking","Retail banking","finance",["teller","bank"]),
  f("fin-microfinance","Microfinance & SACCOs","finance",["sacco","chama"]),
  f("fin-mobile-money","Mobile money & agency banking","finance",["mpesa","agent"]),
  f("fin-insurance","Insurance","finance",["underwriting","claims"]),
  f("fin-investment","Investment & wealth management","finance",["stocks","portfolio"]),
  f("fin-tax","Tax consulting","finance",["kra","tax"]),
  f("fin-actuarial","Actuarial science","finance",["actuary","risk"]),
  f("fin-payroll","Payroll administration","finance",["payslip","hr payroll"]),

  // ── BUSINESS ─────────────────────────────────────────────────────────────
  f("biz-admin","Office administration","business",["admin","secretary"]),
  f("biz-hr","Human resources","business",["hr","recruitment","personnel"]),
  f("biz-project-mgmt","Project management","business",["pmp","projects"]),
  f("biz-consulting","Management consulting","business",["consultant","strategy"]),
  f("biz-operations","Operations management","business",["ops","efficiency"]),
  f("biz-customer-service","Customer service","business",["call centre","support"]),
  f("biz-procurement","Procurement & purchasing","business",["supplier","tendering"]),
  f("biz-entrepreneurship","Running your own business","business",["startup","founder","hustle"]),
  f("biz-quality","Quality assurance & standards","business",["iso","quality control"]),
  f("biz-records","Records & documentation","business",["filing","archives"]),

  // ── SALES & MARKETING ────────────────────────────────────────────────────
  f("sal-retail","Retail sales","sales",["shop","cashier","duka"]),
  f("sal-field-sales","Field sales","sales",["door to door","fmcg rep"]),
  f("sal-b2b","Business development / B2B sales","sales",["corporate sales"]),
  f("sal-telesales","Telesales / call sales","sales",["cold calling"]),
  f("sal-digital-marketing","Digital marketing","sales",["seo","ads","social media"]),
  f("sal-content","Content creation & copywriting","sales",["blogging","content"]),
  f("sal-brand","Branding & advertising","sales",["brand manager"]),
  f("sal-pr","Public relations","sales",["pr","media relations"]),
  f("sal-events","Event marketing & promotions","sales",["activations","promo"]),
  f("sal-wholesale","Wholesale & distribution","sales",["distributor","stockist"]),

  // ── HEALTH ───────────────────────────────────────────────────────────────
  f("health-medicine","Medicine (doctor)","health",["physician","clinician"]),
  f("health-nursing","Nursing","health",["nurse"]),
  f("health-midwifery","Midwifery","health",["maternity"]),
  f("health-clinical-officer","Clinical medicine (clinical officer)","health",["clinical officer"]),
  f("health-pharmacy","Pharmacy","health",["pharmacist","chemist"]),
  f("health-lab","Medical laboratory science","health",["lab technician"]),
  f("health-dental","Dentistry","health",["dentist","dental"]),
  f("health-physio","Physiotherapy","health",["physio","rehab"]),
  f("health-nutrition","Nutrition & dietetics","health",["dietitian","nutritionist"]),
  f("health-mental","Mental health & counselling","health",["psychologist","counsellor"]),
  f("health-public-health","Public health","health",["epidemiology","community health"]),
  f("health-radiography","Radiography / imaging","health",["x-ray","sonography"]),
  f("health-optometry","Optometry","health",["eyes","optician"]),
  f("health-veterinary","Veterinary medicine","health",["vet","animal health"]),
  f("health-emergency","Emergency medical services","health",["paramedic","ambulance"]),
  f("health-caregiving","Caregiving / home health","health",["caregiver","elderly care"]),

  // ── EDUCATION ────────────────────────────────────────────────────────────
  f("edu-primary","Primary school teaching","edu",["teacher","primary"]),
  f("edu-secondary","Secondary school teaching","edu",["high school teacher"]),
  f("edu-ecde","Early childhood education","edu",["ecde","pre-primary"]),
  f("edu-special-needs","Special needs education","edu",["special education"]),
  f("edu-university","University lecturing","edu",["lecturer","academia"]),
  f("edu-tvet","TVET / vocational training","edu",["technical instructor"]),
  f("edu-tutoring","Private tutoring","edu",["tutor"]),
  f("edu-curriculum","Curriculum design & instructional design","edu",["curriculum developer"]),
  f("edu-elearning","E-learning development","edu",["online courses"]),
  f("edu-school-admin","School administration","edu",["principal","headteacher"]),
  f("edu-counselling","Career & school counselling","edu",["career guidance"]),
  f("edu-language","Language teaching","edu",["english teacher","french tutor"]),

  // ── SOCIAL & DEVELOPMENT ─────────────────────────────────────────────────
  f("soc-social-work","Social work","social",["child protection"]),
  f("soc-community","Community development","social",["community mobiliser"]),
  f("soc-ngo","NGO / development programmes","social",["ngo","humanitarian"]),
  f("soc-me","Monitoring & evaluation","social",["m&e"]),
  f("soc-fundraising","Fundraising & grants","social",["donor relations"]),
  f("soc-youth","Youth work","social",["youth programmes"]),
  f("soc-advocacy","Advocacy & human rights","social",["rights","policy advocacy"]),
  f("soc-refugee","Refugee & humanitarian support","social",["refugee support"]),
  f("soc-gender","Gender & inclusion work","social",["gender equity"]),
  f("soc-faith","Faith-based / religious leadership","social",["pastor","chaplain"]),

  // ── LAW & GOVERNANCE ─────────────────────────────────────────────────────
  f("law-legal-practice","Legal practice (advocate)","law",["lawyer","advocate"]),
  f("law-paralegal","Paralegal services","law",["paralegal"]),
  f("law-corporate-legal","Corporate legal & compliance","law",["legal officer"]),
  f("law-judiciary","Judiciary","law",["judge","magistrate"]),
  f("law-civil-service","Civil service / public administration","law",["civil servant"]),
  f("law-county-govt","County government","law",["county officer"]),
  f("law-customs","Customs & immigration","law",["border control"]),
  f("law-revenue","Tax & revenue administration","law",["kra officer"]),
  f("law-diplomacy","Diplomacy / foreign service","law",["embassy","diplomat"]),
  f("law-policy","Policy analysis","law",["think tank"]),

  // ── ENGINEERING & CONSTRUCTION ───────────────────────────────────────────
  f("eng-civil","Civil engineering","eng",["structural","construction engineer"]),
  f("eng-mechanical","Mechanical engineering","eng",["mechanical"]),
  f("eng-electrical","Electrical engineering","eng",["electrical engineer"]),
  f("eng-architecture","Architecture","eng",["architect"]),
  f("eng-quantity-surveying","Quantity surveying","eng",["qs","cost estimation"]),
  f("eng-site-mgmt","Construction site management","eng",["site manager","foreman"]),
  f("eng-surveying","Land surveying","eng",["surveyor"]),
  f("eng-hvac","HVAC / refrigeration","eng",["air conditioning","cooling"]),

  // ── ENERGY & ENVIRONMENT ─────────────────────────────────────────────────
  f("energy-solar","Solar & renewable energy","energy",["solar installer"]),
  f("energy-electrical-install","Power / electrical installation","energy",["wiring"]),
  f("energy-oil-gas","Oil & gas","energy",["petroleum"]),
  f("energy-environment","Environmental management","energy",["environmental officer"]),
  f("energy-climate","Climate & sustainability","energy",["esg","carbon"]),
  f("energy-waste","Waste management & recycling","energy",["recycling"]),
  f("energy-water","Water & sanitation","energy",["wash","water engineer"]),

  // ── AGRICULTURE ──────────────────────────────────────────────────────────
  f("agri-crop-farming","Crop farming","agri",["shamba","horticulture"]),
  f("agri-livestock","Livestock farming","agri",["dairy","cattle"]),
  f("agri-poultry","Poultry farming","agri",["chicken","eggs"]),
  f("agri-fisheries","Fisheries & aquaculture","agri",["fish farming"]),
  f("agri-agribusiness","Agribusiness & trading","agri",["produce trading"]),
  f("agri-agronomy","Agronomy / crop science","agri",["agronomist"]),
  f("agri-food-processing","Food processing","agri",["food production"]),
  f("agri-veterinary-services","Animal health services","agri",["livestock health"]),
  f("agri-forestry","Forestry","agri",["forester"]),

  // ── TRADES ───────────────────────────────────────────────────────────────
  f("trade-electrician","Electrical work (electrician)","trades",["fundi umeme"]),
  f("trade-plumbing","Plumbing","trades",["fundi maji"]),
  f("trade-carpentry","Carpentry & woodwork","trades",["fundi mbao"]),
  f("trade-masonry","Masonry & construction trades","trades",["fundi jengo"]),
  f("trade-welding","Welding & fabrication","trades",["fundi chuma"]),
  f("trade-auto-mechanics","Auto mechanics","trades",["mechanic","garage"]),
  f("trade-tailoring","Tailoring & fashion design","trades",["fundi nguo","seamstress"]),
  f("trade-painting","Painting & decorating","trades",["painter"]),
  f("trade-appliance-repair","Appliance & electronics repair","trades",["fundi umeme"]),
  f("trade-jua-kali","Jua Kali / general artisan work","trades",["jua kali"]),

  // ── MANUFACTURING ────────────────────────────────────────────────────────
  f("manuf-production","Factory production","manuf",["assembly line"]),
  f("manuf-quality-control","Manufacturing quality control","manuf",["qc inspector"]),
  f("manuf-textiles","Textiles & garment manufacturing","manuf",["textile"]),
  f("manuf-food-mfg","Food & beverage manufacturing","manuf",["food factory"]),
  f("manuf-maintenance","Industrial maintenance","manuf",["plant maintenance"]),

  // ── LOGISTICS ────────────────────────────────────────────────────────────
  f("logi-supply-chain","Supply chain management","logistics",["scm"]),
  f("logi-warehousing","Warehousing & inventory","logistics",["stock control"]),
  f("logi-freight","Freight & shipping","logistics",["clearing and forwarding"]),
  f("logi-driving","Professional driving","logistics",["driver","matatu"]),
  f("logi-delivery","Delivery & courier services","logistics",["boda boda","courier"]),
  f("logi-fleet","Fleet management","logistics",["fleet"]),
  f("logi-procurement-logistics","Import/export logistics","logistics",["clearing agent"]),

  // ── HOSPITALITY ──────────────────────────────────────────────────────────
  f("hosp-hotel","Hotel management","hospitality",["hotelier"]),
  f("hosp-restaurant","Restaurant & catering","hospitality",["chef","catering"]),
  f("hosp-tourism","Tourism & tour guiding","hospitality",["tour guide","safari"]),
  f("hosp-events","Event planning","hospitality",["event planner","wedding planner"]),
  f("hosp-travel","Travel agency services","hospitality",["travel agent"]),
  f("hosp-housekeeping","Housekeeping & facilities","hospitality",["housekeeper"]),

  // ── CREATIVE ─────────────────────────────────────────────────────────────
  f("cre-graphic-design","Graphic design","creative",["design","branding"]),
  f("cre-photography","Photography","creative",["photographer"]),
  f("cre-videography","Videography & film","creative",["videographer","filmmaker"]),
  f("cre-music","Music production & performance","creative",["musician"]),
  f("cre-fine-art","Fine art & illustration","creative",["artist","illustrator"]),
  f("cre-fashion-design","Fashion design","creative",["fashion designer"]),
  f("cre-journalism","Journalism & broadcasting","creative",["reporter","news"]),
  f("cre-writing","Creative & professional writing","creative",["author","writer"]),
  f("cre-animation","Animation & motion graphics","creative",["animator"]),
  f("cre-interior-design","Interior design","creative",["interior decorator"]),

  // ── SECURITY ─────────────────────────────────────────────────────────────
  f("sec-private-security","Private security services","security",["security guard"]),
  f("sec-police","Police service","security",["police officer"]),
  f("sec-military","Military service","security",["armed forces"]),
  f("sec-fire","Fire & rescue services","security",["firefighter"]),
  f("sec-investigations","Private investigations","security",["investigator"]),
  f("sec-cyber-defence","Cyber defence & digital forensics","security",["digital forensics"]),

  // ── PROPERTY ─────────────────────────────────────────────────────────────
  f("prop-real-estate","Real estate sales & brokerage","property",["real estate agent"]),
  f("prop-management","Property management","property",["property manager"]),
  f("prop-valuation","Property valuation","property",["valuer"]),
  f("prop-development","Property development","property",["developer"]),
  f("prop-short-let","Short-let & Airbnb management","property",["airbnb host"]),

  // ── SCIENCE ──────────────────────────────────────────────────────────────
  f("sci-lab-research","Laboratory research","science",["research scientist"]),
  f("sci-biotech","Biotechnology","science",["biotech"]),
  f("sci-chemistry","Chemistry","science",["chemist"]),
  f("sci-geology","Geology & mining","science",["geologist","mining"]),
  f("sci-meteorology","Meteorology","science",["weather forecasting"]),
  f("sci-conservation","Wildlife & conservation","science",["conservationist","kws"]),
  f("sci-marine","Marine science","science",["marine biology"]),

  // ── PERSONAL SERVICES ────────────────────────────────────────────────────
  f("pers-beauty","Beauty & salon services","personal",["hairdresser","salon","kinyozi"]),
  f("pers-fitness","Fitness training","personal",["personal trainer","gym"]),
  f("pers-cleaning","Cleaning & domestic services","personal",["house help","cleaner"]),
  f("pers-childcare","Childcare & nannying","personal",["nanny"]),
  f("pers-massage-spa","Massage & spa therapy","personal",["spa therapist"]),
  f("pers-personal-styling","Personal styling","personal",["stylist"]),

  // ── TECH (more) ──────────────────────────────────────────────────────────
  f("tech-devops","DevOps & cloud infrastructure","tech",["deployment","ci/cd"]),
  f("tech-product","Product management (tech)","tech",["product manager"]),
  f("tech-ux-ui","UX/UI design","tech",["user experience","figma"]),
  f("tech-technical-writing","Technical writing","tech",["documentation"]),
  f("tech-hardware","Hardware & computer repair","tech",["computer technician"]),

  // ── DATA (more) ──────────────────────────────────────────────────────────
  f("data-ai-ml","AI & machine learning","data",["artificial intelligence"]),
  f("data-database-admin","Database administration","data",["dba","sql"]),
  f("data-statistics","Statistics","data",["statistician"]),

  // ── FINANCE (more) ───────────────────────────────────────────────────────
  f("fin-credit","Credit & loans","finance",["loan officer","lending"]),
  f("fin-treasury","Treasury management","finance",["treasury"]),
  f("fin-forensic","Forensic accounting","finance",["fraud investigation"]),
  f("fin-financial-planning","Personal financial planning","finance",["financial advisor"]),
  f("fin-pension","Pensions administration","finance",["pension fund"]),

  // ── BUSINESS (more) ──────────────────────────────────────────────────────
  f("biz-change-mgmt","Organisational change management","business",["change consultant"]),
  f("biz-risk","Risk management","business",["risk officer"]),
  f("biz-legal-secretary","Company secretarial services","business",["company secretary"]),
  f("biz-training","Corporate training & facilitation","business",["corporate trainer"]),
  f("biz-virtual-assistant","Virtual assistance","business",["va","remote assistant"]),
  f("biz-franchise","Franchise operations","business",["franchisee"]),

  // ── SALES & MARKETING (more) ─────────────────────────────────────────────
  f("sal-account-mgmt","Key account management","sales",["account manager"]),
  f("sal-ecommerce","E-commerce & online selling","sales",["jumia","online seller"]),
  f("sal-merchandising","Merchandising","sales",["shelf display"]),
  f("sal-affiliate","Affiliate & influencer marketing","sales",["influencer"]),
  f("sal-market-research","Market research","sales",["consumer insights"]),

  // ── HEALTH (more) ────────────────────────────────────────────────────────
  f("health-community-health","Community health work","health",["chw","community health worker"]),
  f("health-health-records","Health records management","health",["medical records"]),
  f("health-biomedical","Biomedical equipment technology","health",["medical equipment"]),
  f("health-sports-medicine","Sports medicine & therapy","health",["sports therapist"]),
  f("health-occupational-therapy","Occupational therapy","health",["ot"]),
  f("health-speech-therapy","Speech & language therapy","health",["speech therapist"]),

  // ── EDUCATION (more) ─────────────────────────────────────────────────────
  f("edu-driving-instruction","Driving instruction","edu",["driving school"]),
  f("edu-sports-coaching","Sports coaching","edu",["coach"]),
  f("edu-library","Library & information science","edu",["librarian"]),
  f("edu-adult-education","Adult & literacy education","edu",["adult learning"]),

  // ── SOCIAL (more) ────────────────────────────────────────────────────────
  f("soc-child-protection","Child protection services","social",["child welfare"]),
  f("soc-disability","Disability inclusion work","social",["disability support"]),
  f("soc-peacebuilding","Peacebuilding & conflict resolution","social",["mediation"]),
  f("soc-volunteer-coord","Volunteer coordination","social",["volunteer management"]),

  // ── LAW (more) ───────────────────────────────────────────────────────────
  f("law-arbitration","Arbitration & mediation","law",["dispute resolution"]),
  f("law-ip","Intellectual property law","law",["patents","trademarks"]),
  f("law-data-protection","Data protection & privacy","law",["dpo","gdpr"]),
  f("law-lands","Land administration & registration","law",["lands office"]),

  // ── ENGINEERING (more) ───────────────────────────────────────────────────
  f("eng-mining","Mining engineering","eng",["mining"]),
  f("eng-industrial","Industrial engineering","eng",["process engineering"]),
  f("eng-marine-eng","Marine engineering","eng",["ships","maritime"]),
  f("eng-aeronautical","Aeronautical / aviation engineering","eng",["aviation"]),

  // ── ENERGY (more) ────────────────────────────────────────────────────────
  f("energy-mining-resources","Mining & natural resources","energy",["quarry"]),
  f("energy-conservation","Wildlife & environmental conservation","energy",["conservation officer"]),

  // ── AGRICULTURE (more) ───────────────────────────────────────────────────
  f("agri-horticulture","Horticulture & floriculture","agri",["flower farming"]),
  f("agri-irrigation","Irrigation & farm engineering","agri",["irrigation"]),
  f("agri-agro-processing","Agro-processing","agri",["value addition"]),
  f("agri-cooperatives","Agricultural cooperatives","agri",["farmers' cooperative"]),

  // ── TRADES (more) ────────────────────────────────────────────────────────
  f("trade-plant-operator","Heavy machinery / plant operation","trades",["excavator operator"]),
  f("trade-refrigeration","Refrigeration & AC repair","trades",["fridge repair"]),
  f("trade-signage","Signage & fabrication","trades",["signwriting"]),
  f("trade-shoemaking","Shoemaking & leatherwork","trades",["cobbler"]),

  // ── MANUFACTURING (more) ─────────────────────────────────────────────────
  f("manuf-packaging","Packaging & printing","manuf",["printing press"]),
  f("manuf-plastics","Plastics & materials manufacturing","manuf",["plastics"]),
  f("manuf-assembly","Assembly & fabrication","manuf",["assembly worker"]),

  // ── LOGISTICS (more) ─────────────────────────────────────────────────────
  f("logi-aviation-ops","Aviation & airport operations","logistics",["airport"]),
  f("logi-maritime","Maritime & port operations","logistics",["shipping port"]),

  // ── HOSPITALITY (more) ───────────────────────────────────────────────────
  f("hosp-bartending","Bartending & mixology","hospitality",["bartender"]),
  f("hosp-baking","Baking & pastry","hospitality",["baker","pastry chef"]),
  f("hosp-cruise-airline","Airline & cruise service","hospitality",["flight attendant"]),

  // ── CREATIVE (more) ──────────────────────────────────────────────────────
  f("cre-social-media-content","Social media content creation","creative",["content creator","tiktok"]),
  f("cre-game-design","Game design","creative",["game developer"]),
  f("cre-tattoo","Tattoo & body art","creative",["tattoo artist"]),

  // ── SECURITY (more) ──────────────────────────────────────────────────────
  f("sec-corrections","Corrections & prison services","security",["prison officer"]),
  f("sec-close-protection","Close protection / bodyguarding","security",["bodyguard"]),
  f("sec-disaster-response","Disaster & emergency response","security",["disaster management"]),

  // ── PROPERTY (more) ──────────────────────────────────────────────────────
  f("prop-facilities","Facilities management","property",["facilities manager"]),
  f("prop-building-inspection","Building inspection","property",["building inspector"]),

  // ── SCIENCE (more) ───────────────────────────────────────────────────────
  f("sci-food-science","Food science","science",["food scientist"]),
  f("sci-forensics","Forensic science","science",["forensics"]),
  f("sci-astronomy","Astronomy & space science","science",["astronomer"]),

  // ── PERSONAL SERVICES (more) ─────────────────────────────────────────────
  f("pers-makeup","Makeup artistry","personal",["makeup artist","mua"]),
  f("pers-nutrition-coaching","Wellness & nutrition coaching","personal",["wellness coach"]),
  f("pers-pet-care","Pet care & grooming","personal",["dog groomer","pet sitter"]),

  // ── FALLBACK ─────────────────────────────────────────────────────────────
  f("other-havent-worked","I haven't worked in a specific field yet","business",[]),
  f("other-not-listed","Something else not listed here","business",[]),
];

module.exports = { CAREER_FIELDS };
