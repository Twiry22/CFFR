/**
 * Results Page  v1.2
 * v1.1 — Shows top 3 + alternates for dual-pick students
 * v1.2 — Profile summary strip moved to below career cards
 *         "3-year" → "4-year" in hero subtext
 */

import ResultCard from "../components/ResultCard";

const Results = ({ result, onRetake }) => {
  const {
    studentProfile,
    recommendations,
    alternateRecommendations,
    exploratoryNote,
    disclaimer,
  } = result;

  return (
    <div style={{
      minHeight:     "100vh",
      background:    "var(--white)",
      display:       "flex",
      flexDirection: "column",
    }}>

      {/* Nav */}
      <nav style={{
        padding:        "16px 40px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        borderBottom:   "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="CFFR" style={{ height: "36px", width: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: "800",
            fontSize:   "1rem",
            color:      "var(--royal-blue)",
          }}>
            CFFR
          </span>
        </div>
        <button
          onClick={onRetake}
          style={{
            background:   "none",
            border:       "1px solid var(--border)",
            borderRadius: "999px",
            padding:      "6px 18px",
            fontSize:     "0.82rem",
            color:        "var(--text-mid)",
            cursor:       "pointer",
            fontFamily:   "var(--font-body)",
          }}
        >
          ↩ Retake
        </button>
      </nav>

      <main style={{ flex: "1", padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "48px" }} className="fade-in-up">
            <h1 style={{
              fontFamily:   "var(--font-display)",
              fontSize:     "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight:   "800",
              color:        "var(--text-dark)",
              marginBottom: "10px",
            }}>
              Your Career Matches
            </h1>
            <p style={{
              fontSize:   "1rem",
              color:      "var(--text-mid)",
              maxWidth:   "520px",
              margin:     "0 auto",
              lineHeight: "1.7",
            }}>
              {studentProfile.exploratoryProfile
                ? "Here are your top 3 career directions, plus 3 more worth considering. Remember you're still exploring, and that's a great place to be."
                : "Based on your answers, below are the 3 career directions that best match your profile and Kenya's 4-year outlook."}
            </p>
          </div>

          {/* ── Top 3 recommendations — FIRST ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
            {recommendations.map((rec) => (
              <ResultCard key={rec.rank} recommendation={rec} />
            ))}
          </div>

          {/* ── Exploratory section — only shown for dual-pick students ── */}
          {studentProfile.exploratoryProfile && alternateRecommendations?.length > 0 && (
            <>
              <div style={{
                background:   "var(--royal-blue-pale)",
                border:       "1px solid var(--royal-blue-mid)",
                borderRadius: "var(--radius-md)",
                padding:      "20px 24px",
                marginBottom: "32px",
              }} className="fade-in-up">
                <p style={{
                  fontFamily:    "var(--font-display)",
                  fontWeight:    "700",
                  fontSize:      "0.88rem",
                  color:         "var(--royal-blue)",
                  marginBottom:  "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  Also Worth Exploring
                </p>
                <p style={{
                  fontSize:   "0.92rem",
                  color:      "var(--text-dark)",
                  lineHeight: "1.7",
                }}>
                  {exploratoryNote}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
                {alternateRecommendations.map((rec) => (
                  <ResultCard key={rec.rank} recommendation={rec} isAlternate />
                ))}
              </div>
            </>
          )}

          <div style={{ borderTop: "1px solid var(--border)", marginBottom: "40px" }} />

          {/* ── Profile summary — AFTER career cards ── */}
          <div style={{ marginBottom: "48px" }} className="fade-in-up">
            <p style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    "700",
              fontSize:      "0.78rem",
              color:         "var(--text-light)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom:  "20px",
              textAlign:     "center",
            }}>
              Your Profile Summary
            </p>
            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap:                 "16px",
            }}>
              {[
                { label: "Personality",        value: studentProfile.personalityType },
                { label: "Tech Readiness",     value: studentProfile.techReadiness },
                { label: "Subject Breadth",    value: studentProfile.subjectBreadth },
                { label: "Academic Alignment", value: studentProfile.academicAlignment },
              ].map((item) => (
                <div key={item.label} style={{ borderTop: "3px solid var(--royal-blue)", paddingTop: "14px" }}>
                  <p style={{
                    fontSize:      "0.72rem",
                    fontWeight:    "600",
                    color:         "var(--text-light)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom:  "4px",
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize:   "0.95rem",
                    color:      "var(--text-dark)",
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p style={{
            fontSize:   "0.82rem",
            color:      "var(--text-light)",
            lineHeight: "1.7",
            textAlign:  "center",
            maxWidth:   "600px",
            margin:     "0 auto 32px",
          }}>
            {disclaimer}
          </p>

          {/* Retake */}
          <div style={{ maxWidth: "320px", margin: "0 auto" }}>
            <button className="btn-secondary" onClick={onRetake}>
              ↩ Retake the Assessment
            </button>
          </div>

        </div>
      </main>

      <footer style={{
        padding:   "16px 40px",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
          © 2026 CFFR · ProjectData Hub · Kenya
        </p>
      </footer>

    </div>
  );
};

export default Results;
