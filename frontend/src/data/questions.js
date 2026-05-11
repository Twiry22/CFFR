/**
 * CFFR Questions  v3.1
 * ─────────────────────────────────────────────────────────────────────────────
 * v2.0 — Q11 added (KCSE cluster points, skippable)
 * v3.0 — 4 new career spaces in Q7:
 * v3.1 — Q7 education label updated to "Education, Teaching & Community Development"
 *           Sports, Fitness & Recreation
 *           Hospitality, Tourism & Events
 *           Automotive, Mechanics & Logistics
 *           Beauty, Hair & Wellness
 *         Q1 & Q2: Physical Education now a visible option
 *         Q3: Expanded language to surface hands-on practical paths
 *         Q4: "Hands-on practical" description made more specific
 */

const QUESTIONS = [
  // ── Q1: Subjects enjoyed ──────────────────────────────────────────────────
  {
    id: "q1", number: 1, type: "multi", maxPicks: 3,
    question: "Which subjects did you enjoy the most in school?",
    hint: "Pick up to 3.",
    options: [
      { label: "Mathematics",          value: "mathematics" },
      { label: "Biology",              value: "biology" },
      { label: "Chemistry",            value: "chemistry" },
      { label: "Physics",              value: "physics" },
      { label: "History & Government", value: "history_government" },
      { label: "Geography",            value: "geography" },
      { label: "CRE / IRE",            value: "cre_ire" },
      { label: "Business Studies",     value: "business_studies" },
      { label: "Agriculture",          value: "agriculture" },
      { label: "Computer Studies / ICT", value: "computer_ict" },
      { label: "Home Science",         value: "home_science" },
      { label: "Art & Design",         value: "art_design" },
      { label: "Creative Arts",        value: "creative_arts" },
      { label: "Physical Education",   value: "physical_education" },
      { label: "English",              value: "english" },
      { label: "Kiswahili",            value: "kiswahili" },
    ],
  },

  // ── Q2: Subjects performed best in ───────────────────────────────────────
  {
    id: "q2", number: 2, type: "multi", maxPicks: 3,
    question: "Which subjects did you perform best in?",
    hint: "Pick up to 3.",
    options: [
      { label: "Mathematics",          value: "mathematics" },
      { label: "Biology",              value: "biology" },
      { label: "Chemistry",            value: "chemistry" },
      { label: "Physics",              value: "physics" },
      { label: "History & Government", value: "history_government" },
      { label: "Geography",            value: "geography" },
      { label: "CRE / IRE",            value: "cre_ire" },
      { label: "Business Studies",     value: "business_studies" },
      { label: "Agriculture",          value: "agriculture" },
      { label: "Computer Studies / ICT", value: "computer_ict" },
      { label: "Home Science",         value: "home_science" },
      { label: "Art & Design",         value: "art_design" },
      { label: "Creative Arts",        value: "creative_arts" },
      { label: "Physical Education",   value: "physical_education" },
      { label: "English",              value: "english" },
      { label: "Kiswahili",            value: "kiswahili" },
    ],
  },

  // ── Q3: Activity preference ───────────────────────────────────────────────
  {
    id: "q3", number: 3, type: "dual", maxPicks: 2,
    question: "Which of these feels most like you?",
    hint: "Pick 1 — or 2 if you're genuinely torn.",
    options: [
      {
        label: "I enjoy working with people, serving them or making a difference in their lives",
        value: "people_difference",
      },
      {
        label: "I enjoy solving problems, asking questions and figuring out how things work",
        value: "solving_figuring",
      },
      {
        label: "I enjoy building, making or fixing things with my hands, or expressing ideas creatively",
        value: "creating_building",
      },
    ],
  },

  // ── Q4: Personality ───────────────────────────────────────────────────────
  {
    id: "q4", number: 4, type: "dual", maxPicks: 2,
    question: "Which sentence describes you best?",
    hint: "Pick 1 — or 2 if both feel equally true right now.",
    options: [
      { label: "I love asking why and figuring out how things work",                    value: "curious_analytical" },
      { label: "I express myself through art, design, style, writing or performance",   value: "creative_expressive" },
      { label: "I enjoy talking to people, listening, hosting and helping them",        value: "caring_social" },
      { label: "I prefer working with my hands and learning by doing, not just theory", value: "hands_on_practical" },
      { label: "I like making plans, setting goals and keeping things organised",       value: "organized_goal_setter" },
      { label: "I care deeply about the environment, animals and the world around me",  value: "environmental_caring" },
    ],
  },

  // ── Q5: Job values ────────────────────────────────────────────────────────
  {
    id: "q5", number: 5, type: "dual", maxPicks: 2,
    question: "When you imagine your future job, what matters most to you?",
    hint: "Pick 1 — or 2 if two things feel equally important.",
    options: [
      { label: "Earning a good income and being financially stable", value: "good_income" },
      { label: "Making a difference in people's lives",              value: "making_difference" },
      { label: "Building, creating, fixing or inventing something real", value: "building_creating" },
      { label: "Expressing yourself creatively through your work",   value: "creative_expression" },
      { label: "Being in a leadership or decision-making role",      value: "leadership_decisions" },
      { label: "Discovering new knowledge through research",         value: "research_discovery" },
    ],
  },

  // ── Q6: Tech comfort ──────────────────────────────────────────────────────
  {
    id: "q6", number: 6, type: "single", maxPicks: 1,
    question: "How comfortable are you with technology and digital tools?",
    hint: "Pick one.",
    options: [
      { label: "Not comfortable — I mostly avoid them",                          value: "1" },
      { label: "Basic — I can use a phone and social media",                     value: "2" },
      { label: "Moderate — I use apps and Google and can figure things out",     value: "3" },
      { label: "Confident — I am comfortable with computers and learning tools", value: "4" },
      { label: "Very confident — I code, edit videos or build things digitally", value: "5" },
    ],
  },

  // ── Q7: Career spaces — NOW 12 options ───────────────────────────────────
  {
    id: "q7", number: 7, type: "multi", maxPicks: 3,
    question: "Which of these areas sounds most exciting to you as a future career space?",
    hint: "Pick up to 3.",
    options: [
      { label: "Climate Change, Renewable Energy & Environment",      value: "climate_renewable_energy" },
      { label: "Healthcare, Medicine & Mental Health",                value: "healthcare_medicine_mental_health" },
      { label: "Digital Media, Content Creation & Design",            value: "digital_media_content_design" },
      { label: "Modern Agribusiness & Food Technology",               value: "modern_agribusiness_food_tech" },
      { label: "Finance, Banking & Entrepreneurship",                 value: "finance_banking_entrepreneurship" },
      { label: "Law, Policy & Governance",                            value: "law_policy_governance" },
      { label: "Artificial Intelligence, Data & Technology",          value: "ai_data_technology" },
      { label: "Education, Teaching & Community Development",         value: "education_community_development" },
      { label: "Sports, Fitness & Recreation",                        value: "sports_fitness_recreation" },
      { label: "Hospitality, Tourism & Events",                       value: "hospitality_tourism_events" },
      { label: "Automotive, Mechanics & Logistics",                   value: "automotive_logistics_trades" },
      { label: "Beauty, Hair & Wellness",                             value: "beauty_wellness_personal_care" },
    ],
  },

  // ── Q8: Future mindset ────────────────────────────────────────────────────
  {
    id: "q8", number: 8, type: "dual", maxPicks: 2,
    question: "Which statement feels most true to you?",
    hint: "Pick 1 — or 2 if you genuinely feel both.",
    options: [
      { label: "I am ready to keep learning as the world changes",           value: "keep_learning" },
      { label: "I prefer a well-established career path",                    value: "prefer_established" },
      { label: "I want to work online or internationally from Kenya",        value: "work_online_internationally" },
      { label: "I want to work locally and see direct community impact",     value: "work_within_community" },
      { label: "I want a career that blends technology with helping people", value: "tech_human_connection" },
      { label: "I want to be at the cutting edge of innovation",             value: "cutting_edge" },
    ],
  },

  // ── Q9: County ────────────────────────────────────────────────────────────
  {
    id: "q9", number: 9, type: "county", maxPicks: 1,
    question: "Which county is your school located in?",
    hint: "Type to search or scroll through all 47 counties.",
    options: [
      { label: "Baringo", value: "Baringo" }, { label: "Bomet", value: "Bomet" },
      { label: "Bungoma", value: "Bungoma" }, { label: "Busia", value: "Busia" },
      { label: "Elgeyo-Marakwet", value: "Elgeyo-Marakwet" }, { label: "Embu", value: "Embu" },
      { label: "Garissa", value: "Garissa" }, { label: "Homa Bay", value: "Homa Bay" },
      { label: "Isiolo", value: "Isiolo" }, { label: "Kajiado", value: "Kajiado" },
      { label: "Kakamega", value: "Kakamega" }, { label: "Kericho", value: "Kericho" },
      { label: "Kiambu", value: "Kiambu" }, { label: "Kilifi", value: "Kilifi" },
      { label: "Kirinyaga", value: "Kirinyaga" }, { label: "Kisii", value: "Kisii" },
      { label: "Kisumu", value: "Kisumu" }, { label: "Kitui", value: "Kitui" },
      { label: "Kwale", value: "Kwale" }, { label: "Laikipia", value: "Laikipia" },
      { label: "Lamu", value: "Lamu" }, { label: "Machakos", value: "Machakos" },
      { label: "Makueni", value: "Makueni" }, { label: "Mandera", value: "Mandera" },
      { label: "Marsabit", value: "Marsabit" }, { label: "Meru", value: "Meru" },
      { label: "Migori", value: "Migori" }, { label: "Mombasa", value: "Mombasa" },
      { label: "Muranga", value: "Muranga" }, { label: "Nairobi", value: "Nairobi" },
      { label: "Nakuru", value: "Nakuru" }, { label: "Nandi", value: "Nandi" },
      { label: "Narok", value: "Narok" }, { label: "Nyamira", value: "Nyamira" },
      { label: "Nyandarua", value: "Nyandarua" }, { label: "Nyeri", value: "Nyeri" },
      { label: "Samburu", value: "Samburu" }, { label: "Siaya", value: "Siaya" },
      { label: "Taita-Taveta", value: "Taita-Taveta" }, { label: "Tana River", value: "Tana River" },
      { label: "Tharaka-Nithi", value: "Tharaka-Nithi" }, { label: "Trans-Nzoia", value: "Trans-Nzoia" },
      { label: "Turkana", value: "Turkana" }, { label: "Uasin Gishu", value: "Uasin Gishu" },
      { label: "Vihiga", value: "Vihiga" }, { label: "Wajir", value: "Wajir" },
      { label: "West Pokot", value: "West Pokot" },
    ],
  },

  // ── Q10: Budget ───────────────────────────────────────────────────────────
  {
    id: "q10", number: 10, type: "single", maxPicks: 1,
    question: "Roughly how much can your family set aside per year for your education?",
    hint: "Pick one.",
    options: [
      { label: "Less than KES 30,000 per year",                       value: "under_30k" },
      { label: "KES 30,000 – 80,000 per year",                        value: "30k_80k" },
      { label: "KES 80,000 – 150,000 per year",                       value: "80k_150k" },
      { label: "KES 150,000 – 300,000 per year",                      value: "150k_300k" },
      { label: "More than KES 300,000 per year",                      value: "over_300k" },
      { label: "I am not sure / I would like to explore scholarships", value: "scholarships" },
    ],
  },

  // ── Q11: KCSE Cluster Points (optional / skippable) ───────────────────────
  {
    id: "q11", number: 11, type: "kcse", maxPicks: 1,
    question: "Have you sat your KCSE? If yes, what were your cluster points?",
    hint: "This helps us suggest schools that match your qualification. Skip if you haven't sat KCSE yet.",
    skippable: true,
    options: [
      { label: "Above 60 points",    value: "above_60",  universities: true,  tvet: false },
      { label: "50 – 60 points",     value: "50_60",     universities: true,  tvet: false },
      { label: "40 – 50 points",     value: "40_50",     universities: true,  tvet: false },
      { label: "30 – 40 points",     value: "30_40",     universities: true,  tvet: false },
      { label: "20 – 30 points",     value: "20_30",     universities: false, tvet: true  },
      { label: "10 – 20 points",     value: "10_20",     universities: false, tvet: true  },
      { label: "Below 10 points",    value: "below_10",  universities: false, tvet: true  },
    ],
  },
];

export default QUESTIONS;
