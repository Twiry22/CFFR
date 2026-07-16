/**
 * Results Page  v1.3
 * Added: email input box at bottom to send results to student
 */

import { useState } from "react";
import ResultCard from "../components/ResultCard";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Results = ({ result, onRetake }) => {
  const {
    studentProfile,
    recommendations,
    alternateRecommendations,
    exploratoryNote,
    disclaimer,
  } = result;

  // ── Email state ───────────────────────────────────────────────────────────
  const [email, setEmail]         = useState("");
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSendEmail = async () => {
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setSending(true);
    setEmailError("");

    try {
      const res = await fetch(`${API_BASE}/api/send-results`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          recommendations,
          studentProfile,
          disclaimer,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
      } else {
        setEmailError(data.message || "Could not send email. Please try again.");
      }
    } catch {
      setEmailError("Could not reach the server. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--white)", display: "flex", flexDirection: "column" }}>

      {/* Nav */}
      <nav style={{
        padding: "16px 40px", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="CFFR" style={{ height: "36px", width: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "1rem", color: "var(--royal-blue)" }}>
            CFFR
          </span>
        </div>
        <button onClick={onRetake} style={{
          background: "none", border: "1px solid var(--border)", borderRadius: "999px",
          padding: "6px 18px", fontSize: "0.82rem", color: "var(--text-mid)",
          cursor: "pointer", fontFamily: "var(--font-body)",
        }}>
          ↩ Retake
        </button>
      </nav>

      <main style={{ flex: "1", padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "48px" }} className="fade-in-up">
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: "800", color: "var(--text-dark)", marginBottom: "10px",
            }}>
              Your Career Matches
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--text-mid)", maxWidth: "520px", margin: "0 auto", lineHeight: "1.7" }}>
              {studentProfile.exploratoryProfile
                ? "You're still exploring and that's a great place to be. Here are your top 3 career directions worth considering."
                : "Based on your answers, here are the 3 career directions that best match your profile and Kenya's 4-year outlook."}
            </p>
          </div>

          {/* Profile summary */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px", marginBottom: "48px",
          }} className="fade-in-up">
            {[
              { label: "Personality",        value: studentProfile.personalityType },
              { label: "Tech Readiness",     value: studentProfile.techReadiness },
              { label: "Subject Breadth",    value: studentProfile.subjectBreadth },
              { label: "Academic Alignment", value: studentProfile.academicAlignment },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: "3px solid var(--royal-blue)", paddingTop: "14px" }}>
                <p style={{
                  fontSize: "0.72rem", fontWeight: "600", color: "var(--text-light)",
                  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px",
                }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "0.95rem", color: "var(--text-dark)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", marginBottom: "40px" }} />

          {/* Top 3 recommendations */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
            {recommendations.map((rec) => (
              <ResultCard key={rec.rank} recommendation={rec} />
            ))}
          </div>

          {/* Exploratory alternates */}
          {studentProfile.exploratoryProfile && alternateRecommendations?.length > 0 && (
            <>
              <div style={{
                background: "var(--royal-blue-pale)", border: "1px solid var(--royal-blue-mid)",
                borderRadius: "var(--radius-md)", padding: "20px 24px", marginBottom: "32px",
              }} className="fade-in-up">
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "0.88rem",
                  color: "var(--royal-blue)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                 Also Worth Exploring...
                </p>
                <p style={{ fontSize: "0.92rem", color: "var(--text-dark)", lineHeight: "1.7" }}>
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

          {/* ── EMAIL RESULTS BOX ── */}
          <div style={{
            background: "var(--royal-blue-pale)",
            border: "1px solid var(--royal-blue-mid)",
            borderRadius: "var(--radius-lg)",
            padding: "32px",
            marginBottom: "40px",
            textAlign: "center",
          }} className="fade-in-up">

            {sent ? (
              /* Success state */
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📬</div>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: "700",
                  fontSize: "1.1rem", color: "var(--royal-blue)", marginBottom: "6px",
                }}>
                  Results sent!
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-mid)" }}>
                  Check your inbox and your spam folder just in case.
                </p>
              </div>
            ) : (
              /* Input state */
              <div>
                <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}> </div>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: "700",
                  fontSize: "1.1rem", color: "var(--text-dark)", marginBottom: "6px",
                }}>
                  Want these results in your inbox?
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-mid)", marginBottom: "20px" }}>
                  Enter your email to receive a full summary of your career matches, recommended schools and Kenya outlook-2030.
                </p>

                <div style={{ display: "flex", gap: "10px", maxWidth: "480px", margin: "0 auto" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                    placeholder="your@email.com"
                    disabled={sending}
                    style={{
                      flex: "1",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: emailError ? "2px solid var(--error)" : "2px solid var(--border)",
                      fontSize: "0.95rem",
                      fontFamily: "var(--font-body)",
                      color: "var(--text-dark)",
                      outline: "none",
                      background: "var(--white)",
                    }}
                  />
                  <button
                    onClick={handleSendEmail}
                    disabled={sending || !email.trim()}
                    style={{
                      padding: "12px 22px",
                      background: "var(--royal-blue)",
                      color: "var(--white)",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      fontFamily: "var(--font-display)",
                      cursor: sending || !email.trim() ? "not-allowed" : "pointer",
                      opacity: sending || !email.trim() ? 0.6 : 1,
                      whiteSpace: "nowrap",
                      transition: "all 0.18s ease",
                    }}
                  >
                    {sending ? "Sending..." : "Send Results →"}
                  </button>
                </div>

                {emailError && (
                  <p style={{ fontSize: "0.82rem", color: "var(--error)", marginTop: "10px" }}>
                    ⚠️ {emailError}
                  </p>
                )}

                <p style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "12px" }}>
                  We only use your email to send these results. Nothing else.
                </p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p style={{
            fontSize: "0.82rem", color: "var(--text-light)", lineHeight: "1.7",
            textAlign: "center", maxWidth: "600px", margin: "0 auto 32px",
          }}>
            {disclaimer}
          </p>

          {/* Retake */}
          <div style={{ maxWidth: "320px", margin: "0 auto" }}>
            <button className="btn-secondary" onClick={onRetake}>↩ Retake the Assessment</button>
          </div>

        </div>
      </main>

      <footer style={{ padding: "16px 40px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
          © 2026 CFFR · ProjectData Hub · Kenya
        </p>
      </footer>

    </div>
  );
};

export default Results;
