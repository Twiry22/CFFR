/**
 * ScoreBreakdown Component  v2.1
 * v2.0 — Weight labels added (25%/25%/25%/15%/10%)
 * v2.1 — Weight labels removed from UI (scores only)
 */

const SCORE_LABELS = {
  marketDemand:    { label: "Market Demand"    },
  futureRelevance: { label: "Future Relevance" },
  aptitude:        { label: "Aptitude"         },
  interest:        { label: "Interest"         },
  accessibility:   { label: "Accessibility"    },
};

const ScoreBreakdown = ({ scoreBreakdown }) => {
  return (
    <div style={{ marginTop: "24px", marginBottom: "24px" }}>

      <p style={{
        fontFamily:    "var(--font-display)",
        fontWeight:    "700",
        fontSize:      "0.78rem",
        color:         "var(--text-mid)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom:  "16px",
      }}>
        Score Breakdown
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {Object.entries(SCORE_LABELS).map(([key, meta]) => {
          const score = scoreBreakdown[key] || 0;

          return (
            <div key={key}>
              <div style={{
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "center",
                marginBottom:   "6px",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "0.85rem",
                  fontWeight: "500",
                  color:      "var(--text-dark)",
                }}>
                  {meta.label}
                </span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize:   "0.85rem",
                  fontWeight: "700",
                  color:      score >= 70
                    ? "var(--success)"
                    : score >= 40
                    ? "var(--royal-blue)"
                    : "var(--text-light)",
                }}>
                  {score}/100
                </span>
              </div>

              <div style={{
                background:   "var(--royal-blue-pale)",
                borderRadius: "999px",
                height:       "8px",
                overflow:     "hidden",
              }}>
                <div style={{
                  width:        `${score}%`,
                  height:       "100%",
                  borderRadius: "999px",
                  background:   score >= 70
                    ? "linear-gradient(90deg, #16A34A, #22C55E)"
                    : "linear-gradient(90deg, var(--royal-blue-light), var(--royal-blue))",
                  transition:   "width 1.2s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ScoreBreakdown;
