/**
 * CFFR Professional — Questions (FRONTEND, display-only)  v3.0
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const FREE_QUESTIONS = 3;

export const WORK_HISTORY_FIELD = {
  "section": "Your Track Record",
  "intro": "Tell us about the roles you've held. Yes, even the 2-month internship counts. Especially that one.",
  "minEntries": 0,
  "maxEntries": 8,
  "entryFields": [
    {
      "id": "title",
      "label": "What did you do? (role or title)",
      "type": "text",
      "required": true
    },
    {
      "id": "type",
      "label": "Type",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "fulltime",
          "label": "Full-time"
        },
        {
          "id": "parttime",
          "label": "Part-time"
        },
        {
          "id": "internship",
          "label": "Internship"
        },
        {
          "id": "attachment",
          "label": "Attachment"
        },
        {
          "id": "volunteer",
          "label": "Volunteer"
        },
        {
          "id": "gig",
          "label": "Freelance / Gig"
        }
      ]
    },
    {
      "id": "sector",
      "label": "Where? (the field or industry)",
      "type": "single",
      "required": true,
      "searchable": true,
      "options": [
        {
          "id": "tech-software-dev",
          "label": "Software development",
          "keywords": [
            "coding",
            "programming",
            "developer"
          ]
        },
        {
          "id": "tech-web-dev",
          "label": "Web development",
          "keywords": [
            "website",
            "frontend",
            "backend"
          ]
        },
        {
          "id": "tech-mobile-dev",
          "label": "Mobile app development",
          "keywords": [
            "android",
            "ios",
            "app"
          ]
        },
        {
          "id": "tech-it-support",
          "label": "IT support / helpdesk",
          "keywords": [
            "computer repair",
            "tech support"
          ]
        },
        {
          "id": "tech-networking",
          "label": "Networking & systems administration",
          "keywords": [
            "network",
            "server",
            "sysadmin"
          ]
        },
        {
          "id": "tech-cybersecurity",
          "label": "Cybersecurity",
          "keywords": [
            "security",
            "hacking",
            "infosec"
          ]
        },
        {
          "id": "tech-cloud",
          "label": "Cloud computing",
          "keywords": [
            "aws",
            "azure",
            "cloud engineer"
          ]
        },
        {
          "id": "tech-qa",
          "label": "Software testing / QA",
          "keywords": [
            "quality assurance",
            "tester"
          ]
        },
        {
          "id": "tech-ecommerce",
          "label": "E-commerce platforms",
          "keywords": [
            "online store",
            "shopify"
          ]
        },
        {
          "id": "tech-telecom",
          "label": "Telecommunications",
          "keywords": [
            "fibre",
            "network technician"
          ]
        },
        {
          "id": "data-analysis",
          "label": "Data analysis",
          "keywords": [
            "excel",
            "reporting",
            "insights"
          ]
        },
        {
          "id": "data-science",
          "label": "Data science",
          "keywords": [
            "machine learning",
            "statistics"
          ]
        },
        {
          "id": "data-bi",
          "label": "Business intelligence",
          "keywords": [
            "dashboards",
            "power bi"
          ]
        },
        {
          "id": "data-research",
          "label": "Market & social research",
          "keywords": [
            "surveys",
            "research"
          ]
        },
        {
          "id": "data-gis",
          "label": "GIS / mapping",
          "keywords": [
            "geospatial",
            "mapping"
          ]
        },
        {
          "id": "fin-accounting",
          "label": "Accounting & bookkeeping",
          "keywords": [
            "ledger",
            "kasneb"
          ]
        },
        {
          "id": "fin-auditing",
          "label": "Auditing",
          "keywords": [
            "audit",
            "compliance"
          ]
        },
        {
          "id": "fin-banking",
          "label": "Retail banking",
          "keywords": [
            "teller",
            "bank"
          ]
        },
        {
          "id": "fin-microfinance",
          "label": "Microfinance & SACCOs",
          "keywords": [
            "sacco",
            "chama"
          ]
        },
        {
          "id": "fin-mobile-money",
          "label": "Mobile money & agency banking",
          "keywords": [
            "mpesa",
            "agent"
          ]
        },
        {
          "id": "fin-insurance",
          "label": "Insurance",
          "keywords": [
            "underwriting",
            "claims"
          ]
        },
        {
          "id": "fin-investment",
          "label": "Investment & wealth management",
          "keywords": [
            "stocks",
            "portfolio"
          ]
        },
        {
          "id": "fin-tax",
          "label": "Tax consulting",
          "keywords": [
            "kra",
            "tax"
          ]
        },
        {
          "id": "fin-actuarial",
          "label": "Actuarial science",
          "keywords": [
            "actuary",
            "risk"
          ]
        },
        {
          "id": "fin-payroll",
          "label": "Payroll administration",
          "keywords": [
            "payslip",
            "hr payroll"
          ]
        },
        {
          "id": "biz-admin",
          "label": "Office administration",
          "keywords": [
            "admin",
            "secretary"
          ]
        },
        {
          "id": "biz-hr",
          "label": "Human resources",
          "keywords": [
            "hr",
            "recruitment",
            "personnel"
          ]
        },
        {
          "id": "biz-project-mgmt",
          "label": "Project management",
          "keywords": [
            "pmp",
            "projects"
          ]
        },
        {
          "id": "biz-consulting",
          "label": "Management consulting",
          "keywords": [
            "consultant",
            "strategy"
          ]
        },
        {
          "id": "biz-operations",
          "label": "Operations management",
          "keywords": [
            "ops",
            "efficiency"
          ]
        },
        {
          "id": "biz-customer-service",
          "label": "Customer service",
          "keywords": [
            "call centre",
            "support"
          ]
        },
        {
          "id": "biz-procurement",
          "label": "Procurement & purchasing",
          "keywords": [
            "supplier",
            "tendering"
          ]
        },
        {
          "id": "biz-entrepreneurship",
          "label": "Running your own business",
          "keywords": [
            "startup",
            "founder",
            "hustle"
          ]
        },
        {
          "id": "biz-quality",
          "label": "Quality assurance & standards",
          "keywords": [
            "iso",
            "quality control"
          ]
        },
        {
          "id": "biz-records",
          "label": "Records & documentation",
          "keywords": [
            "filing",
            "archives"
          ]
        },
        {
          "id": "sal-retail",
          "label": "Retail sales",
          "keywords": [
            "shop",
            "cashier",
            "duka"
          ]
        },
        {
          "id": "sal-field-sales",
          "label": "Field sales",
          "keywords": [
            "door to door",
            "fmcg rep"
          ]
        },
        {
          "id": "sal-b2b",
          "label": "Business development / B2B sales",
          "keywords": [
            "corporate sales"
          ]
        },
        {
          "id": "sal-telesales",
          "label": "Telesales / call sales",
          "keywords": [
            "cold calling"
          ]
        },
        {
          "id": "sal-digital-marketing",
          "label": "Digital marketing",
          "keywords": [
            "seo",
            "ads",
            "social media"
          ]
        },
        {
          "id": "sal-content",
          "label": "Content creation & copywriting",
          "keywords": [
            "blogging",
            "content"
          ]
        },
        {
          "id": "sal-brand",
          "label": "Branding & advertising",
          "keywords": [
            "brand manager"
          ]
        },
        {
          "id": "sal-pr",
          "label": "Public relations",
          "keywords": [
            "pr",
            "media relations"
          ]
        },
        {
          "id": "sal-events",
          "label": "Event marketing & promotions",
          "keywords": [
            "activations",
            "promo"
          ]
        },
        {
          "id": "sal-wholesale",
          "label": "Wholesale & distribution",
          "keywords": [
            "distributor",
            "stockist"
          ]
        },
        {
          "id": "health-medicine",
          "label": "Medicine (doctor)",
          "keywords": [
            "physician",
            "clinician"
          ]
        },
        {
          "id": "health-nursing",
          "label": "Nursing",
          "keywords": [
            "nurse"
          ]
        },
        {
          "id": "health-midwifery",
          "label": "Midwifery",
          "keywords": [
            "maternity"
          ]
        },
        {
          "id": "health-clinical-officer",
          "label": "Clinical medicine (clinical officer)",
          "keywords": [
            "clinical officer"
          ]
        },
        {
          "id": "health-pharmacy",
          "label": "Pharmacy",
          "keywords": [
            "pharmacist",
            "chemist"
          ]
        },
        {
          "id": "health-lab",
          "label": "Medical laboratory science",
          "keywords": [
            "lab technician"
          ]
        },
        {
          "id": "health-dental",
          "label": "Dentistry",
          "keywords": [
            "dentist",
            "dental"
          ]
        },
        {
          "id": "health-physio",
          "label": "Physiotherapy",
          "keywords": [
            "physio",
            "rehab"
          ]
        },
        {
          "id": "health-nutrition",
          "label": "Nutrition & dietetics",
          "keywords": [
            "dietitian",
            "nutritionist"
          ]
        },
        {
          "id": "health-mental",
          "label": "Mental health & counselling",
          "keywords": [
            "psychologist",
            "counsellor"
          ]
        },
        {
          "id": "health-public-health",
          "label": "Public health",
          "keywords": [
            "epidemiology",
            "community health"
          ]
        },
        {
          "id": "health-radiography",
          "label": "Radiography / imaging",
          "keywords": [
            "x-ray",
            "sonography"
          ]
        },
        {
          "id": "health-optometry",
          "label": "Optometry",
          "keywords": [
            "eyes",
            "optician"
          ]
        },
        {
          "id": "health-veterinary",
          "label": "Veterinary medicine",
          "keywords": [
            "vet",
            "animal health"
          ]
        },
        {
          "id": "health-emergency",
          "label": "Emergency medical services",
          "keywords": [
            "paramedic",
            "ambulance"
          ]
        },
        {
          "id": "health-caregiving",
          "label": "Caregiving / home health",
          "keywords": [
            "caregiver",
            "elderly care"
          ]
        },
        {
          "id": "edu-primary",
          "label": "Primary school teaching",
          "keywords": [
            "teacher",
            "primary"
          ]
        },
        {
          "id": "edu-secondary",
          "label": "Secondary school teaching",
          "keywords": [
            "high school teacher"
          ]
        },
        {
          "id": "edu-ecde",
          "label": "Early childhood education",
          "keywords": [
            "ecde",
            "pre-primary"
          ]
        },
        {
          "id": "edu-special-needs",
          "label": "Special needs education",
          "keywords": [
            "special education"
          ]
        },
        {
          "id": "edu-university",
          "label": "University lecturing",
          "keywords": [
            "lecturer",
            "academia"
          ]
        },
        {
          "id": "edu-tvet",
          "label": "TVET / vocational training",
          "keywords": [
            "technical instructor"
          ]
        },
        {
          "id": "edu-tutoring",
          "label": "Private tutoring",
          "keywords": [
            "tutor"
          ]
        },
        {
          "id": "edu-curriculum",
          "label": "Curriculum design & instructional design",
          "keywords": [
            "curriculum developer"
          ]
        },
        {
          "id": "edu-elearning",
          "label": "E-learning development",
          "keywords": [
            "online courses"
          ]
        },
        {
          "id": "edu-school-admin",
          "label": "School administration",
          "keywords": [
            "principal",
            "headteacher"
          ]
        },
        {
          "id": "edu-counselling",
          "label": "Career & school counselling",
          "keywords": [
            "career guidance"
          ]
        },
        {
          "id": "edu-language",
          "label": "Language teaching",
          "keywords": [
            "english teacher",
            "french tutor"
          ]
        },
        {
          "id": "soc-social-work",
          "label": "Social work",
          "keywords": [
            "child protection"
          ]
        },
        {
          "id": "soc-community",
          "label": "Community development",
          "keywords": [
            "community mobiliser"
          ]
        },
        {
          "id": "soc-ngo",
          "label": "NGO / development programmes",
          "keywords": [
            "ngo",
            "humanitarian"
          ]
        },
        {
          "id": "soc-me",
          "label": "Monitoring & evaluation",
          "keywords": [
            "m&e"
          ]
        },
        {
          "id": "soc-fundraising",
          "label": "Fundraising & grants",
          "keywords": [
            "donor relations"
          ]
        },
        {
          "id": "soc-youth",
          "label": "Youth work",
          "keywords": [
            "youth programmes"
          ]
        },
        {
          "id": "soc-advocacy",
          "label": "Advocacy & human rights",
          "keywords": [
            "rights",
            "policy advocacy"
          ]
        },
        {
          "id": "soc-refugee",
          "label": "Refugee & humanitarian support",
          "keywords": [
            "refugee support"
          ]
        },
        {
          "id": "soc-gender",
          "label": "Gender & inclusion work",
          "keywords": [
            "gender equity"
          ]
        },
        {
          "id": "soc-faith",
          "label": "Faith-based / religious leadership",
          "keywords": [
            "pastor",
            "chaplain"
          ]
        },
        {
          "id": "law-legal-practice",
          "label": "Legal practice (advocate)",
          "keywords": [
            "lawyer",
            "advocate"
          ]
        },
        {
          "id": "law-paralegal",
          "label": "Paralegal services",
          "keywords": [
            "paralegal"
          ]
        },
        {
          "id": "law-corporate-legal",
          "label": "Corporate legal & compliance",
          "keywords": [
            "legal officer"
          ]
        },
        {
          "id": "law-judiciary",
          "label": "Judiciary",
          "keywords": [
            "judge",
            "magistrate"
          ]
        },
        {
          "id": "law-civil-service",
          "label": "Civil service / public administration",
          "keywords": [
            "civil servant"
          ]
        },
        {
          "id": "law-county-govt",
          "label": "County government",
          "keywords": [
            "county officer"
          ]
        },
        {
          "id": "law-customs",
          "label": "Customs & immigration",
          "keywords": [
            "border control"
          ]
        },
        {
          "id": "law-revenue",
          "label": "Tax & revenue administration",
          "keywords": [
            "kra officer"
          ]
        },
        {
          "id": "law-diplomacy",
          "label": "Diplomacy / foreign service",
          "keywords": [
            "embassy",
            "diplomat"
          ]
        },
        {
          "id": "law-policy",
          "label": "Policy analysis",
          "keywords": [
            "think tank"
          ]
        },
        {
          "id": "eng-civil",
          "label": "Civil engineering",
          "keywords": [
            "structural",
            "construction engineer"
          ]
        },
        {
          "id": "eng-mechanical",
          "label": "Mechanical engineering",
          "keywords": [
            "mechanical"
          ]
        },
        {
          "id": "eng-electrical",
          "label": "Electrical engineering",
          "keywords": [
            "electrical engineer"
          ]
        },
        {
          "id": "eng-architecture",
          "label": "Architecture",
          "keywords": [
            "architect"
          ]
        },
        {
          "id": "eng-quantity-surveying",
          "label": "Quantity surveying",
          "keywords": [
            "qs",
            "cost estimation"
          ]
        },
        {
          "id": "eng-site-mgmt",
          "label": "Construction site management",
          "keywords": [
            "site manager",
            "foreman"
          ]
        },
        {
          "id": "eng-surveying",
          "label": "Land surveying",
          "keywords": [
            "surveyor"
          ]
        },
        {
          "id": "eng-hvac",
          "label": "HVAC / refrigeration",
          "keywords": [
            "air conditioning",
            "cooling"
          ]
        },
        {
          "id": "energy-solar",
          "label": "Solar & renewable energy",
          "keywords": [
            "solar installer"
          ]
        },
        {
          "id": "energy-electrical-install",
          "label": "Power / electrical installation",
          "keywords": [
            "wiring"
          ]
        },
        {
          "id": "energy-oil-gas",
          "label": "Oil & gas",
          "keywords": [
            "petroleum"
          ]
        },
        {
          "id": "energy-environment",
          "label": "Environmental management",
          "keywords": [
            "environmental officer"
          ]
        },
        {
          "id": "energy-climate",
          "label": "Climate & sustainability",
          "keywords": [
            "esg",
            "carbon"
          ]
        },
        {
          "id": "energy-waste",
          "label": "Waste management & recycling",
          "keywords": [
            "recycling"
          ]
        },
        {
          "id": "energy-water",
          "label": "Water & sanitation",
          "keywords": [
            "wash",
            "water engineer"
          ]
        },
        {
          "id": "agri-crop-farming",
          "label": "Crop farming",
          "keywords": [
            "shamba",
            "horticulture"
          ]
        },
        {
          "id": "agri-livestock",
          "label": "Livestock farming",
          "keywords": [
            "dairy",
            "cattle"
          ]
        },
        {
          "id": "agri-poultry",
          "label": "Poultry farming",
          "keywords": [
            "chicken",
            "eggs"
          ]
        },
        {
          "id": "agri-fisheries",
          "label": "Fisheries & aquaculture",
          "keywords": [
            "fish farming"
          ]
        },
        {
          "id": "agri-agribusiness",
          "label": "Agribusiness & trading",
          "keywords": [
            "produce trading"
          ]
        },
        {
          "id": "agri-agronomy",
          "label": "Agronomy / crop science",
          "keywords": [
            "agronomist"
          ]
        },
        {
          "id": "agri-food-processing",
          "label": "Food processing",
          "keywords": [
            "food production"
          ]
        },
        {
          "id": "agri-veterinary-services",
          "label": "Animal health services",
          "keywords": [
            "livestock health"
          ]
        },
        {
          "id": "agri-forestry",
          "label": "Forestry",
          "keywords": [
            "forester"
          ]
        },
        {
          "id": "trade-electrician",
          "label": "Electrical work (electrician)",
          "keywords": [
            "fundi umeme"
          ]
        },
        {
          "id": "trade-plumbing",
          "label": "Plumbing",
          "keywords": [
            "fundi maji"
          ]
        },
        {
          "id": "trade-carpentry",
          "label": "Carpentry & woodwork",
          "keywords": [
            "fundi mbao"
          ]
        },
        {
          "id": "trade-masonry",
          "label": "Masonry & construction trades",
          "keywords": [
            "fundi jengo"
          ]
        },
        {
          "id": "trade-welding",
          "label": "Welding & fabrication",
          "keywords": [
            "fundi chuma"
          ]
        },
        {
          "id": "trade-auto-mechanics",
          "label": "Auto mechanics",
          "keywords": [
            "mechanic",
            "garage"
          ]
        },
        {
          "id": "trade-tailoring",
          "label": "Tailoring & fashion design",
          "keywords": [
            "fundi nguo",
            "seamstress"
          ]
        },
        {
          "id": "trade-painting",
          "label": "Painting & decorating",
          "keywords": [
            "painter"
          ]
        },
        {
          "id": "trade-appliance-repair",
          "label": "Appliance & electronics repair",
          "keywords": [
            "fundi umeme"
          ]
        },
        {
          "id": "trade-jua-kali",
          "label": "Jua Kali / general artisan work",
          "keywords": [
            "jua kali"
          ]
        },
        {
          "id": "manuf-production",
          "label": "Factory production",
          "keywords": [
            "assembly line"
          ]
        },
        {
          "id": "manuf-quality-control",
          "label": "Manufacturing quality control",
          "keywords": [
            "qc inspector"
          ]
        },
        {
          "id": "manuf-textiles",
          "label": "Textiles & garment manufacturing",
          "keywords": [
            "textile"
          ]
        },
        {
          "id": "manuf-food-mfg",
          "label": "Food & beverage manufacturing",
          "keywords": [
            "food factory"
          ]
        },
        {
          "id": "manuf-maintenance",
          "label": "Industrial maintenance",
          "keywords": [
            "plant maintenance"
          ]
        },
        {
          "id": "logi-supply-chain",
          "label": "Supply chain management",
          "keywords": [
            "scm"
          ]
        },
        {
          "id": "logi-warehousing",
          "label": "Warehousing & inventory",
          "keywords": [
            "stock control"
          ]
        },
        {
          "id": "logi-freight",
          "label": "Freight & shipping",
          "keywords": [
            "clearing and forwarding"
          ]
        },
        {
          "id": "logi-driving",
          "label": "Professional driving",
          "keywords": [
            "driver",
            "matatu"
          ]
        },
        {
          "id": "logi-delivery",
          "label": "Delivery & courier services",
          "keywords": [
            "boda boda",
            "courier"
          ]
        },
        {
          "id": "logi-fleet",
          "label": "Fleet management",
          "keywords": [
            "fleet"
          ]
        },
        {
          "id": "logi-procurement-logistics",
          "label": "Import/export logistics",
          "keywords": [
            "clearing agent"
          ]
        },
        {
          "id": "hosp-hotel",
          "label": "Hotel management",
          "keywords": [
            "hotelier"
          ]
        },
        {
          "id": "hosp-restaurant",
          "label": "Restaurant & catering",
          "keywords": [
            "chef",
            "catering"
          ]
        },
        {
          "id": "hosp-tourism",
          "label": "Tourism & tour guiding",
          "keywords": [
            "tour guide",
            "safari"
          ]
        },
        {
          "id": "hosp-events",
          "label": "Event planning",
          "keywords": [
            "event planner",
            "wedding planner"
          ]
        },
        {
          "id": "hosp-travel",
          "label": "Travel agency services",
          "keywords": [
            "travel agent"
          ]
        },
        {
          "id": "hosp-housekeeping",
          "label": "Housekeeping & facilities",
          "keywords": [
            "housekeeper"
          ]
        },
        {
          "id": "cre-graphic-design",
          "label": "Graphic design",
          "keywords": [
            "design",
            "branding"
          ]
        },
        {
          "id": "cre-photography",
          "label": "Photography",
          "keywords": [
            "photographer"
          ]
        },
        {
          "id": "cre-videography",
          "label": "Videography & film",
          "keywords": [
            "videographer",
            "filmmaker"
          ]
        },
        {
          "id": "cre-music",
          "label": "Music production & performance",
          "keywords": [
            "musician"
          ]
        },
        {
          "id": "cre-fine-art",
          "label": "Fine art & illustration",
          "keywords": [
            "artist",
            "illustrator"
          ]
        },
        {
          "id": "cre-fashion-design",
          "label": "Fashion design",
          "keywords": [
            "fashion designer"
          ]
        },
        {
          "id": "cre-journalism",
          "label": "Journalism & broadcasting",
          "keywords": [
            "reporter",
            "news"
          ]
        },
        {
          "id": "cre-writing",
          "label": "Creative & professional writing",
          "keywords": [
            "author",
            "writer"
          ]
        },
        {
          "id": "cre-animation",
          "label": "Animation & motion graphics",
          "keywords": [
            "animator"
          ]
        },
        {
          "id": "cre-interior-design",
          "label": "Interior design",
          "keywords": [
            "interior decorator"
          ]
        },
        {
          "id": "sec-private-security",
          "label": "Private security services",
          "keywords": [
            "security guard"
          ]
        },
        {
          "id": "sec-police",
          "label": "Police service",
          "keywords": [
            "police officer"
          ]
        },
        {
          "id": "sec-military",
          "label": "Military service",
          "keywords": [
            "armed forces"
          ]
        },
        {
          "id": "sec-fire",
          "label": "Fire & rescue services",
          "keywords": [
            "firefighter"
          ]
        },
        {
          "id": "sec-investigations",
          "label": "Private investigations",
          "keywords": [
            "investigator"
          ]
        },
        {
          "id": "sec-cyber-defence",
          "label": "Cyber defence & digital forensics",
          "keywords": [
            "digital forensics"
          ]
        },
        {
          "id": "prop-real-estate",
          "label": "Real estate sales & brokerage",
          "keywords": [
            "real estate agent"
          ]
        },
        {
          "id": "prop-management",
          "label": "Property management",
          "keywords": [
            "property manager"
          ]
        },
        {
          "id": "prop-valuation",
          "label": "Property valuation",
          "keywords": [
            "valuer"
          ]
        },
        {
          "id": "prop-development",
          "label": "Property development",
          "keywords": [
            "developer"
          ]
        },
        {
          "id": "prop-short-let",
          "label": "Short-let & Airbnb management",
          "keywords": [
            "airbnb host"
          ]
        },
        {
          "id": "sci-lab-research",
          "label": "Laboratory research",
          "keywords": [
            "research scientist"
          ]
        },
        {
          "id": "sci-biotech",
          "label": "Biotechnology",
          "keywords": [
            "biotech"
          ]
        },
        {
          "id": "sci-chemistry",
          "label": "Chemistry",
          "keywords": [
            "chemist"
          ]
        },
        {
          "id": "sci-geology",
          "label": "Geology & mining",
          "keywords": [
            "geologist",
            "mining"
          ]
        },
        {
          "id": "sci-meteorology",
          "label": "Meteorology",
          "keywords": [
            "weather forecasting"
          ]
        },
        {
          "id": "sci-conservation",
          "label": "Wildlife & conservation",
          "keywords": [
            "conservationist",
            "kws"
          ]
        },
        {
          "id": "sci-marine",
          "label": "Marine science",
          "keywords": [
            "marine biology"
          ]
        },
        {
          "id": "pers-beauty",
          "label": "Beauty & salon services",
          "keywords": [
            "hairdresser",
            "salon",
            "kinyozi"
          ]
        },
        {
          "id": "pers-fitness",
          "label": "Fitness training",
          "keywords": [
            "personal trainer",
            "gym"
          ]
        },
        {
          "id": "pers-cleaning",
          "label": "Cleaning & domestic services",
          "keywords": [
            "house help",
            "cleaner"
          ]
        },
        {
          "id": "pers-childcare",
          "label": "Childcare & nannying",
          "keywords": [
            "nanny"
          ]
        },
        {
          "id": "pers-massage-spa",
          "label": "Massage & spa therapy",
          "keywords": [
            "spa therapist"
          ]
        },
        {
          "id": "pers-personal-styling",
          "label": "Personal styling",
          "keywords": [
            "stylist"
          ]
        },
        {
          "id": "tech-devops",
          "label": "DevOps & cloud infrastructure",
          "keywords": [
            "deployment",
            "ci/cd"
          ]
        },
        {
          "id": "tech-product",
          "label": "Product management (tech)",
          "keywords": [
            "product manager"
          ]
        },
        {
          "id": "tech-ux-ui",
          "label": "UX/UI design",
          "keywords": [
            "user experience",
            "figma"
          ]
        },
        {
          "id": "tech-technical-writing",
          "label": "Technical writing",
          "keywords": [
            "documentation"
          ]
        },
        {
          "id": "tech-hardware",
          "label": "Hardware & computer repair",
          "keywords": [
            "computer technician"
          ]
        },
        {
          "id": "data-ai-ml",
          "label": "AI & machine learning",
          "keywords": [
            "artificial intelligence"
          ]
        },
        {
          "id": "data-database-admin",
          "label": "Database administration",
          "keywords": [
            "dba",
            "sql"
          ]
        },
        {
          "id": "data-statistics",
          "label": "Statistics",
          "keywords": [
            "statistician"
          ]
        },
        {
          "id": "fin-credit",
          "label": "Credit & loans",
          "keywords": [
            "loan officer",
            "lending"
          ]
        },
        {
          "id": "fin-treasury",
          "label": "Treasury management",
          "keywords": [
            "treasury"
          ]
        },
        {
          "id": "fin-forensic",
          "label": "Forensic accounting",
          "keywords": [
            "fraud investigation"
          ]
        },
        {
          "id": "fin-financial-planning",
          "label": "Personal financial planning",
          "keywords": [
            "financial advisor"
          ]
        },
        {
          "id": "fin-pension",
          "label": "Pensions administration",
          "keywords": [
            "pension fund"
          ]
        },
        {
          "id": "biz-change-mgmt",
          "label": "Organisational change management",
          "keywords": [
            "change consultant"
          ]
        },
        {
          "id": "biz-risk",
          "label": "Risk management",
          "keywords": [
            "risk officer"
          ]
        },
        {
          "id": "biz-legal-secretary",
          "label": "Company secretarial services",
          "keywords": [
            "company secretary"
          ]
        },
        {
          "id": "biz-training",
          "label": "Corporate training & facilitation",
          "keywords": [
            "corporate trainer"
          ]
        },
        {
          "id": "biz-virtual-assistant",
          "label": "Virtual assistance",
          "keywords": [
            "va",
            "remote assistant"
          ]
        },
        {
          "id": "biz-franchise",
          "label": "Franchise operations",
          "keywords": [
            "franchisee"
          ]
        },
        {
          "id": "sal-account-mgmt",
          "label": "Key account management",
          "keywords": [
            "account manager"
          ]
        },
        {
          "id": "sal-ecommerce",
          "label": "E-commerce & online selling",
          "keywords": [
            "jumia",
            "online seller"
          ]
        },
        {
          "id": "sal-merchandising",
          "label": "Merchandising",
          "keywords": [
            "shelf display"
          ]
        },
        {
          "id": "sal-affiliate",
          "label": "Affiliate & influencer marketing",
          "keywords": [
            "influencer"
          ]
        },
        {
          "id": "sal-market-research",
          "label": "Market research",
          "keywords": [
            "consumer insights"
          ]
        },
        {
          "id": "health-community-health",
          "label": "Community health work",
          "keywords": [
            "chw",
            "community health worker"
          ]
        },
        {
          "id": "health-health-records",
          "label": "Health records management",
          "keywords": [
            "medical records"
          ]
        },
        {
          "id": "health-biomedical",
          "label": "Biomedical equipment technology",
          "keywords": [
            "medical equipment"
          ]
        },
        {
          "id": "health-sports-medicine",
          "label": "Sports medicine & therapy",
          "keywords": [
            "sports therapist"
          ]
        },
        {
          "id": "health-occupational-therapy",
          "label": "Occupational therapy",
          "keywords": [
            "ot"
          ]
        },
        {
          "id": "health-speech-therapy",
          "label": "Speech & language therapy",
          "keywords": [
            "speech therapist"
          ]
        },
        {
          "id": "edu-driving-instruction",
          "label": "Driving instruction",
          "keywords": [
            "driving school"
          ]
        },
        {
          "id": "edu-sports-coaching",
          "label": "Sports coaching",
          "keywords": [
            "coach"
          ]
        },
        {
          "id": "edu-library",
          "label": "Library & information science",
          "keywords": [
            "librarian"
          ]
        },
        {
          "id": "edu-adult-education",
          "label": "Adult & literacy education",
          "keywords": [
            "adult learning"
          ]
        },
        {
          "id": "soc-child-protection",
          "label": "Child protection services",
          "keywords": [
            "child welfare"
          ]
        },
        {
          "id": "soc-disability",
          "label": "Disability inclusion work",
          "keywords": [
            "disability support"
          ]
        },
        {
          "id": "soc-peacebuilding",
          "label": "Peacebuilding & conflict resolution",
          "keywords": [
            "mediation"
          ]
        },
        {
          "id": "soc-volunteer-coord",
          "label": "Volunteer coordination",
          "keywords": [
            "volunteer management"
          ]
        },
        {
          "id": "law-arbitration",
          "label": "Arbitration & mediation",
          "keywords": [
            "dispute resolution"
          ]
        },
        {
          "id": "law-ip",
          "label": "Intellectual property law",
          "keywords": [
            "patents",
            "trademarks"
          ]
        },
        {
          "id": "law-data-protection",
          "label": "Data protection & privacy",
          "keywords": [
            "dpo",
            "gdpr"
          ]
        },
        {
          "id": "law-lands",
          "label": "Land administration & registration",
          "keywords": [
            "lands office"
          ]
        },
        {
          "id": "eng-mining",
          "label": "Mining engineering",
          "keywords": [
            "mining"
          ]
        },
        {
          "id": "eng-industrial",
          "label": "Industrial engineering",
          "keywords": [
            "process engineering"
          ]
        },
        {
          "id": "eng-marine-eng",
          "label": "Marine engineering",
          "keywords": [
            "ships",
            "maritime"
          ]
        },
        {
          "id": "eng-aeronautical",
          "label": "Aeronautical / aviation engineering",
          "keywords": [
            "aviation"
          ]
        },
        {
          "id": "energy-mining-resources",
          "label": "Mining & natural resources",
          "keywords": [
            "quarry"
          ]
        },
        {
          "id": "energy-conservation",
          "label": "Wildlife & environmental conservation",
          "keywords": [
            "conservation officer"
          ]
        },
        {
          "id": "agri-horticulture",
          "label": "Horticulture & floriculture",
          "keywords": [
            "flower farming"
          ]
        },
        {
          "id": "agri-irrigation",
          "label": "Irrigation & farm engineering",
          "keywords": [
            "irrigation"
          ]
        },
        {
          "id": "agri-agro-processing",
          "label": "Agro-processing",
          "keywords": [
            "value addition"
          ]
        },
        {
          "id": "agri-cooperatives",
          "label": "Agricultural cooperatives",
          "keywords": [
            "farmers' cooperative"
          ]
        },
        {
          "id": "trade-plant-operator",
          "label": "Heavy machinery / plant operation",
          "keywords": [
            "excavator operator"
          ]
        },
        {
          "id": "trade-refrigeration",
          "label": "Refrigeration & AC repair",
          "keywords": [
            "fridge repair"
          ]
        },
        {
          "id": "trade-signage",
          "label": "Signage & fabrication",
          "keywords": [
            "signwriting"
          ]
        },
        {
          "id": "trade-shoemaking",
          "label": "Shoemaking & leatherwork",
          "keywords": [
            "cobbler"
          ]
        },
        {
          "id": "manuf-packaging",
          "label": "Packaging & printing",
          "keywords": [
            "printing press"
          ]
        },
        {
          "id": "manuf-plastics",
          "label": "Plastics & materials manufacturing",
          "keywords": [
            "plastics"
          ]
        },
        {
          "id": "manuf-assembly",
          "label": "Assembly & fabrication",
          "keywords": [
            "assembly worker"
          ]
        },
        {
          "id": "logi-aviation-ops",
          "label": "Aviation & airport operations",
          "keywords": [
            "airport"
          ]
        },
        {
          "id": "logi-maritime",
          "label": "Maritime & port operations",
          "keywords": [
            "shipping port"
          ]
        },
        {
          "id": "hosp-bartending",
          "label": "Bartending & mixology",
          "keywords": [
            "bartender"
          ]
        },
        {
          "id": "hosp-baking",
          "label": "Baking & pastry",
          "keywords": [
            "baker",
            "pastry chef"
          ]
        },
        {
          "id": "hosp-cruise-airline",
          "label": "Airline & cruise service",
          "keywords": [
            "flight attendant"
          ]
        },
        {
          "id": "cre-social-media-content",
          "label": "Social media content creation",
          "keywords": [
            "content creator",
            "tiktok"
          ]
        },
        {
          "id": "cre-game-design",
          "label": "Game design",
          "keywords": [
            "game developer"
          ]
        },
        {
          "id": "cre-tattoo",
          "label": "Tattoo & body art",
          "keywords": [
            "tattoo artist"
          ]
        },
        {
          "id": "sec-corrections",
          "label": "Corrections & prison services",
          "keywords": [
            "prison officer"
          ]
        },
        {
          "id": "sec-close-protection",
          "label": "Close protection / bodyguarding",
          "keywords": [
            "bodyguard"
          ]
        },
        {
          "id": "sec-disaster-response",
          "label": "Disaster & emergency response",
          "keywords": [
            "disaster management"
          ]
        },
        {
          "id": "prop-facilities",
          "label": "Facilities management",
          "keywords": [
            "facilities manager"
          ]
        },
        {
          "id": "prop-building-inspection",
          "label": "Building inspection",
          "keywords": [
            "building inspector"
          ]
        },
        {
          "id": "sci-food-science",
          "label": "Food science",
          "keywords": [
            "food scientist"
          ]
        },
        {
          "id": "sci-forensics",
          "label": "Forensic science",
          "keywords": [
            "forensics"
          ]
        },
        {
          "id": "sci-astronomy",
          "label": "Astronomy & space science",
          "keywords": [
            "astronomer"
          ]
        },
        {
          "id": "pers-makeup",
          "label": "Makeup artistry",
          "keywords": [
            "makeup artist",
            "mua"
          ]
        },
        {
          "id": "pers-nutrition-coaching",
          "label": "Wellness & nutrition coaching",
          "keywords": [
            "wellness coach"
          ]
        },
        {
          "id": "pers-pet-care",
          "label": "Pet care & grooming",
          "keywords": [
            "dog groomer",
            "pet sitter"
          ]
        },
        {
          "id": "other-havent-worked",
          "label": "I haven't worked in a specific field yet",
          "keywords": []
        },
        {
          "id": "other-not-listed",
          "label": "Something else not listed here",
          "keywords": []
        }
      ]
    },
    {
      "id": "duration",
      "label": "For how long?",
      "type": "text",
      "required": true,
      "placeholder": "e.g. 2 months, 3 years"
    },
    {
      "id": "dayToDay",
      "label": "What did you actually do day-to-day?",
      "type": "textarea",
      "required": false,
      "placeholder": "The job description, minus the corporate fluff.",
      "maxLength": 500
    },
    {
      "id": "praisedFor",
      "label": "What's something you got noticeably good at, or got praised for, there?",
      "type": "textarea",
      "required": false,
      "placeholder": "This one quietly does a lot of the scoring ",
      "maxLength": 300
    }
  ]
};

export const QUESTIONS = [
  {
    "id": "q1",
    "sectionLabel": "Section 1",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "What's the highest level of education you've completed?",
    "dynamicFromHistory": false,
    "free": true,
    "options": [
      {
        "id": "q1a",
        "icon": null,
        "label": "Certificate"
      },
      {
        "id": "q1b",
        "icon": null,
        "label": "Diploma"
      },
      {
        "id": "q1c",
        "icon": null,
        "label": "Bachelor's"
      },
      {
        "id": "q1d",
        "icon": null,
        "label": "Master's or beyond"
      },
      {
        "id": "q1e",
        "icon": null,
        "label": "Still pursuing"
      },
      {
        "id": "q1f",
        "icon": null,
        "label": "None of these quite fit"
      }
    ]
  },
  {
    "id": "q2",
    "sectionLabel": "Section 1",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "What did you study, or what's your area of qualification?",
    "dynamicFromHistory": false,
    "free": true,
    "options": [
      {
        "id": "q2-business",
        "icon": null,
        "label": "Business, commerce or management"
      },
      {
        "id": "q2-acctfin",
        "icon": null,
        "label": "Accounting, finance or economics"
      },
      {
        "id": "q2-stats",
        "icon": null,
        "label": "Statistics, mathematics or data"
      },
      {
        "id": "q2-it",
        "icon": null,
        "label": "Computer science, IT or software"
      },
      {
        "id": "q2-eng",
        "icon": null,
        "label": "Engineering"
      },
      {
        "id": "q2-arch",
        "icon": null,
        "label": "Architecture, surveying or built environment"
      },
      {
        "id": "q2-health",
        "icon": null,
        "label": "Medicine, nursing, pharmacy or health sciences"
      },
      {
        "id": "q2-agri",
        "icon": null,
        "label": "Agriculture, veterinary or food science"
      },
      {
        "id": "q2-env",
        "icon": null,
        "label": "Environmental, natural or physical sciences"
      },
      {
        "id": "q2-edu",
        "icon": null,
        "label": "Education"
      },
      {
        "id": "q2-law",
        "icon": null,
        "label": "Law or governance"
      },
      {
        "id": "q2-social",
        "icon": null,
        "label": "Social sciences, humanities or development"
      },
      {
        "id": "q2-media",
        "icon": null,
        "label": "Media, journalism or communication"
      },
      {
        "id": "q2-art",
        "icon": null,
        "label": "Art, design or performing arts"
      },
      {
        "id": "q2-hosp",
        "icon": null,
        "label": "Hospitality, tourism or events"
      },
      {
        "id": "q2-trade",
        "icon": null,
        "label": "Technical or vocational trade (TVET)"
      },
      {
        "id": "q2-logi",
        "icon": null,
        "label": "Supply chain, logistics or transport"
      },
      {
        "id": "q2-none",
        "icon": null,
        "label": "None of these / no formal study"
      }
    ]
  },
  {
    "id": "q3",
    "sectionLabel": "Section 1",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Where are things at for you right now?",
    "dynamicFromHistory": false,
    "free": true,
    "options": [
      {
        "id": "q3a",
        "icon": "",
        "label": "Employed"
      },
      {
        "id": "q3b",
        "icon": "",
        "label": "Self-employed"
      },
      {
        "id": "q3c",
        "icon": "",
        "label": "Between roles"
      },
      {
        "id": "q3d",
        "icon": "",
        "label": "Still job hunting"
      },
      {
        "id": "q3e",
        "icon": "",
        "label": "It's complicated"
      }
    ]
  },
  {
    "id": "q5",
    "sectionLabel": "Section 3",
    "type": "multi",
    "maxPicks": 2,
    "hint": "Pick up to 2.",
    "searchable": false,
    "text": "What's a task people always come to you for? Everyone has one.",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q5a",
        "icon": "",
        "label": "Sorting out the numbers or the budget"
      },
      {
        "id": "q5b",
        "icon": "",
        "label": "Writing or fixing up someone else's message"
      },
      {
        "id": "q5c",
        "icon": "",
        "label": "Fixing the thing that just broke"
      },
      {
        "id": "q5d",
        "icon": "",
        "label": "Finding where something got misplaced"
      },
      {
        "id": "q5e",
        "icon": "",
        "label": "Making something look good"
      },
      {
        "id": "q5f",
        "icon": "",
        "label": "Smoothing over an awkward conversation"
      },
      {
        "id": "q5g",
        "icon": "",
        "label": "Planning the whole thing, start to finish"
      },
      {
        "id": "q5h",
        "icon": "",
        "label": "Sorting out a tech problem"
      },
      {
        "id": "q5i",
        "icon": "",
        "label": "Listening when someone needs to vent"
      },
      {
        "id": "q5j",
        "icon": "",
        "label": "Talking someone into (or out of) something"
      },
      {
        "id": "q5k",
        "icon": "",
        "label": "Taking notes or minutes in a meeting"
      },
      {
        "id": "q5l",
        "icon": "",
        "label": "Keeping everyone organised: schedules, files and follow-ups"
      }
    ]
  },
  {
    "id": "q6",
    "sectionLabel": "Section 3",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Think of a time work felt effortless. What were you doing?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q6a",
        "icon": null,
        "label": "Crunching numbers or spotting a pattern in data"
      },
      {
        "id": "q6b",
        "icon": null,
        "label": "Having a great conversation that got something done"
      },
      {
        "id": "q6c",
        "icon": null,
        "label": "Getting a messy plan into perfect order"
      },
      {
        "id": "q6d",
        "icon": null,
        "label": "Building, fixing or figuring out how something works"
      },
      {
        "id": "q6e",
        "icon": null,
        "label": "Making something creative from scratch"
      },
      {
        "id": "q6f",
        "icon": null,
        "label": "Rallying a group to actually get something done"
      },
      {
        "id": "q6g",
        "icon": null,
        "label": "Helping someone understand something for the first time"
      },
      {
        "id": "q6h",
        "icon": null,
        "label": "Being there for someone who needed it"
      }
    ]
  },
  {
    "id": "q7",
    "sectionLabel": "Section 4",
    "type": "multi",
    "maxPicks": 3,
    "searchable": true,
    "text": "Which of these would you genuinely enjoy doing on a normal workday?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "tech-software-dev",
        "icon": null,
        "label": "Software development",
        "keywords": [
          "coding",
          "programming",
          "developer"
        ]
      },
      {
        "id": "tech-web-dev",
        "icon": null,
        "label": "Web development",
        "keywords": [
          "website",
          "frontend",
          "backend"
        ]
      },
      {
        "id": "tech-mobile-dev",
        "icon": null,
        "label": "Mobile app development",
        "keywords": [
          "android",
          "ios",
          "app"
        ]
      },
      {
        "id": "tech-it-support",
        "icon": null,
        "label": "IT support / helpdesk",
        "keywords": [
          "computer repair",
          "tech support"
        ]
      },
      {
        "id": "tech-networking",
        "icon": null,
        "label": "Networking & systems administration",
        "keywords": [
          "network",
          "server",
          "sysadmin"
        ]
      },
      {
        "id": "tech-cybersecurity",
        "icon": null,
        "label": "Cybersecurity",
        "keywords": [
          "security",
          "hacking",
          "infosec"
        ]
      },
      {
        "id": "tech-cloud",
        "icon": null,
        "label": "Cloud computing",
        "keywords": [
          "aws",
          "azure",
          "cloud engineer"
        ]
      },
      {
        "id": "tech-qa",
        "icon": null,
        "label": "Software testing / QA",
        "keywords": [
          "quality assurance",
          "tester"
        ]
      },
      {
        "id": "tech-ecommerce",
        "icon": null,
        "label": "E-commerce platforms",
        "keywords": [
          "online store",
          "shopify"
        ]
      },
      {
        "id": "tech-telecom",
        "icon": null,
        "label": "Telecommunications",
        "keywords": [
          "fibre",
          "network technician"
        ]
      },
      {
        "id": "data-analysis",
        "icon": null,
        "label": "Data analysis",
        "keywords": [
          "excel",
          "reporting",
          "insights"
        ]
      },
      {
        "id": "data-science",
        "icon": null,
        "label": "Data science",
        "keywords": [
          "machine learning",
          "statistics"
        ]
      },
      {
        "id": "data-bi",
        "icon": null,
        "label": "Business intelligence",
        "keywords": [
          "dashboards",
          "power bi"
        ]
      },
      {
        "id": "data-research",
        "icon": null,
        "label": "Market & social research",
        "keywords": [
          "surveys",
          "research"
        ]
      },
      {
        "id": "data-gis",
        "icon": null,
        "label": "GIS / mapping",
        "keywords": [
          "geospatial",
          "mapping"
        ]
      },
      {
        "id": "fin-accounting",
        "icon": null,
        "label": "Accounting & bookkeeping",
        "keywords": [
          "ledger",
          "kasneb"
        ]
      },
      {
        "id": "fin-auditing",
        "icon": null,
        "label": "Auditing",
        "keywords": [
          "audit",
          "compliance"
        ]
      },
      {
        "id": "fin-banking",
        "icon": null,
        "label": "Retail banking",
        "keywords": [
          "teller",
          "bank"
        ]
      },
      {
        "id": "fin-microfinance",
        "icon": null,
        "label": "Microfinance & SACCOs",
        "keywords": [
          "sacco",
          "chama"
        ]
      },
      {
        "id": "fin-mobile-money",
        "icon": null,
        "label": "Mobile money & agency banking",
        "keywords": [
          "mpesa",
          "agent"
        ]
      },
      {
        "id": "fin-insurance",
        "icon": null,
        "label": "Insurance",
        "keywords": [
          "underwriting",
          "claims"
        ]
      },
      {
        "id": "fin-investment",
        "icon": null,
        "label": "Investment & wealth management",
        "keywords": [
          "stocks",
          "portfolio"
        ]
      },
      {
        "id": "fin-tax",
        "icon": null,
        "label": "Tax consulting",
        "keywords": [
          "kra",
          "tax"
        ]
      },
      {
        "id": "fin-actuarial",
        "icon": null,
        "label": "Actuarial science",
        "keywords": [
          "actuary",
          "risk"
        ]
      },
      {
        "id": "fin-payroll",
        "icon": null,
        "label": "Payroll administration",
        "keywords": [
          "payslip",
          "hr payroll"
        ]
      },
      {
        "id": "biz-admin",
        "icon": null,
        "label": "Office administration",
        "keywords": [
          "admin",
          "secretary"
        ]
      },
      {
        "id": "biz-hr",
        "icon": null,
        "label": "Human resources",
        "keywords": [
          "hr",
          "recruitment",
          "personnel"
        ]
      },
      {
        "id": "biz-project-mgmt",
        "icon": null,
        "label": "Project management",
        "keywords": [
          "pmp",
          "projects"
        ]
      },
      {
        "id": "biz-consulting",
        "icon": null,
        "label": "Management consulting",
        "keywords": [
          "consultant",
          "strategy"
        ]
      },
      {
        "id": "biz-operations",
        "icon": null,
        "label": "Operations management",
        "keywords": [
          "ops",
          "efficiency"
        ]
      },
      {
        "id": "biz-customer-service",
        "icon": null,
        "label": "Customer service",
        "keywords": [
          "call centre",
          "support"
        ]
      },
      {
        "id": "biz-procurement",
        "icon": null,
        "label": "Procurement & purchasing",
        "keywords": [
          "supplier",
          "tendering"
        ]
      },
      {
        "id": "biz-entrepreneurship",
        "icon": null,
        "label": "Running your own business",
        "keywords": [
          "startup",
          "founder",
          "hustle"
        ]
      },
      {
        "id": "biz-quality",
        "icon": null,
        "label": "Quality assurance & standards",
        "keywords": [
          "iso",
          "quality control"
        ]
      },
      {
        "id": "biz-records",
        "icon": null,
        "label": "Records & documentation",
        "keywords": [
          "filing",
          "archives"
        ]
      },
      {
        "id": "sal-retail",
        "icon": null,
        "label": "Retail sales",
        "keywords": [
          "shop",
          "cashier",
          "duka"
        ]
      },
      {
        "id": "sal-field-sales",
        "icon": null,
        "label": "Field sales",
        "keywords": [
          "door to door",
          "fmcg rep"
        ]
      },
      {
        "id": "sal-b2b",
        "icon": null,
        "label": "Business development / B2B sales",
        "keywords": [
          "corporate sales"
        ]
      },
      {
        "id": "sal-telesales",
        "icon": null,
        "label": "Telesales / call sales",
        "keywords": [
          "cold calling"
        ]
      },
      {
        "id": "sal-digital-marketing",
        "icon": null,
        "label": "Digital marketing",
        "keywords": [
          "seo",
          "ads",
          "social media"
        ]
      },
      {
        "id": "sal-content",
        "icon": null,
        "label": "Content creation & copywriting",
        "keywords": [
          "blogging",
          "content"
        ]
      },
      {
        "id": "sal-brand",
        "icon": null,
        "label": "Branding & advertising",
        "keywords": [
          "brand manager"
        ]
      },
      {
        "id": "sal-pr",
        "icon": null,
        "label": "Public relations",
        "keywords": [
          "pr",
          "media relations"
        ]
      },
      {
        "id": "sal-events",
        "icon": null,
        "label": "Event marketing & promotions",
        "keywords": [
          "activations",
          "promo"
        ]
      },
      {
        "id": "sal-wholesale",
        "icon": null,
        "label": "Wholesale & distribution",
        "keywords": [
          "distributor",
          "stockist"
        ]
      },
      {
        "id": "health-medicine",
        "icon": null,
        "label": "Medicine (doctor)",
        "keywords": [
          "physician",
          "clinician"
        ]
      },
      {
        "id": "health-nursing",
        "icon": null,
        "label": "Nursing",
        "keywords": [
          "nurse"
        ]
      },
      {
        "id": "health-midwifery",
        "icon": null,
        "label": "Midwifery",
        "keywords": [
          "maternity"
        ]
      },
      {
        "id": "health-clinical-officer",
        "icon": null,
        "label": "Clinical medicine (clinical officer)",
        "keywords": [
          "clinical officer"
        ]
      },
      {
        "id": "health-pharmacy",
        "icon": null,
        "label": "Pharmacy",
        "keywords": [
          "pharmacist",
          "chemist"
        ]
      },
      {
        "id": "health-lab",
        "icon": null,
        "label": "Medical laboratory science",
        "keywords": [
          "lab technician"
        ]
      },
      {
        "id": "health-dental",
        "icon": null,
        "label": "Dentistry",
        "keywords": [
          "dentist",
          "dental"
        ]
      },
      {
        "id": "health-physio",
        "icon": null,
        "label": "Physiotherapy",
        "keywords": [
          "physio",
          "rehab"
        ]
      },
      {
        "id": "health-nutrition",
        "icon": null,
        "label": "Nutrition & dietetics",
        "keywords": [
          "dietitian",
          "nutritionist"
        ]
      },
      {
        "id": "health-mental",
        "icon": null,
        "label": "Mental health & counselling",
        "keywords": [
          "psychologist",
          "counsellor"
        ]
      },
      {
        "id": "health-public-health",
        "icon": null,
        "label": "Public health",
        "keywords": [
          "epidemiology",
          "community health"
        ]
      },
      {
        "id": "health-radiography",
        "icon": null,
        "label": "Radiography / imaging",
        "keywords": [
          "x-ray",
          "sonography"
        ]
      },
      {
        "id": "health-optometry",
        "icon": null,
        "label": "Optometry",
        "keywords": [
          "eyes",
          "optician"
        ]
      },
      {
        "id": "health-veterinary",
        "icon": null,
        "label": "Veterinary medicine",
        "keywords": [
          "vet",
          "animal health"
        ]
      },
      {
        "id": "health-emergency",
        "icon": null,
        "label": "Emergency medical services",
        "keywords": [
          "paramedic",
          "ambulance"
        ]
      },
      {
        "id": "health-caregiving",
        "icon": null,
        "label": "Caregiving / home health",
        "keywords": [
          "caregiver",
          "elderly care"
        ]
      },
      {
        "id": "edu-primary",
        "icon": null,
        "label": "Primary school teaching",
        "keywords": [
          "teacher",
          "primary"
        ]
      },
      {
        "id": "edu-secondary",
        "icon": null,
        "label": "Secondary school teaching",
        "keywords": [
          "high school teacher"
        ]
      },
      {
        "id": "edu-ecde",
        "icon": null,
        "label": "Early childhood education",
        "keywords": [
          "ecde",
          "pre-primary"
        ]
      },
      {
        "id": "edu-special-needs",
        "icon": null,
        "label": "Special needs education",
        "keywords": [
          "special education"
        ]
      },
      {
        "id": "edu-university",
        "icon": null,
        "label": "University lecturing",
        "keywords": [
          "lecturer",
          "academia"
        ]
      },
      {
        "id": "edu-tvet",
        "icon": null,
        "label": "TVET / vocational training",
        "keywords": [
          "technical instructor"
        ]
      },
      {
        "id": "edu-tutoring",
        "icon": null,
        "label": "Private tutoring",
        "keywords": [
          "tutor"
        ]
      },
      {
        "id": "edu-curriculum",
        "icon": null,
        "label": "Curriculum design & instructional design",
        "keywords": [
          "curriculum developer"
        ]
      },
      {
        "id": "edu-elearning",
        "icon": null,
        "label": "E-learning development",
        "keywords": [
          "online courses"
        ]
      },
      {
        "id": "edu-school-admin",
        "icon": null,
        "label": "School administration",
        "keywords": [
          "principal",
          "headteacher"
        ]
      },
      {
        "id": "edu-counselling",
        "icon": null,
        "label": "Career & school counselling",
        "keywords": [
          "career guidance"
        ]
      },
      {
        "id": "edu-language",
        "icon": null,
        "label": "Language teaching",
        "keywords": [
          "english teacher",
          "french tutor"
        ]
      },
      {
        "id": "soc-social-work",
        "icon": null,
        "label": "Social work",
        "keywords": [
          "child protection"
        ]
      },
      {
        "id": "soc-community",
        "icon": null,
        "label": "Community development",
        "keywords": [
          "community mobiliser"
        ]
      },
      {
        "id": "soc-ngo",
        "icon": null,
        "label": "NGO / development programmes",
        "keywords": [
          "ngo",
          "humanitarian"
        ]
      },
      {
        "id": "soc-me",
        "icon": null,
        "label": "Monitoring & evaluation",
        "keywords": [
          "m&e"
        ]
      },
      {
        "id": "soc-fundraising",
        "icon": null,
        "label": "Fundraising & grants",
        "keywords": [
          "donor relations"
        ]
      },
      {
        "id": "soc-youth",
        "icon": null,
        "label": "Youth work",
        "keywords": [
          "youth programmes"
        ]
      },
      {
        "id": "soc-advocacy",
        "icon": null,
        "label": "Advocacy & human rights",
        "keywords": [
          "rights",
          "policy advocacy"
        ]
      },
      {
        "id": "soc-refugee",
        "icon": null,
        "label": "Refugee & humanitarian support",
        "keywords": [
          "refugee support"
        ]
      },
      {
        "id": "soc-gender",
        "icon": null,
        "label": "Gender & inclusion work",
        "keywords": [
          "gender equity"
        ]
      },
      {
        "id": "soc-faith",
        "icon": null,
        "label": "Faith-based / religious leadership",
        "keywords": [
          "pastor",
          "chaplain"
        ]
      },
      {
        "id": "law-legal-practice",
        "icon": null,
        "label": "Legal practice (advocate)",
        "keywords": [
          "lawyer",
          "advocate"
        ]
      },
      {
        "id": "law-paralegal",
        "icon": null,
        "label": "Paralegal services",
        "keywords": [
          "paralegal"
        ]
      },
      {
        "id": "law-corporate-legal",
        "icon": null,
        "label": "Corporate legal & compliance",
        "keywords": [
          "legal officer"
        ]
      },
      {
        "id": "law-judiciary",
        "icon": null,
        "label": "Judiciary",
        "keywords": [
          "judge",
          "magistrate"
        ]
      },
      {
        "id": "law-civil-service",
        "icon": null,
        "label": "Civil service / public administration",
        "keywords": [
          "civil servant"
        ]
      },
      {
        "id": "law-county-govt",
        "icon": null,
        "label": "County government",
        "keywords": [
          "county officer"
        ]
      },
      {
        "id": "law-customs",
        "icon": null,
        "label": "Customs & immigration",
        "keywords": [
          "border control"
        ]
      },
      {
        "id": "law-revenue",
        "icon": null,
        "label": "Tax & revenue administration",
        "keywords": [
          "kra officer"
        ]
      },
      {
        "id": "law-diplomacy",
        "icon": null,
        "label": "Diplomacy / foreign service",
        "keywords": [
          "embassy",
          "diplomat"
        ]
      },
      {
        "id": "law-policy",
        "icon": null,
        "label": "Policy analysis",
        "keywords": [
          "think tank"
        ]
      },
      {
        "id": "eng-civil",
        "icon": null,
        "label": "Civil engineering",
        "keywords": [
          "structural",
          "construction engineer"
        ]
      },
      {
        "id": "eng-mechanical",
        "icon": null,
        "label": "Mechanical engineering",
        "keywords": [
          "mechanical"
        ]
      },
      {
        "id": "eng-electrical",
        "icon": null,
        "label": "Electrical engineering",
        "keywords": [
          "electrical engineer"
        ]
      },
      {
        "id": "eng-architecture",
        "icon": null,
        "label": "Architecture",
        "keywords": [
          "architect"
        ]
      },
      {
        "id": "eng-quantity-surveying",
        "icon": null,
        "label": "Quantity surveying",
        "keywords": [
          "qs",
          "cost estimation"
        ]
      },
      {
        "id": "eng-site-mgmt",
        "icon": null,
        "label": "Construction site management",
        "keywords": [
          "site manager",
          "foreman"
        ]
      },
      {
        "id": "eng-surveying",
        "icon": null,
        "label": "Land surveying",
        "keywords": [
          "surveyor"
        ]
      },
      {
        "id": "eng-hvac",
        "icon": null,
        "label": "HVAC / refrigeration",
        "keywords": [
          "air conditioning",
          "cooling"
        ]
      },
      {
        "id": "energy-solar",
        "icon": null,
        "label": "Solar & renewable energy",
        "keywords": [
          "solar installer"
        ]
      },
      {
        "id": "energy-electrical-install",
        "icon": null,
        "label": "Power / electrical installation",
        "keywords": [
          "wiring"
        ]
      },
      {
        "id": "energy-oil-gas",
        "icon": null,
        "label": "Oil & gas",
        "keywords": [
          "petroleum"
        ]
      },
      {
        "id": "energy-environment",
        "icon": null,
        "label": "Environmental management",
        "keywords": [
          "environmental officer"
        ]
      },
      {
        "id": "energy-climate",
        "icon": null,
        "label": "Climate & sustainability",
        "keywords": [
          "esg",
          "carbon"
        ]
      },
      {
        "id": "energy-waste",
        "icon": null,
        "label": "Waste management & recycling",
        "keywords": [
          "recycling"
        ]
      },
      {
        "id": "energy-water",
        "icon": null,
        "label": "Water & sanitation",
        "keywords": [
          "wash",
          "water engineer"
        ]
      },
      {
        "id": "agri-crop-farming",
        "icon": null,
        "label": "Crop farming",
        "keywords": [
          "shamba",
          "horticulture"
        ]
      },
      {
        "id": "agri-livestock",
        "icon": null,
        "label": "Livestock farming",
        "keywords": [
          "dairy",
          "cattle"
        ]
      },
      {
        "id": "agri-poultry",
        "icon": null,
        "label": "Poultry farming",
        "keywords": [
          "chicken",
          "eggs"
        ]
      },
      {
        "id": "agri-fisheries",
        "icon": null,
        "label": "Fisheries & aquaculture",
        "keywords": [
          "fish farming"
        ]
      },
      {
        "id": "agri-agribusiness",
        "icon": null,
        "label": "Agribusiness & trading",
        "keywords": [
          "produce trading"
        ]
      },
      {
        "id": "agri-agronomy",
        "icon": null,
        "label": "Agronomy / crop science",
        "keywords": [
          "agronomist"
        ]
      },
      {
        "id": "agri-food-processing",
        "icon": null,
        "label": "Food processing",
        "keywords": [
          "food production"
        ]
      },
      {
        "id": "agri-veterinary-services",
        "icon": null,
        "label": "Animal health services",
        "keywords": [
          "livestock health"
        ]
      },
      {
        "id": "agri-forestry",
        "icon": null,
        "label": "Forestry",
        "keywords": [
          "forester"
        ]
      },
      {
        "id": "trade-electrician",
        "icon": null,
        "label": "Electrical work (electrician)",
        "keywords": [
          "fundi umeme"
        ]
      },
      {
        "id": "trade-plumbing",
        "icon": null,
        "label": "Plumbing",
        "keywords": [
          "fundi maji"
        ]
      },
      {
        "id": "trade-carpentry",
        "icon": null,
        "label": "Carpentry & woodwork",
        "keywords": [
          "fundi mbao"
        ]
      },
      {
        "id": "trade-masonry",
        "icon": null,
        "label": "Masonry & construction trades",
        "keywords": [
          "fundi jengo"
        ]
      },
      {
        "id": "trade-welding",
        "icon": null,
        "label": "Welding & fabrication",
        "keywords": [
          "fundi chuma"
        ]
      },
      {
        "id": "trade-auto-mechanics",
        "icon": null,
        "label": "Auto mechanics",
        "keywords": [
          "mechanic",
          "garage"
        ]
      },
      {
        "id": "trade-tailoring",
        "icon": null,
        "label": "Tailoring & fashion design",
        "keywords": [
          "fundi nguo",
          "seamstress"
        ]
      },
      {
        "id": "trade-painting",
        "icon": null,
        "label": "Painting & decorating",
        "keywords": [
          "painter"
        ]
      },
      {
        "id": "trade-appliance-repair",
        "icon": null,
        "label": "Appliance & electronics repair",
        "keywords": [
          "fundi umeme"
        ]
      },
      {
        "id": "trade-jua-kali",
        "icon": null,
        "label": "Jua Kali / general artisan work",
        "keywords": [
          "jua kali"
        ]
      },
      {
        "id": "manuf-production",
        "icon": null,
        "label": "Factory production",
        "keywords": [
          "assembly line"
        ]
      },
      {
        "id": "manuf-quality-control",
        "icon": null,
        "label": "Manufacturing quality control",
        "keywords": [
          "qc inspector"
        ]
      },
      {
        "id": "manuf-textiles",
        "icon": null,
        "label": "Textiles & garment manufacturing",
        "keywords": [
          "textile"
        ]
      },
      {
        "id": "manuf-food-mfg",
        "icon": null,
        "label": "Food & beverage manufacturing",
        "keywords": [
          "food factory"
        ]
      },
      {
        "id": "manuf-maintenance",
        "icon": null,
        "label": "Industrial maintenance",
        "keywords": [
          "plant maintenance"
        ]
      },
      {
        "id": "logi-supply-chain",
        "icon": null,
        "label": "Supply chain management",
        "keywords": [
          "scm"
        ]
      },
      {
        "id": "logi-warehousing",
        "icon": null,
        "label": "Warehousing & inventory",
        "keywords": [
          "stock control"
        ]
      },
      {
        "id": "logi-freight",
        "icon": null,
        "label": "Freight & shipping",
        "keywords": [
          "clearing and forwarding"
        ]
      },
      {
        "id": "logi-driving",
        "icon": null,
        "label": "Professional driving",
        "keywords": [
          "driver",
          "matatu"
        ]
      },
      {
        "id": "logi-delivery",
        "icon": null,
        "label": "Delivery & courier services",
        "keywords": [
          "boda boda",
          "courier"
        ]
      },
      {
        "id": "logi-fleet",
        "icon": null,
        "label": "Fleet management",
        "keywords": [
          "fleet"
        ]
      },
      {
        "id": "logi-procurement-logistics",
        "icon": null,
        "label": "Import/export logistics",
        "keywords": [
          "clearing agent"
        ]
      },
      {
        "id": "hosp-hotel",
        "icon": null,
        "label": "Hotel management",
        "keywords": [
          "hotelier"
        ]
      },
      {
        "id": "hosp-restaurant",
        "icon": null,
        "label": "Restaurant & catering",
        "keywords": [
          "chef",
          "catering"
        ]
      },
      {
        "id": "hosp-tourism",
        "icon": null,
        "label": "Tourism & tour guiding",
        "keywords": [
          "tour guide",
          "safari"
        ]
      },
      {
        "id": "hosp-events",
        "icon": null,
        "label": "Event planning",
        "keywords": [
          "event planner",
          "wedding planner"
        ]
      },
      {
        "id": "hosp-travel",
        "icon": null,
        "label": "Travel agency services",
        "keywords": [
          "travel agent"
        ]
      },
      {
        "id": "hosp-housekeeping",
        "icon": null,
        "label": "Housekeeping & facilities",
        "keywords": [
          "housekeeper"
        ]
      },
      {
        "id": "cre-graphic-design",
        "icon": null,
        "label": "Graphic design",
        "keywords": [
          "design",
          "branding"
        ]
      },
      {
        "id": "cre-photography",
        "icon": null,
        "label": "Photography",
        "keywords": [
          "photographer"
        ]
      },
      {
        "id": "cre-videography",
        "icon": null,
        "label": "Videography & film",
        "keywords": [
          "videographer",
          "filmmaker"
        ]
      },
      {
        "id": "cre-music",
        "icon": null,
        "label": "Music production & performance",
        "keywords": [
          "musician"
        ]
      },
      {
        "id": "cre-fine-art",
        "icon": null,
        "label": "Fine art & illustration",
        "keywords": [
          "artist",
          "illustrator"
        ]
      },
      {
        "id": "cre-fashion-design",
        "icon": null,
        "label": "Fashion design",
        "keywords": [
          "fashion designer"
        ]
      },
      {
        "id": "cre-journalism",
        "icon": null,
        "label": "Journalism & broadcasting",
        "keywords": [
          "reporter",
          "news"
        ]
      },
      {
        "id": "cre-writing",
        "icon": null,
        "label": "Creative & professional writing",
        "keywords": [
          "author",
          "writer"
        ]
      },
      {
        "id": "cre-animation",
        "icon": null,
        "label": "Animation & motion graphics",
        "keywords": [
          "animator"
        ]
      },
      {
        "id": "cre-interior-design",
        "icon": null,
        "label": "Interior design",
        "keywords": [
          "interior decorator"
        ]
      },
      {
        "id": "sec-private-security",
        "icon": null,
        "label": "Private security services",
        "keywords": [
          "security guard"
        ]
      },
      {
        "id": "sec-police",
        "icon": null,
        "label": "Police service",
        "keywords": [
          "police officer"
        ]
      },
      {
        "id": "sec-military",
        "icon": null,
        "label": "Military service",
        "keywords": [
          "armed forces"
        ]
      },
      {
        "id": "sec-fire",
        "icon": null,
        "label": "Fire & rescue services",
        "keywords": [
          "firefighter"
        ]
      },
      {
        "id": "sec-investigations",
        "icon": null,
        "label": "Private investigations",
        "keywords": [
          "investigator"
        ]
      },
      {
        "id": "sec-cyber-defence",
        "icon": null,
        "label": "Cyber defence & digital forensics",
        "keywords": [
          "digital forensics"
        ]
      },
      {
        "id": "prop-real-estate",
        "icon": null,
        "label": "Real estate sales & brokerage",
        "keywords": [
          "real estate agent"
        ]
      },
      {
        "id": "prop-management",
        "icon": null,
        "label": "Property management",
        "keywords": [
          "property manager"
        ]
      },
      {
        "id": "prop-valuation",
        "icon": null,
        "label": "Property valuation",
        "keywords": [
          "valuer"
        ]
      },
      {
        "id": "prop-development",
        "icon": null,
        "label": "Property development",
        "keywords": [
          "developer"
        ]
      },
      {
        "id": "prop-short-let",
        "icon": null,
        "label": "Short-let & Airbnb management",
        "keywords": [
          "airbnb host"
        ]
      },
      {
        "id": "sci-lab-research",
        "icon": null,
        "label": "Laboratory research",
        "keywords": [
          "research scientist"
        ]
      },
      {
        "id": "sci-biotech",
        "icon": null,
        "label": "Biotechnology",
        "keywords": [
          "biotech"
        ]
      },
      {
        "id": "sci-chemistry",
        "icon": null,
        "label": "Chemistry",
        "keywords": [
          "chemist"
        ]
      },
      {
        "id": "sci-geology",
        "icon": null,
        "label": "Geology & mining",
        "keywords": [
          "geologist",
          "mining"
        ]
      },
      {
        "id": "sci-meteorology",
        "icon": null,
        "label": "Meteorology",
        "keywords": [
          "weather forecasting"
        ]
      },
      {
        "id": "sci-conservation",
        "icon": null,
        "label": "Wildlife & conservation",
        "keywords": [
          "conservationist",
          "kws"
        ]
      },
      {
        "id": "sci-marine",
        "icon": null,
        "label": "Marine science",
        "keywords": [
          "marine biology"
        ]
      },
      {
        "id": "pers-beauty",
        "icon": null,
        "label": "Beauty & salon services",
        "keywords": [
          "hairdresser",
          "salon",
          "kinyozi"
        ]
      },
      {
        "id": "pers-fitness",
        "icon": null,
        "label": "Fitness training",
        "keywords": [
          "personal trainer",
          "gym"
        ]
      },
      {
        "id": "pers-cleaning",
        "icon": null,
        "label": "Cleaning & domestic services",
        "keywords": [
          "house help",
          "cleaner"
        ]
      },
      {
        "id": "pers-childcare",
        "icon": null,
        "label": "Childcare & nannying",
        "keywords": [
          "nanny"
        ]
      },
      {
        "id": "pers-massage-spa",
        "icon": null,
        "label": "Massage & spa therapy",
        "keywords": [
          "spa therapist"
        ]
      },
      {
        "id": "pers-personal-styling",
        "icon": null,
        "label": "Personal styling",
        "keywords": [
          "stylist"
        ]
      },
      {
        "id": "tech-devops",
        "icon": null,
        "label": "DevOps & cloud infrastructure",
        "keywords": [
          "deployment",
          "ci/cd"
        ]
      },
      {
        "id": "tech-product",
        "icon": null,
        "label": "Product management (tech)",
        "keywords": [
          "product manager"
        ]
      },
      {
        "id": "tech-ux-ui",
        "icon": null,
        "label": "UX/UI design",
        "keywords": [
          "user experience",
          "figma"
        ]
      },
      {
        "id": "tech-technical-writing",
        "icon": null,
        "label": "Technical writing",
        "keywords": [
          "documentation"
        ]
      },
      {
        "id": "tech-hardware",
        "icon": null,
        "label": "Hardware & computer repair",
        "keywords": [
          "computer technician"
        ]
      },
      {
        "id": "data-ai-ml",
        "icon": null,
        "label": "AI & machine learning",
        "keywords": [
          "artificial intelligence"
        ]
      },
      {
        "id": "data-database-admin",
        "icon": null,
        "label": "Database administration",
        "keywords": [
          "dba",
          "sql"
        ]
      },
      {
        "id": "data-statistics",
        "icon": null,
        "label": "Statistics",
        "keywords": [
          "statistician"
        ]
      },
      {
        "id": "fin-credit",
        "icon": null,
        "label": "Credit & loans",
        "keywords": [
          "loan officer",
          "lending"
        ]
      },
      {
        "id": "fin-treasury",
        "icon": null,
        "label": "Treasury management",
        "keywords": [
          "treasury"
        ]
      },
      {
        "id": "fin-forensic",
        "icon": null,
        "label": "Forensic accounting",
        "keywords": [
          "fraud investigation"
        ]
      },
      {
        "id": "fin-financial-planning",
        "icon": null,
        "label": "Personal financial planning",
        "keywords": [
          "financial advisor"
        ]
      },
      {
        "id": "fin-pension",
        "icon": null,
        "label": "Pensions administration",
        "keywords": [
          "pension fund"
        ]
      },
      {
        "id": "biz-change-mgmt",
        "icon": null,
        "label": "Organisational change management",
        "keywords": [
          "change consultant"
        ]
      },
      {
        "id": "biz-risk",
        "icon": null,
        "label": "Risk management",
        "keywords": [
          "risk officer"
        ]
      },
      {
        "id": "biz-legal-secretary",
        "icon": null,
        "label": "Company secretarial services",
        "keywords": [
          "company secretary"
        ]
      },
      {
        "id": "biz-training",
        "icon": null,
        "label": "Corporate training & facilitation",
        "keywords": [
          "corporate trainer"
        ]
      },
      {
        "id": "biz-virtual-assistant",
        "icon": null,
        "label": "Virtual assistance",
        "keywords": [
          "va",
          "remote assistant"
        ]
      },
      {
        "id": "biz-franchise",
        "icon": null,
        "label": "Franchise operations",
        "keywords": [
          "franchisee"
        ]
      },
      {
        "id": "sal-account-mgmt",
        "icon": null,
        "label": "Key account management",
        "keywords": [
          "account manager"
        ]
      },
      {
        "id": "sal-ecommerce",
        "icon": null,
        "label": "E-commerce & online selling",
        "keywords": [
          "jumia",
          "online seller"
        ]
      },
      {
        "id": "sal-merchandising",
        "icon": null,
        "label": "Merchandising",
        "keywords": [
          "shelf display"
        ]
      },
      {
        "id": "sal-affiliate",
        "icon": null,
        "label": "Affiliate & influencer marketing",
        "keywords": [
          "influencer"
        ]
      },
      {
        "id": "sal-market-research",
        "icon": null,
        "label": "Market research",
        "keywords": [
          "consumer insights"
        ]
      },
      {
        "id": "health-community-health",
        "icon": null,
        "label": "Community health work",
        "keywords": [
          "chw",
          "community health worker"
        ]
      },
      {
        "id": "health-health-records",
        "icon": null,
        "label": "Health records management",
        "keywords": [
          "medical records"
        ]
      },
      {
        "id": "health-biomedical",
        "icon": null,
        "label": "Biomedical equipment technology",
        "keywords": [
          "medical equipment"
        ]
      },
      {
        "id": "health-sports-medicine",
        "icon": null,
        "label": "Sports medicine & therapy",
        "keywords": [
          "sports therapist"
        ]
      },
      {
        "id": "health-occupational-therapy",
        "icon": null,
        "label": "Occupational therapy",
        "keywords": [
          "ot"
        ]
      },
      {
        "id": "health-speech-therapy",
        "icon": null,
        "label": "Speech & language therapy",
        "keywords": [
          "speech therapist"
        ]
      },
      {
        "id": "edu-driving-instruction",
        "icon": null,
        "label": "Driving instruction",
        "keywords": [
          "driving school"
        ]
      },
      {
        "id": "edu-sports-coaching",
        "icon": null,
        "label": "Sports coaching",
        "keywords": [
          "coach"
        ]
      },
      {
        "id": "edu-library",
        "icon": null,
        "label": "Library & information science",
        "keywords": [
          "librarian"
        ]
      },
      {
        "id": "edu-adult-education",
        "icon": null,
        "label": "Adult & literacy education",
        "keywords": [
          "adult learning"
        ]
      },
      {
        "id": "soc-child-protection",
        "icon": null,
        "label": "Child protection services",
        "keywords": [
          "child welfare"
        ]
      },
      {
        "id": "soc-disability",
        "icon": null,
        "label": "Disability inclusion work",
        "keywords": [
          "disability support"
        ]
      },
      {
        "id": "soc-peacebuilding",
        "icon": null,
        "label": "Peacebuilding & conflict resolution",
        "keywords": [
          "mediation"
        ]
      },
      {
        "id": "soc-volunteer-coord",
        "icon": null,
        "label": "Volunteer coordination",
        "keywords": [
          "volunteer management"
        ]
      },
      {
        "id": "law-arbitration",
        "icon": null,
        "label": "Arbitration & mediation",
        "keywords": [
          "dispute resolution"
        ]
      },
      {
        "id": "law-ip",
        "icon": null,
        "label": "Intellectual property law",
        "keywords": [
          "patents",
          "trademarks"
        ]
      },
      {
        "id": "law-data-protection",
        "icon": null,
        "label": "Data protection & privacy",
        "keywords": [
          "dpo",
          "gdpr"
        ]
      },
      {
        "id": "law-lands",
        "icon": null,
        "label": "Land administration & registration",
        "keywords": [
          "lands office"
        ]
      },
      {
        "id": "eng-mining",
        "icon": null,
        "label": "Mining engineering",
        "keywords": [
          "mining"
        ]
      },
      {
        "id": "eng-industrial",
        "icon": null,
        "label": "Industrial engineering",
        "keywords": [
          "process engineering"
        ]
      },
      {
        "id": "eng-marine-eng",
        "icon": null,
        "label": "Marine engineering",
        "keywords": [
          "ships",
          "maritime"
        ]
      },
      {
        "id": "eng-aeronautical",
        "icon": null,
        "label": "Aeronautical / aviation engineering",
        "keywords": [
          "aviation"
        ]
      },
      {
        "id": "energy-mining-resources",
        "icon": null,
        "label": "Mining & natural resources",
        "keywords": [
          "quarry"
        ]
      },
      {
        "id": "energy-conservation",
        "icon": null,
        "label": "Wildlife & environmental conservation",
        "keywords": [
          "conservation officer"
        ]
      },
      {
        "id": "agri-horticulture",
        "icon": null,
        "label": "Horticulture & floriculture",
        "keywords": [
          "flower farming"
        ]
      },
      {
        "id": "agri-irrigation",
        "icon": null,
        "label": "Irrigation & farm engineering",
        "keywords": [
          "irrigation"
        ]
      },
      {
        "id": "agri-agro-processing",
        "icon": null,
        "label": "Agro-processing",
        "keywords": [
          "value addition"
        ]
      },
      {
        "id": "agri-cooperatives",
        "icon": null,
        "label": "Agricultural cooperatives",
        "keywords": [
          "farmers' cooperative"
        ]
      },
      {
        "id": "trade-plant-operator",
        "icon": null,
        "label": "Heavy machinery / plant operation",
        "keywords": [
          "excavator operator"
        ]
      },
      {
        "id": "trade-refrigeration",
        "icon": null,
        "label": "Refrigeration & AC repair",
        "keywords": [
          "fridge repair"
        ]
      },
      {
        "id": "trade-signage",
        "icon": null,
        "label": "Signage & fabrication",
        "keywords": [
          "signwriting"
        ]
      },
      {
        "id": "trade-shoemaking",
        "icon": null,
        "label": "Shoemaking & leatherwork",
        "keywords": [
          "cobbler"
        ]
      },
      {
        "id": "manuf-packaging",
        "icon": null,
        "label": "Packaging & printing",
        "keywords": [
          "printing press"
        ]
      },
      {
        "id": "manuf-plastics",
        "icon": null,
        "label": "Plastics & materials manufacturing",
        "keywords": [
          "plastics"
        ]
      },
      {
        "id": "manuf-assembly",
        "icon": null,
        "label": "Assembly & fabrication",
        "keywords": [
          "assembly worker"
        ]
      },
      {
        "id": "logi-aviation-ops",
        "icon": null,
        "label": "Aviation & airport operations",
        "keywords": [
          "airport"
        ]
      },
      {
        "id": "logi-maritime",
        "icon": null,
        "label": "Maritime & port operations",
        "keywords": [
          "shipping port"
        ]
      },
      {
        "id": "hosp-bartending",
        "icon": null,
        "label": "Bartending & mixology",
        "keywords": [
          "bartender"
        ]
      },
      {
        "id": "hosp-baking",
        "icon": null,
        "label": "Baking & pastry",
        "keywords": [
          "baker",
          "pastry chef"
        ]
      },
      {
        "id": "hosp-cruise-airline",
        "icon": null,
        "label": "Airline & cruise service",
        "keywords": [
          "flight attendant"
        ]
      },
      {
        "id": "cre-social-media-content",
        "icon": null,
        "label": "Social media content creation",
        "keywords": [
          "content creator",
          "tiktok"
        ]
      },
      {
        "id": "cre-game-design",
        "icon": null,
        "label": "Game design",
        "keywords": [
          "game developer"
        ]
      },
      {
        "id": "cre-tattoo",
        "icon": null,
        "label": "Tattoo & body art",
        "keywords": [
          "tattoo artist"
        ]
      },
      {
        "id": "sec-corrections",
        "icon": null,
        "label": "Corrections & prison services",
        "keywords": [
          "prison officer"
        ]
      },
      {
        "id": "sec-close-protection",
        "icon": null,
        "label": "Close protection / bodyguarding",
        "keywords": [
          "bodyguard"
        ]
      },
      {
        "id": "sec-disaster-response",
        "icon": null,
        "label": "Disaster & emergency response",
        "keywords": [
          "disaster management"
        ]
      },
      {
        "id": "prop-facilities",
        "icon": null,
        "label": "Facilities management",
        "keywords": [
          "facilities manager"
        ]
      },
      {
        "id": "prop-building-inspection",
        "icon": null,
        "label": "Building inspection",
        "keywords": [
          "building inspector"
        ]
      },
      {
        "id": "sci-food-science",
        "icon": null,
        "label": "Food science",
        "keywords": [
          "food scientist"
        ]
      },
      {
        "id": "sci-forensics",
        "icon": null,
        "label": "Forensic science",
        "keywords": [
          "forensics"
        ]
      },
      {
        "id": "sci-astronomy",
        "icon": null,
        "label": "Astronomy & space science",
        "keywords": [
          "astronomer"
        ]
      },
      {
        "id": "pers-makeup",
        "icon": null,
        "label": "Makeup artistry",
        "keywords": [
          "makeup artist",
          "mua"
        ]
      },
      {
        "id": "pers-nutrition-coaching",
        "icon": null,
        "label": "Wellness & nutrition coaching",
        "keywords": [
          "wellness coach"
        ]
      },
      {
        "id": "pers-pet-care",
        "icon": null,
        "label": "Pet care & grooming",
        "keywords": [
          "dog groomer",
          "pet sitter"
        ]
      },
      {
        "id": "other-havent-worked",
        "icon": null,
        "label": "I haven't worked in a specific field yet",
        "keywords": []
      },
      {
        "id": "other-not-listed",
        "icon": null,
        "label": "Something else not listed here",
        "keywords": []
      }
    ]
  },
  {
    "id": "q9",
    "sectionLabel": "Section 4",
    "type": "multi",
    "maxPicks": 2,
    "hint": "This one's reverse-signal — pick what you'd avoid, not what you want.",
    "searchable": false,
    "text": "Pick your workplace nightmare.",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q9a",
        "icon": "",
        "label": "A rigid 9-to-5"
      },
      {
        "id": "q9b",
        "icon": "",
        "label": "Spreadsheets forever"
      },
      {
        "id": "q9c",
        "icon": "",
        "label": "People all day, every day"
      },
      {
        "id": "q9d",
        "icon": "",
        "label": "Fixing broken things nobody else wants to touch"
      },
      {
        "id": "q9e",
        "icon": "",
        "label": "Shiftwork; including weekends and nights"
      },
      {
        "id": "q9f",
        "icon": "",
        "label": "Constant fieldwork"
      },
      {
        "id": "q9g",
        "icon": "",
        "label": "None of these; I'm easy"
      }
    ]
  },
  {
    "id": "q10",
    "sectionLabel": "Section 5",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "A new tool drops tomorrow that changes how your field works. Gut reaction?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q10a",
        "icon": "",
        "label": "Excited"
      },
      {
        "id": "q10b",
        "icon": "",
        "label": "Fine, I'll manage"
      },
      {
        "id": "q10c",
        "icon": "",
        "label": "Please no"
      }
    ]
  },
  {
    "id": "q11",
    "sectionLabel": "Section 5",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Do you prefer getting really good at one thing or trying out new things as they come up?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q11a",
        "icon": "",
        "label": "Getting really good at one thing"
      },
      {
        "id": "q11b",
        "icon": "",
        "label": "Trying out new things"
      },
      {
        "id": "q11c",
        "label": "A bit of both"
      }
    ]
  },
  {
    "id": "q12",
    "sectionLabel": "Section 6",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "How much does it matter to you that your next move is in a field that's actively hiring right now?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q12a",
        "icon": null,
        "label": "It's essential; I need to land somewhere in demand"
      },
      {
        "id": "q12b",
        "icon": null,
        "label": "It matters, but I'll consider a slower-growing field if it fits me well"
      },
      {
        "id": "q12c",
        "icon": null,
        "label": "I'm willing to gamble on something newer or less proven"
      }
    ]
  },
  {
    "id": "q13",
    "sectionLabel": "Section 6",
    "type": "multi",
    "maxPicks": 3,
    "hint": "Pick up to 3.",
    "searchable": false,
    "text": "Of these growing sectors, which ones could you do\"?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "grow-tech",
        "icon": null,
        "label": "Technology, software & IT"
      },
      {
        "id": "grow-data",
        "icon": null,
        "label": "Data, AI & analytics"
      },
      {
        "id": "grow-health",
        "icon": null,
        "label": "Healthcare & medical"
      },
      {
        "id": "grow-energy",
        "icon": null,
        "label": "Energy, environment & climate"
      },
      {
        "id": "grow-agri",
        "icon": null,
        "label": "Agriculture & food systems"
      },
      {
        "id": "grow-trades",
        "icon": null,
        "label": "Skilled trades & technical repair"
      },
      {
        "id": "grow-logistics",
        "icon": null,
        "label": "Transport, logistics & supply chain"
      },
      {
        "id": "grow-creative",
        "icon": null,
        "label": "Media, design, arts & entertainment"
      },
      {
        "id": "grow-science",
        "icon": null,
        "label": "Science & research"
      }
    ]
  },
  {
    "id": "q4",
    "sectionLabel": "Section 7",
    "type": "single",
    "maxPicks": 1,
    "hint": "Pulled from your Track Record answers.",
    "searchable": false,
    "text": "Scanning back over your previous roles, what came easiest to you?",
    "dynamicFromHistory": true,
    "free": false,
    "options": [
      {
        "id": "num",
        "icon": null,
        "label": "Working with numbers or data"
      },
      {
        "id": "spk",
        "icon": null,
        "label": "Talking to people and building relationships"
      },
      {
        "id": "ops",
        "icon": null,
        "label": "Organising, planning or keeping things on track"
      },
      {
        "id": "fix",
        "icon": null,
        "label": "Fixing, building or troubleshooting things"
      },
      {
        "id": "cre",
        "icon": null,
        "label": "Writing, designing or creating"
      },
      {
        "id": "led",
        "icon": null,
        "label": "Leading or being in charge of a team"
      },
      {
        "id": "tea",
        "icon": null,
        "label": "Teaching, coaching or explaining things"
      },
      {
        "id": "car",
        "icon": null,
        "label": "Caring for, or supporting people"
      }
    ]
  },
  {
    "id": "q8",
    "sectionLabel": "Section 7",
    "type": "multi",
    "maxPicks": 2,
    "hint": "Pick up to 2. If nothing fits, pick what's closest.",
    "searchable": false,
    "text": "Which of the tasks in your previous roles did you secretly enjoy; even the ones that weren't really your job?",
    "dynamicFromHistory": true,
    "free": false,
    "options": [
      {
        "id": "num",
        "icon": null,
        "label": "Working with numbers or data"
      },
      {
        "id": "spk",
        "icon": null,
        "label": "Talking to people and building relationships"
      },
      {
        "id": "ops",
        "icon": null,
        "label": "Organising, planning or keeping things on track"
      },
      {
        "id": "fix",
        "icon": null,
        "label": "Fixing, building or troubleshooting things"
      },
      {
        "id": "cre",
        "icon": null,
        "label": "Writing, designing or creating"
      },
      {
        "id": "led",
        "icon": null,
        "label": "Leading or being in charge of a team"
      },
      {
        "id": "tea",
        "icon": null,
        "label": "Teaching, coaching or explaining things"
      },
      {
        "id": "car",
        "icon": null,
        "label": "Caring for or supporting people"
      },
      {
        "id": "none",
        "icon": null,
        "label": "None of it, honestly"
      }
    ]
  },
  {
    "id": "q16",
    "sectionLabel": "Section 8",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Would relocating be on the table, or is that a hard no?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q16a",
        "icon": "",
        "label": "Yes, anywhere in Kenya"
      },
      {
        "id": "q16b",
        "icon": "",
        "label": "Yes, even abroad"
      },
      {
        "id": "q16c",
        "icon": "",
        "label": "Maybe, for the right opportunity"
      },
      {
        "id": "q16d",
        "icon": "",
        "label": "Hard no! I'm staying put"
      }
    ]
  },
  {
    "id": "q14",
    "sectionLabel": "Section 8",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Where are you based?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q14-nairobi",
        "icon": null,
        "label": "Nairobi"
      },
      {
        "id": "q14-mombasa",
        "icon": null,
        "label": "Mombasa"
      },
      {
        "id": "q14-kiambu",
        "icon": null,
        "label": "Kiambu"
      },
      {
        "id": "q14-nakuru",
        "icon": null,
        "label": "Nakuru"
      },
      {
        "id": "q14-kisumu",
        "icon": null,
        "label": "Kisumu"
      },
      {
        "id": "q14-machakos",
        "icon": null,
        "label": "Machakos"
      },
      {
        "id": "q14-kajiado",
        "icon": null,
        "label": "Kajiado"
      },
      {
        "id": "q14-uasin-gishu",
        "icon": null,
        "label": "Uasin Gishu"
      },
      {
        "id": "q14-nyeri",
        "icon": null,
        "label": "Nyeri"
      },
      {
        "id": "q14-meru",
        "icon": null,
        "label": "Meru"
      },
      {
        "id": "q14-kirinyaga",
        "icon": null,
        "label": "Kirinyaga"
      },
      {
        "id": "q14-muranga",
        "icon": null,
        "label": "Murang'a"
      },
      {
        "id": "q14-embu",
        "icon": null,
        "label": "Embu"
      },
      {
        "id": "q14-kakamega",
        "icon": null,
        "label": "Kakamega"
      },
      {
        "id": "q14-kisii",
        "icon": null,
        "label": "Kisii"
      },
      {
        "id": "q14-bungoma",
        "icon": null,
        "label": "Bungoma"
      },
      {
        "id": "q14-trans-nzoia",
        "icon": null,
        "label": "Trans Nzoia"
      },
      {
        "id": "q14-kilifi",
        "icon": null,
        "label": "Kilifi"
      },
      {
        "id": "q14-laikipia",
        "icon": null,
        "label": "Laikipia"
      },
      {
        "id": "q14-kericho",
        "icon": null,
        "label": "Kericho"
      },
      {
        "id": "q14-nandi",
        "icon": null,
        "label": "Nandi"
      },
      {
        "id": "q14-kwale",
        "icon": null,
        "label": "Kwale"
      },
      {
        "id": "q14-narok",
        "icon": null,
        "label": "Narok"
      },
      {
        "id": "q14-nyandarua",
        "icon": null,
        "label": "Nyandarua"
      },
      {
        "id": "q14-tharaka-nithi",
        "icon": null,
        "label": "Tharaka-Nithi"
      },
      {
        "id": "q14-kitui",
        "icon": null,
        "label": "Kitui"
      },
      {
        "id": "q14-makueni",
        "icon": null,
        "label": "Makueni"
      },
      {
        "id": "q14-taita-taveta",
        "icon": null,
        "label": "Taita-Taveta"
      },
      {
        "id": "q14-lamu",
        "icon": null,
        "label": "Lamu"
      },
      {
        "id": "q14-bomet",
        "icon": null,
        "label": "Bomet"
      },
      {
        "id": "q14-baringo",
        "icon": null,
        "label": "Baringo"
      },
      {
        "id": "q14-elgeyo-marakwet",
        "icon": null,
        "label": "Elgeyo-Marakwet"
      },
      {
        "id": "q14-vihiga",
        "icon": null,
        "label": "Vihiga"
      },
      {
        "id": "q14-busia",
        "icon": null,
        "label": "Busia"
      },
      {
        "id": "q14-siaya",
        "icon": null,
        "label": "Siaya"
      },
      {
        "id": "q14-homa-bay",
        "icon": null,
        "label": "Homa Bay"
      },
      {
        "id": "q14-migori",
        "icon": null,
        "label": "Migori"
      },
      {
        "id": "q14-nyamira",
        "icon": null,
        "label": "Nyamira"
      },
      {
        "id": "q14-garissa",
        "icon": null,
        "label": "Garissa"
      },
      {
        "id": "q14-turkana",
        "icon": null,
        "label": "Turkana"
      },
      {
        "id": "q14-west-pokot",
        "icon": null,
        "label": "West Pokot"
      },
      {
        "id": "q14-samburu",
        "icon": null,
        "label": "Samburu"
      },
      {
        "id": "q14-marsabit",
        "icon": null,
        "label": "Marsabit"
      },
      {
        "id": "q14-isiolo",
        "icon": null,
        "label": "Isiolo"
      },
      {
        "id": "q14-mandera",
        "icon": null,
        "label": "Mandera"
      },
      {
        "id": "q14-wajir",
        "icon": null,
        "label": "Wajir"
      },
      {
        "id": "q14-tana-river",
        "icon": null,
        "label": "Tana River"
      }
    ]
  },
  {
    "id": "q15",
    "sectionLabel": "Section 8",
    "type": "single",
    "maxPicks": 1,
    "hint": "Traffic is a factor.",
    "searchable": false,
    "text": "Be honest, how far are you willing to commute for the right role?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q15a",
        "icon": "",
        "label": "Only within my immediate area"
      },
      {
        "id": "q15b",
        "icon": "",
        "label": "Up to an hour each way"
      },
      {
        "id": "q15c",
        "icon": "",
        "label": "I'll commute far for the right role"
      },
      {
        "id": "q15d",
        "icon": "",
        "label": "Doesn't matter, I want remote work"
      }
    ]
  },
  {
    "id": "q17",
    "sectionLabel": "Section 8",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Do you know anyone currently working in a field you're curious about?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q17a",
        "icon": null,
        "label": "Yes, several people"
      },
      {
        "id": "q17b",
        "icon": null,
        "label": "Yes, one or two"
      },
      {
        "id": "q17c",
        "icon": null,
        "label": "Not really"
      },
      {
        "id": "q17d",
        "icon": null,
        "label": "Not at all"
      }
    ]
  },
  {
    "id": "q18",
    "sectionLabel": "Section 8",
    "type": "single",
    "maxPicks": 1,
    "hint": null,
    "searchable": false,
    "text": "Reliable internet / remote-work setup?",
    "dynamicFromHistory": false,
    "free": false,
    "options": [
      {
        "id": "q18a",
        "icon": "",
        "label": "Yes, and I'm open to remote roles with companies outside Kenya too"
      },
      {
        "id": "q18b",
        "icon": "",
        "label": "Yes, but I'd rather work with local employers"
      },
      {
        "id": "q18c",
        "icon": "",
        "label": "Sometimes / limited"
      },
      {
        "id": "q18d",
        "icon": "",
        "label": "Very limited or unreliable"
      }
    ]
  }
];
