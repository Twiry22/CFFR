/**
 * ResultCard Component  v1.1
 * Supports ranks 1–3 (primary) and ranks 4–6 (alternate / exploratory).
 */

import { useState } from "react";
import ScoreBreakdown from "./ScoreBreakdown";
import SchoolList from "./SchoolList";

const RANK_STYLES = {
  1: {
    borderTop: "4px solid var(--royal-blue)",
    badge:     { background: "var(--royal-blue)", color: "var(--white)" },
    label:     "Best Match",
  },
  2: {
    borderTop: "4px solid var(--royal-blue-light)",
    badge:     { background: "var(--royal-blue-light)", color: "var(--white)" },
    label:     "Strong Match",
  },
  3: {
    borderTop: "4px solid var(--border)",
    badge:     { background: "var(--royal-blue-pale)", color: "var(--royal-blue)" },
    label:     "Good Match",
  },
};

const ALTERNATE_STYLE = {
  borderTop: "4px solid var(--warning)",
  badge:     { background: "var(--warning-pale)", color: "var(--warning)" },
};

const ResultCard = ({ recommendation, isAlternate = false }) => {
  const [expanded, setExpanded] = useState(recommendation.rank === 1);

  const style = isAlternate
    ? ALTERNATE_STYLE
    : (RANK_STYLES[recommendation.rank] || RANK_STYLES[3]);

  const badgeLabel = isAlternate
    ? `Alternate Path #${recommendation.rank - 3}`
    : style.label;

  return (
    <div style={{
      borderTop:    style.borderTop,
      borderLeft:   "1px solid var(--border)",
      borderRight:  "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      borderRadius: "0 0 var(--radius-md) var(--radius-md)",
      background:   "var(--white)",
    }}>

      {/* Header */}
      <div style={{ padding: "28px 32px 24px" }}>

        {/* Rank + Growth badges */}
        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          marginBottom:   "16px",
          flexWrap:       "wrap",
          gap:            "8px",
        }}>
          <span style={{
            ...style.badge,
            borderRadius: "999px",
            padding:      "4px 16px",
            fontSize:     "0.78rem",
            fontWeight:   "700",
            fontFamily:   "var(--font-display)",
          }}>
            {badgeLabel}
          </span>
          <span style={{
            background:   "var(--royal-blue-pale)",
            color:        "var(--royal-blue)",
            borderRadius: "999px",
            padding:      "4px 14px",
            fontSize:     "0.78rem",
            fontWeight:   "600",
            fontFamily:   "var(--font-display)",
          }}>
            {recommendation.futureGrowthLabel}
          </span>
        </div>

        {/* Name + tagline */}
        <h2 style={{
          fontFamily:   "var(--font-display)",
          fontSize:     "clamp(1.3rem, 3vw, 1.7rem)",
          fontWeight:   "800",
          color:        "var(--text-dark)",
          marginBottom: "4px",
        }}>
          {recommendation.clusterName}
        </h2>
        <p style={{
          fontSize:     "0.92rem",
          color:        "var(--royal-blue)",
          fontWeight:   "500",
          marginBottom: "20px",
        }}>
          {recommendation.tagline}
        </p>

        {/* Match score */}
        <div style={{
          display:      "flex",
          alignItems:   "center",
          gap:          "16px",
          background:   "var(--royal-blue-pale)",
          borderRadius: "var(--radius-md)",
          padding:      "16px 20px",
          marginBottom: "20px",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize:   "2.4rem",
            fontWeight: "800",
            color:      "var(--royal-blue)",
            lineHeight: "1",
          }}>
            {recommendation.matchScore}
            <span style={{ fontSize: "1rem", fontWeight: "500" }}>/100</span>
          </div>
          <div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize:   "0.9rem",
              color:      "var(--text-dark)",
            }}>
              Overall Match Score
            </p>
            <p style={{
              fontSize:  "0.78rem",
              color:     "var(--text-light)",
              marginTop: "2px",
            }}>
              Market demand · Future relevance · Aptitude · Interest · Accessibility
            </p>
          </div>
        </div>

        {/* Why it fits */}
        <div style={{
          borderLeft:   "3px solid var(--royal-blue)",
          paddingLeft:  "16px",
          marginBottom: "20px",
        }}>
          <p style={{
            fontFamily:    "var(--font-display)",
            fontWeight:    "700",
            fontSize:      "0.78rem",
            color:         "var(--royal-blue)",
            marginBottom:  "6px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            Why it fits you
          </p>
          <p style={{
            fontSize:   "0.9rem",
            color:      "var(--text-dark)",
            lineHeight: "1.7",
          }}>
            {recommendation.whyItFitsYou}
          </p>
        </div>

        {/* Pathway */}
        <div style={{
          display:      "flex",
          alignItems:   "center",
          gap:          "8px",
          background:   "var(--success-pale)",
          borderRadius: "var(--radius-sm)",
          padding:      "10px 16px",
        }}>
          <span>🎓</span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: "700",
            fontSize:   "0.82rem",
            color:      "var(--success)",
          }}>
            Recommended Pathway:
          </span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize:   "0.85rem",
            color:      "var(--text-dark)",
          }}>
            {recommendation.sssPathway}
          </span>
        </div>

      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width:          "100%",
          padding:        "12px 32px",
          background:     "var(--off-white)",
          border:         "none",
          borderTop:      "1px solid var(--border)",
          color:          "var(--royal-blue)",
          fontFamily:     "var(--font-display)",
          fontWeight:     "600",
          fontSize:       "0.88rem",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "6px",
        }}
      >
        {expanded ? "▲ Hide details" : "▼ See scores & recommended schools"}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="fade-in-up" style={{ padding: "28px 32px", borderTop: "1px solid var(--border)" }}>

          {/* 3-year outlook */}
          <div style={{
            background:   "var(--royal-blue-pale)",
            borderRadius: "var(--radius-md)",
            padding:      "16px 20px",
            marginBottom: "24px",
          }}>
            <p style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    "700",
              fontSize:      "0.78rem",
              color:         "var(--royal-blue)",
              marginBottom:  "6px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
             Kenya Outlook 2026–2029
            </p>
            <p style={{
              fontSize:           "0.9rem",
              color:              "var(--text-dark)",
              lineHeight:         "1.6",
              display:            "-webkit-box",
              WebkitLineClamp:    "2",
              WebkitBoxOrient:    "vertical",
              overflow:           "hidden",
            }}>
              {recommendation.threeYearOutlook}
            </p>
          </div>

          <ScoreBreakdown scoreBreakdown={recommendation.scoreBreakdown} />
          <SchoolList schools={recommendation.recommendedSchools} />

        </div>
      )}

    </div>
  );
};

export default ResultCard;
