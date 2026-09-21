/**
 * questions.pr.js
 * CFFR Professional — question data.
 * Weights (for reference, applied in scorer.pr.js, not here):
 *   Market Demand 25 · Accessibility 20 · Experience 18 · Aptitude 15 ·
 *   Interest 12 · Future Relevance 10
 */

export const SECTORS = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Agriculture & Agribusiness",
  "Manufacturing",
  "Creative & Media",
  "Education",
  "Construction & Real Estate",
  "Logistics & Supply Chain",
  "Hospitality & Tourism",
  "Public Service / NGO",
  "Sales & Marketing",
];

export const WORK_ENTRY_TYPES = [
  "Full-time",
  "Part-time",
  "Internship",
  "Attachment",
  "Volunteer",
  "Freelance / Gig",
];

// ── Section 1: Basics — context, not directly scored ────────────────────────
export const BASICS = [
  {
    id: "qualification_level",
    number: 1,
    type: "single",
    question: "What's the highest level of education you've completed?",
    options: [
      { label: "Certificate", value: "certificate" },
      { label: "Diploma", value: "diploma" },
      { label: "Bachelor's degree", value: "bachelors" },
      { label: "Master's or higher", value: "masters_plus" },
      { label: "Still pursuing", value: "in_progress" },
      { label: "None of these quite fit", value: "other" },
    ],
  },
  {
    id: "qualification_field",
    number: 2,
    type: "text",
    question: "What did you study, or what's your area of qualification?",
    placeholder: "e.g. Business Administration, Electrical Engineering...",
  },
  {
    id: "current_status",
    number: 3,
    type: "single",
    question: "Where are things at for you right now?",
    options: [
      { label: "Employed", value: "employed" },
      { label: "Self-employed", value: "self_employed" },
      { label: "Between roles", value: "between_roles" },
      { label: "Still job hunting", value: "job_hunting" },
      { label: "It's complicated", value: "complicated" },
    ],
  },
];

// ── Sections 3–7: factor-tagged questions ────────────────────────────────────
export const FACTOR_QUESTIONS = [

  // Aptitude — reflective, grounded in what they described in work history
  {
    id: "apt_easiest",
    factor: "aptitude",
    type: "text",
    question: "Scanning back over the roles you just told us about — what came easiest to you?",
    placeholder: "Doesn't have to be dramatic. Even 'organizing chaos' counts.",
  },
  {
    id: "apt_go_to",
    factor: "aptitude",
    type: "text",
    question: "What's a task people annoyingly always come to you for?",
    placeholder: "Everyone has one. Yes, even you.",
  },
  {
    id: "apt_effortless",
    factor: "aptitude",
    type: "text",
    question: "Think of a time work felt effortless — like you were cheating somehow. What were you doing?",
  },

  // Interest
  {
    id: "int_sectors",
    factor: "interest",
    type: "multi",
    maxPicks: 3,
    question: "If money and logistics vanished overnight, which of these would you actually want to spend your Monday on?",
    hint: "Pick up to 3.",
    options: SECTORS.map((s) => ({ label: s, value: s.toLowerCase().replace(/[^a-z]+/g, "_") })),
  },
  {
    id: "int_secret_enjoy",
    factor: "interest",
    type: "text",
    question: "Which of your past tasks did you secretly enjoy, even if it wasn't in your job description?",
  },
  {
    id: "int_villain",
    factor: "interest",
    type: "single",
    question: "Pick your career villain.",
    options: [
      { label: "Rigid 9-5", value: "rigid_schedule" },
      { label: "Spreadsheets forever", value: "spreadsheets" },
      { label: "People all day long", value: "people_all_day" },
      { label: "Fixing broken things nobody else wants to touch", value: "fixing_things" },
    ],
  },

  // Future Relevance
  {
    id: "fr_new_tool_reaction",
    factor: "futureRelevance",
    type: "single",
    question: "A new tool drops tomorrow that changes how your field works. Gut reaction?",
    options: [
      { label: "Excited", value: "excited" },
      { label: "Fine, I'll manage", value: "neutral" },
      { label: "Please no", value: "resistant" },
    ],
  },
  {
    id: "fr_mastery_vs_wave",
    factor: "futureRelevance",
    type: "single",
    question: "Deep mastery of one craft, or riding the wave of something new and still forming — which pulls you more?",
    options: [
      { label: "Deep mastery of one craft", value: "mastery" },
      { label: "Riding something new and still forming", value: "emerging" },
    ],
  },

  // Market Demand
  {
    id: "md_perceived_hiring",
    factor: "marketDemand",
    type: "multi",
    maxPicks: 3,
    question: "Which industries do you think are actually hiring right now in Kenya?",
    hint: "Pick up to 3. This is cross-checked against real data, not just your guess.",
    options: SECTORS.map((s) => ({ label: s, value: s.toLowerCase().replace(/[^a-z]+/g, "_") })),
  },
  {
    id: "md_could_do_that",
    factor: "marketDemand",
    type: "multi",
    maxPicks: 3,
    question: "Of the growing sectors we just showed data on, which ones make you go 'huh, I could actually do that'?",
    hint: "Populated dynamically from live sector-growth data — placeholder options below until that's wired in.",
    options: SECTORS.map((s) => ({ label: s, value: s.toLowerCase().replace(/[^a-z]+/g, "_") })),
  },

  // Accessibility
  {
    id: "acc_location",
    factor: "accessibility",
    type: "county",
    question: "Where are you based?",
  },
  {
    id: "acc_commute",
    factor: "accessibility",
    type: "single",
    question: "Be honest — how far are you willing to commute for the right role?",
    options: [
      { label: "Same neighborhood only", value: "same_area" },
      { label: "Anywhere in my city/town", value: "same_city" },
      { label: "Nearby towns, within reason", value: "nearby" },
      { label: "Traffic is a factor, but I'll manage", value: "willing_far" },
    ],
  },
  {
    id: "acc_relocate",
    factor: "accessibility",
    type: "single",
    question: "Would relocating be on the table, or is that a hard no?",
    options: [
      { label: "Yes, open to it", value: "yes" },
      { label: "Maybe, for the right opportunity", value: "maybe" },
      { label: "Hard no", value: "no" },
    ],
  },
  {
    id: "acc_network",
    factor: "accessibility",
    type: "single",
    question: "Do you know anyone currently working in a field you're curious about?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Somewhat / a loose connection", value: "somewhat" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "acc_remote_setup",
    factor: "accessibility",
    type: "single",
    question: "Reliable internet / remote-work setup?",
    options: [
      { label: "Yes, solid setup", value: "yes" },
      { label: "Sometimes / inconsistent", value: "sometimes" },
      { label: "What's Wi-Fi", value: "no" },
    ],
  },
];

export default FACTOR_QUESTIONS;
