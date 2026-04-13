/**
 * ScoreBreakdown Component
 * Updated weights: Market 25%, Future 25%, Aptitude 20%, Interest 20%, Access 10%
 */

const SCORE_LABELS = {
  marketDemand:    { label: "Market Demand", weight: "25%" },
  futureRelevance: { label: "Future Relevance", weight: "25%" },
  aptitude:        { label: "Aptitude", weight: "20%" },
  interest:        { label: "Interest", weight: "20%" },
  accessibility:   { label: "Accessibility", weight: "10%" },
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
                  {meta.emoji} {meta.label}
                  <span style={{
                    marginLeft: "6px",
                    fontSize:   "0.75rem",
                    color:      "var(--text-light)",
                    fontWeight: "400",
                  }}>
                    ({meta.weight})
                  </span>
                </span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize:   "0.85rem",
                  fontWeight: "700",
                  color:      score >= 70 ? "var(--success)" : score >= 40 ? "var(--royal-blue)" : "var(--text-light)",
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
