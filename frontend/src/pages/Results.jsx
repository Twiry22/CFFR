/**
 * Results Page  v1.3
 * v1.1 — Shows top 3 + alternates for dual-pick students
 * v1.2 — Profile summary strip moved to below career cards
 * v1.3 — Email prompt modal added before retake
 *         Intercepts both nav Retake and bottom Retake buttons
 */

import { useState, useEffect, useCallback } from "react";
import ResultCard from "../components/ResultCard";

const Results = ({ result, onRetake }) => {
  const {
    studentProfile,
    recommendations,
    alternateRecommendations,
    exploratoryNote,
    disclaimer,
  } = result;

  // ── Email modal state ─────────────────────────────────────────────────────
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email,          setEmail]          = useState("");
  const [emailStatus,    setEmailStatus]    = useState("idle"); // idle | sending | sent | error
  const [emailMessage,   setEmailMessage]   = useState("");

  // ── Intercept browser back button and page refresh ───────────────────────
  useEffect(() => {
    // Push a history entry so back button triggers popstate instead of leaving
    window.history.pushState({ cffr: "results" }, "");

    const handlePopState = (e) => {
      // Back button pressed — show email modal instead of navigating away
      window.history.pushState({ cffr: "results" }, ""); // re-push to keep catching
      setShowEmailModal(true);
    };

    const handleBeforeUnload = (e) => {
      // Refresh or close tab — browser will show its own warning
      // We show our modal first on back, browser handles refresh natively
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("popstate",      handlePopState);
    window.addEventListener("beforeunload",  handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate",     handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // ── Intercept retake — show modal first ───────────────────────────────────
  const handleRetakeClick = () => setShowEmailModal(true);

  const handleSkip = () => {
    setShowEmailModal(false);
    onRetake();
  };

  const handleSendEmail = async () => {
    const clean = email.trim().toLowerCase();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setEmailMessage("Please enter a valid email address.");
      return;
    }

    setEmailStatus("sending");
    setEmailMessage("");

    try {
      // Backend URL — set VITE_API_URL in your frontend .env / Render env vars
      // e.g. VITE_API_URL=https://cffr-backend.onrender.com
      const backendUrl = import.meta.env.VITE_API_URL || "https://cffr-backend.onrender.com";
      const res = await fetch(`${backendUrl}/api/results/email`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: clean, recommendations }),
      });

      const data = await res.json();

      if (data.success) {
        setEmailStatus("sent");
        setEmailMessage(`Results sent to ${clean}. Check your inbox!`);
        // Proceed to retake after 2 seconds
        setTimeout(() => {
          setShowEmailModal(false);
          onRetake();
        }, 2000);
      } else {
        setEmailStatus("error");
        setEmailMessage("Could not send email. You can still retake the assessment.");
      }
    } catch {
      setEmailStatus("error");
      setEmailMessage("Could not reach the server. You can still retake the assessment.");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight:     "100vh",
      background:    "var(--white)",
      display:       "flex",
      flexDirection: "column",
    }}>

      {/* ── Email Modal ── */}
      {showEmailModal && (
        <div style={{
          position:        "fixed",
          inset:           0,
          background:      "rgba(0,0,0,0.45)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          zIndex:          1000,
          padding:         "24px",
        }}>
          <div style={{
            background:   "var(--white)",
            borderRadius: "var(--radius-lg)",
            padding:      "40px 36px",
            maxWidth:     "420px",
            width:        "100%",
            boxShadow:    "var(--shadow-lg)",
            textAlign:    "center",
          }} className="fade-in-up">

            {/* Icon */}
            <div style={{
              width:          "56px",
              height:         "56px",
              borderRadius:   "50%",
              background:     "var(--royal-blue-pale)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              margin:         "0 auto 20px",
              fontSize:       "1.6rem",
            }}>
              📩
            </div>

            <h3 style={{
              fontFamily:   "var(--font-display)",
              fontSize:     "1.2rem",
              fontWeight:   "800",
              color:        "var(--text-dark)",
              marginBottom: "8px",
            }}>
              Save your results
            </h3>

            <p style={{
              fontSize:     "0.9rem",
              color:        "var(--text-mid)",
              lineHeight:   "1.6",
              marginBottom: "28px",
            }}>
              Would you like your career results emailed to you?
              Useful if you're on someone else's phone or device.
            </p>

            {/* Sent state */}
            {emailStatus === "sent" ? (
              <div style={{
                background:   "var(--success-pale)",
                borderRadius: "var(--radius-md)",
                padding:      "16px",
                marginBottom: "16px",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  color:      "var(--success)",
                  fontSize:   "0.9rem",
                }}>
                  ✅ {emailMessage}
                </p>
              </div>
            ) : (
              <>
                {/* Email input */}
                <div style={{ marginBottom: "12px", textAlign: "left" }}>
                  <label style={{
                    display:      "block",
                    fontSize:     "0.8rem",
                    fontWeight:   "700",
                    color:        "var(--text-dark)",
                    marginBottom: "6px",
                    fontFamily:   "var(--font-display)",
                  }}>
                    Your email address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailMessage(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                    disabled={emailStatus === "sending"}
                    style={{
                      width:        "100%",
                      padding:      "13px 16px",
                      borderRadius: "var(--radius-md)",
                      border:       "2px solid var(--border)",
                      fontSize:     "1rem",
                      fontFamily:   "var(--font-body)",
                      outline:      "none",
                      boxSizing:    "border-box",
                      opacity:      emailStatus === "sending" ? 0.6 : 1,
                    }}
                    onFocus={(e) => e.target.style.border = "2px solid var(--royal-blue)"}
                    onBlur={(e)  => e.target.style.border = "2px solid var(--border)"}
                  />
                </div>

                {/* Error / validation message */}
                {emailMessage && emailStatus !== "sent" && (
                  <p style={{
                    fontSize:     "0.82rem",
                    color:        "var(--error)",
                    textAlign:    "left",
                    marginBottom: "12px",
                  }}>
                    ⚠️ {emailMessage}
                  </p>
                )}

                {/* Send button */}
                <button
                  className="btn-primary"
                  onClick={handleSendEmail}
                  disabled={emailStatus === "sending"}
                  style={{ width: "100%", marginBottom: "12px", opacity: emailStatus === "sending" ? 0.7 : 1 }}
                >
                  {emailStatus === "sending" ? "Sending..." : "Send my results →"}
                </button>
              </>
            )}

            {/* Skip */}
            {emailStatus !== "sent" && (
              <button
                onClick={handleSkip}
                style={{
                  width:        "100%",
                  padding:      "12px",
                  background:   "transparent",
                  border:       "none",
                  color:        "var(--text-light)",
                  fontSize:     "0.85rem",
                  fontFamily:   "var(--font-body)",
                  cursor:       "pointer",
                  textDecoration: "underline",
                }}
              >
                Skip — just retake the assessment
              </button>
            )}

          </div>
        </div>
      )}

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
          onClick={handleRetakeClick}
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

          {/* Top 3 recommendations */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
            {recommendations.map((rec) => (
              <ResultCard key={rec.rank} recommendation={rec} />
            ))}
          </div>

          {/* Exploratory section */}
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

          {/* Profile summary */}
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

          {/* Retake button */}
          <div style={{ maxWidth: "320px", margin: "0 auto" }}>
            <button className="btn-secondary" onClick={handleRetakeClick}>
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
