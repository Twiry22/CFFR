/**
 * "What did you study?" — gates certain professional-qualification careers,
 * and gives a small Aptitude head start toward related sectors.
 * Gate codes: acct · eng · arch · health · pharm · vet · edu · law
 */
const STUDY_FIELDS = [
  { id: "business", label: "Business, commerce or management",                 gates: ["acct"],          sectors: ["business","finance","sales"] },
  { id: "acctfin",  label: "Accounting, finance or economics",                 gates: ["acct"],          sectors: ["finance","business","data"] },
  { id: "stats",    label: "Statistics, mathematics or data",                  gates: [],                sectors: ["data","finance","science"] },
  { id: "it",       label: "Computer science, IT or software",                 gates: [],                sectors: ["tech","data"] },
  { id: "eng",      label: "Engineering",                                      gates: ["eng"],           sectors: ["eng","energy","tech","manuf"] },
  { id: "arch",     label: "Architecture, surveying or built environment",     gates: ["arch","eng"],    sectors: ["eng","property"] },
  { id: "health",   label: "Medicine, nursing, pharmacy or health sciences",   gates: ["health","pharm"],sectors: ["health","science","social"] },
  { id: "agri",     label: "Agriculture, veterinary or food science",          gates: ["vet"],           sectors: ["agri","science"] },
  { id: "env",      label: "Environmental, natural or physical sciences",      gates: [],                sectors: ["science","energy","agri"] },
  { id: "edu",      label: "Education",                                        gates: ["edu"],           sectors: ["edu","social"] },
  { id: "law",      label: "Law or governance",                                gates: ["law"],           sectors: ["law","social"] },
  { id: "social",   label: "Social sciences, humanities or development",       gates: [],                sectors: ["social","law","edu"] },
  { id: "media",    label: "Media, journalism or communication",               gates: [],                sectors: ["creative","sales"] },
  { id: "art",      label: "Art, design or performing arts",                   gates: [],                sectors: ["creative"] },
  { id: "hosp",     label: "Hospitality, tourism or events",                   gates: [],                sectors: ["hospitality","personal"] },
  { id: "trade",    label: "Technical or vocational trade (TVET)",             gates: [],                sectors: ["trades","manuf","eng","energy"] },
  { id: "logi",     label: "Supply chain, logistics or transport",             gates: [],                sectors: ["logistics","business"] },
  { id: "none",     label: "None of these / no formal study",                  gates: [],                sectors: [] },
];
module.exports = { STUDY_FIELDS };
