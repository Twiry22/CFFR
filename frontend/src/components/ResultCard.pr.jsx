/**
 * ResultCard.pr.jsx  v1.0
 * CFFR Professional: one career match from scorer.pr.js `recommendations[]`.
 * Separate from the High School ResultCard.jsx, which is untouched.
 */

import { useState } from "react";

const C = {
  brown:     "var(--pro-brown, #92400E)",
  brownDark: "var(--pro-brown-dark, #3E2A1D)",
  nude:      "var(--pro-nude, #E8D5C0)",
  nudePale:  "var(--pro-nude-pale, #F5EBDF)",
  border:    "var(--pro-border, #E7DCCF)",
  textMid:   "var(--pro-text-mid, #6B5B4E)",
  textLight: "var(--pro-text-light, #9A8878)",
};

// Same order and weights as scorer.pr.js
const FACTORS = [
  { key: "marketDemand",    label: "Market demand",       weight: "25%" },
  { key: "futureRelevance", label: "Future relevance",    weight: "25%" },
  { key: "aptitude",        label: "Aptitude",            weight: "20%" },
  { key: "experience",      label: "Previous experience", weight: "20%" },
  { key: "accessibility",   label: "Accessibility",       weight: "5%"  },
  { key: "interest",        label: "Interest",            weight: "5%"  },
];

const RANK_LABEL = { 1: "Top match", 2: "Second match", 3: "Third match" };

const Label = ({ children }) => (
  <div style={{
    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.78rem",
    color: C.brownDark, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "8px",
  }}>
    {children}
  </div>
);

const ResultCard = ({ rec }) => {
  const [open, setOpen] = useState(false);
  const isTop = rec.rank === 1;
  // When the scorer couldn't narrow it to one career, specificCareer is the sector name.
  const sectorOnly = rec.specificCareer === rec.sectorName;

  return (
    <article style={{
      background: "#FFFFFF", borderRadius: "14px", padding: "24px",
      border: `2px solid ${isTop ? C.brown : C.border}`,
    }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            display: "inline-block", background: isTop ? C.brown : C.nudePale,
            color: isTop ? "#FBF7F1" : C.brown, borderRadius: "6px", padding: "3px 10px",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.04em", marginBottom: "10px",
          }}>
            {RANK_LABEL[rec.rank] || `Match ${rec.rank}`}
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, color: C.brownDark,
            fontSize: "clamp(1.15rem, 3.5vw, 1.4rem)", lineHeight: 1.25, margin: 0,
          }}>
            {rec.specificCareer}
          </h3>
          <div style={{ fontSize: "0.85rem", color: C.textLight, marginTop: "4px" }}>
            {sectorOnly ? "A whole sector worth exploring" : rec.sectorName}
            {" · "}
            <span style={{ color: C.brown, fontWeight: 600 }}>{rec.outlook}</span>
          </div>
        </div>

        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            border: `4px solid ${isTop ? C.brown : C.nude}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: C.brownDark,
          }}>
            {rec.matchScore}
          </div>
          <div style={{ fontSize: "0.7rem", color: C.textLight, marginTop: "4px" }}>match score</div>
        </div>
      </div>

      {/* Why it fits */}
      <p style={{ fontSize: "0.93rem", color: C.textMid, lineHeight: 1.7, margin: "18px 0 0" }}>
        {rec.whyItFitsYou}
      </p>

      {/* Careers inside the sector */}
      {rec.alsoConsider?.length > 0 && (
        <div style={{ marginTop: "18px" }}>
          <Label>{sectorOnly ? "Careers to explore" : "Also consider"}</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {rec.alsoConsider.map((c) => (
              <span key={c} style={{
                background: C.nudePale, color: C.brownDark, borderRadius: "999px",
                padding: "5px 12px", fontSize: "0.83rem",
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Careers they picked here that need a qualification */}
      {rec.needsQualification?.length > 0 && (
        <div style={{
          marginTop: "16px", padding: "12px 14px", borderRadius: "8px",
          background: C.nudePale, fontSize: "0.85rem", color: C.brownDark, lineHeight: 1.6,
        }}>
          {rec.needsQualification.map((q) => (
            <div key={q.id}><strong>{q.label}</strong> needs {q.requires}.</div>
          ))}
        </div>
      )}

      {/* Score breakdown */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          marginTop: "18px", background: "none", border: "none", padding: 0, cursor: "pointer",
          color: C.brown, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem",
        }}
      >
        {open ? "Hide how this was scored" : "See how this was scored"}
      </button>

      {open && (
        <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {FACTORS.map((f) => {
            const v = rec.scoreBreakdown?.[f.key] ?? 0;
            return (
              <div key={f.key}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "0.8rem", color: C.textMid, marginBottom: "4px",
                }}>
                  <span>{f.label} <span style={{ color: C.textLight }}>({f.weight})</span></span>
                  <span style={{ fontWeight: 700, color: C.brownDark }}>{v}</span>
                </div>
                <div style={{ height: "6px", background: C.nudePale, borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: `${v}%`, height: "100%", background: C.brown, borderRadius: "999px" }} />
                </div>
              </div>
            );
          })}
          {rec.dealbreakers?.length > 0 && (
            <div style={{ fontSize: "0.8rem", color: C.textLight, lineHeight: 1.6 }}>
              Score lowered because this field often involves {rec.dealbreakers.join(" and ")}.
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default ResultCard;
