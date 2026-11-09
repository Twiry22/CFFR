/**
 * CFFR Professional — Sectors  v2.1  (adds shiftwork + fieldwork dealbreaker traits)
 */

const SECTORS_AS_OF = "2026-09 (estimate — verify against real labour-market data)";

const SECTORS = {
  tech:        { label: "Technology, software & IT",              demand: 4, growth: 5, related: ["data","creative","eng"],           defaults: { t:5, e:.7, h:4, r:.8,  st:3, nu:3, pe:2, fx:3, sw:1, fw:1, m:3 } },
  data:        { label: "Data, AI & analytics",                   demand: 4, growth: 5, related: ["tech","finance","science"],        defaults: { t:5, e:.8, h:4, r:.8,  st:3, nu:5, pe:2, fx:2, sw:1, fw:1, m:4 } },
  finance:     { label: "Finance, banking, insurance & accounting", demand: 4, growth: 3, related: ["business","data","law"],         defaults: { t:4, e:.4, h:4, r:.3,  st:4, nu:5, pe:3, fx:1, sw:1, fw:1, m:4 } },
  business:    { label: "Business, management & administration",  demand: 4, growth: 3, related: ["finance","sales","logistics"],     defaults: { t:3, e:.3, h:4, r:.3,  st:4, nu:3, pe:4, fx:1, sw:1, fw:2, m:4 } },
  sales:       { label: "Sales, marketing & retail",              demand: 5, growth: 3, related: ["business","creative","property"],  defaults: { t:3, e:.3, h:3, r:.25, st:2, nu:2, pe:5, fx:1, sw:4, fw:3, m:2 } },
  health:      { label: "Healthcare & medical",                   demand: 5, growth: 4, related: ["science","social","personal"],     defaults: { t:3, e:.3, h:2, r:0,   st:4, nu:2, pe:5, fx:3, sw:5, fw:2, m:3 } },
  edu:         { label: "Education & training",                   demand: 3, growth: 3, related: ["social","creative","personal"],    defaults: { t:3, e:.3, h:2, r:.15, st:4, nu:1, pe:5, fx:1, sw:1, fw:1, m:3 } },
  social:      { label: "Social services, NGOs & development",    demand: 3, growth: 3, related: ["edu","health","law"],              defaults: { t:2, e:.2, h:3, r:.15, st:3, nu:2, pe:5, fx:2, sw:2, fw:4, m:4 } },
  law:         { label: "Law, governance & public service",       demand: 2, growth: 3, related: ["finance","social","security"],     defaults: { t:3, e:.2, h:3, r:.2,  st:4, nu:2, pe:4, fx:1, sw:1, fw:1, m:4 } },
  eng:         { label: "Engineering & construction",             demand: 4, growth: 3, related: ["trades","energy","property"],     defaults: { t:4, e:.4, h:3, r:.1,  st:3, nu:3, pe:2, fx:4, sw:2, fw:4, m:4 } },
  energy:      { label: "Energy, environment & climate",          demand: 4, growth: 5, related: ["eng","science","agri"],            defaults: { t:4, e:.7, h:2, r:.05, st:3, nu:3, pe:2, fx:4, sw:2, fw:4, m:3 } },
  agri:        { label: "Agriculture & food systems",             demand: 5, growth: 4, related: ["science","energy","logistics"],    defaults: { t:3, e:.5, h:1, r:0,   st:2, nu:2, pe:3, fx:3, sw:4, fw:5, m:2 } },
  trades:      { label: "Skilled trades & technical repair",      demand: 5, growth: 4, related: ["eng","manuf","energy"],            defaults: { t:2, e:.2, h:2, r:0,   st:2, nu:1, pe:3, fx:5, sw:2, fw:4, m:2 } },
  manuf:       { label: "Manufacturing & industry",               demand: 3, growth: 3, related: ["trades","eng","logistics"],        defaults: { t:3, e:.3, h:3, r:0,   st:4, nu:2, pe:2, fx:4, sw:3, fw:3, m:2 } },
  logistics:   { label: "Transport, logistics & supply chain",    demand: 5, growth: 4, related: ["business","manuf","agri"],         defaults: { t:4, e:.4, h:3, r:.05, st:3, nu:2, pe:3, fx:3, sw:3, fw:4, m:2 } },
  hospitality: { label: "Hospitality, tourism & events",          demand: 4, growth: 3, related: ["personal","sales","creative"],     defaults: { t:2, e:.2, h:3, r:0,   st:3, nu:1, pe:5, fx:2, sw:5, fw:2, m:2 } },
  creative:    { label: "Media, design, arts & entertainment",    demand: 3, growth: 4, related: ["sales","tech","edu"],              defaults: { t:4, e:.5, h:4, r:.6,  st:1, nu:1, pe:3, fx:1, sw:2, fw:2, m:2 } },
  security:    { label: "Security, defence & emergency services", demand: 4, growth: 3, related: ["law","health","logistics"],        defaults: { t:2, e:.2, h:2, r:0,   st:4, nu:1, pe:3, fx:2, sw:5, fw:3, m:2 } },
  property:    { label: "Real estate & property",                 demand: 3, growth: 3, related: ["eng","sales","finance"],           defaults: { t:3, e:.3, h:4, r:.1,  st:2, nu:2, pe:5, fx:1, sw:2, fw:3, m:3 } },
  science:     { label: "Science & research",                     demand: 2, growth: 4, related: ["data","health","energy"],          defaults: { t:4, e:.5, h:3, r:.2,  st:3, nu:4, pe:2, fx:2, sw:1, fw:3, m:4 } },
  personal:    { label: "Beauty, fitness & personal services",    demand: 4, growth: 3, related: ["hospitality","health","sales"],    defaults: { t:2, e:.2, h:2, r:0,   st:2, nu:1, pe:5, fx:1, sw:4, fw:1, m:1 } },
};

module.exports = { SECTORS, SECTORS_AS_OF };
