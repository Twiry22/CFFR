/**
 * Results Page  v1.5
 * v1.1 — Shows top 3 + alternates for dual-pick students
 * v1.2 — Profile summary strip moved to below career cards
 * v1.3 — Email prompt modal added before retake
 * v1.4 — Email prompt modal removed (temporarily disabled)
 * v1.5 — Email results form restored using Resend backend endpoint
 */

import { useState, useEffect } from "react";
import ResultCard from "../components/ResultCard";
import { emailResults } from "../services/api";

const Results = ({ result, onRetake }) => {
  const {
    studentProfile,
    recommendations,
    alternateRecommendations,
    exploratoryNote,
    disclaimer,
  } = result;

  // ── Email results state ───────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  // ── Intercept browser refresh / tab close ────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ── Email results handler ────────────────────────────────────────────────
  const handleEmailResults = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setEmailSuccess(false);
      setEmailMessage("Enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setEmailSuccess(false);
      setEmailMessage("Enter a valid email address.");
      return;
    }

    if (
      !Array.isArray(recommendations) ||
      recommendations.length === 0
    ) {
      setEmailSuccess(false);
      setEmailMessage(
        "Your recommendations are unavailable. Please retake the assessment."
      );
      return;
    }

    try {
      setSendingEmail(true);
      setEmailSuccess(false);
      setEmailMessage("");

      await emailResults(
        cleanEmail,
        recommendations
      );

      setEmailSuccess(true);
      setEmailMessage(
        `Your career results have been sent to ${cleanEmail}.`
      );
    } catch (error) {
      setEmailSuccess(false);
      setEmailMessage(
        error.message ||
          "The email could not be sent. Please try again."
      );
    } finally {
      setSendingEmail(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--white)",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Nav */}
      <nav
        style={{
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="/logo.png"
            alt="CFFR"
            style={{
              height: "36px",
              width: "auto",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "1rem",
              color: "var(--royal-blue)",
            }}
          >
            CFFR
          </span>
        </div>

        <button
          onClick={onRetake}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            padding: "6px 18px",
            fontSize: "0.82rem",
            color: "var(--text-mid)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          ↩ Retake
        </button>
      </nav>

      <main
        style={{
          flex: "1",
          padding: "48px 24px 80px",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >

          {/* Hero */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "48px",
            }}
            className="fade-in-up"
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: "800",
                color: "var(--text-dark)",
                marginBottom: "10px",
              }}
            >
              Your Career Matches
            </h1>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-mid)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              {studentProfile.exploratoryProfile
                ? "Here are your top 3 career directions, plus 3 more worth considering. Remember you're still exploring, and that's a great place to be."
                : "Based on your answers, below are the 3 career directions that best match your profile and Kenya's 4-year outlook."}
            </p>
          </div>

          {/* Top 3 recommendations */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {recommendations.map((rec) => (
              <ResultCard
                key={rec.rank}
                recommendation={rec}
              />
            ))}
          </div>

          {/* Exploratory section */}
          {studentProfile.exploratoryProfile &&
            alternateRecommendations?.length > 0 && (
              <>
                <div
                  style={{
                    background: "var(--royal-blue-pale)",
                    border: "1px solid var(--royal-blue-mid)",
                    borderRadius: "var(--radius-md)",
                    padding: "20px 24px",
                    marginBottom: "32px",
                  }}
                  className="fade-in-up"
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      color: "var(--royal-blue)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Also Worth Exploring
                  </p>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-dark)",
                      lineHeight: "1.7",
                    }}
                  >
                    {exploratoryNote}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                    marginBottom: "48px",
                  }}
                >
                  {alternateRecommendations.map((rec) => (
                    <ResultCard
                      key={rec.rank}
                      recommendation={rec}
                      isAlternate
                    />
                  ))}
                </div>
              </>
            )}

          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginBottom: "40px",
            }}
          />

          {/* Profile summary */}
          <div
            style={{
              marginBottom: "48px",
            }}
            className="fade-in-up"
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "0.78rem",
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Your Profile Summary
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                {
                  label: "Personality",
                  value: studentProfile.personalityType,
                },
                {
                  label: "Tech Readiness",
                  value: studentProfile.techReadiness,
                },
                {
                  label: "Subject Breadth",
                  value: studentProfile.subjectBreadth,
                },
                {
                  label: "Academic Alignment",
                  value: studentProfile.academicAlignment,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    borderTop:
                      "3px solid var(--royal-blue)",
                    paddingTop: "14px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      color: "var(--text-light)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </p>

                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "0.95rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Email results */}
          <div
            className="email-results-section fade-in-up"
            style={{
              maxWidth: "600px",
              margin: "0 auto 48px",
              padding: "28px",
              background: "var(--royal-blue-pale)",
              border: "1px solid var(--royal-blue-mid)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "800",
                  fontSize: "1.1rem",
                  color: "var(--text-dark)",
                  marginBottom: "8px",
                }}
              >
                Email These Results
              </h3>

              <p
                style={{
                  fontSize: "0.86rem",
                  color: "var(--text-mid)",
                  lineHeight: "1.6",
                  margin: "0",
                }}
              >
                Send your career recommendations to your email so
                you can review or share them later.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (emailMessage) {
                    setEmailMessage("");
                    setEmailSuccess(false);
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !sendingEmail
                  ) {
                    handleEmailResults();
                  }
                }}
                placeholder="Enter your email address"
                disabled={sendingEmail}
                autoComplete="email"
                aria-label="Email address"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  background: "var(--white)",
                  color: "var(--text-dark)",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  opacity: sendingEmail ? 0.7 : 1,
                }}
              />

              <button
                type="button"
                className="btn-primary"
                onClick={handleEmailResults}
                disabled={sendingEmail}
                style={{
                  width: "100%",
                  cursor: sendingEmail
                    ? "not-allowed"
                    : "pointer",
                  opacity: sendingEmail ? 0.7 : 1,
                }}
              >
                {sendingEmail
                  ? "Sending..."
                  : "Send Results"}
              </button>

              {emailMessage && (
                <p
                  role="status"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    lineHeight: "1.5",
                    textAlign: "center",
                    margin: "4px 0 0",
                    color: emailSuccess
                      ? "#15803d"
                      : "#b91c1c",
                  }}
                >
                  {emailMessage}
                </p>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-light)",
              lineHeight: "1.7",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            {disclaimer}
          </p>

          {/* Retake button */}
          <div
            style={{
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            <button
              className="btn-secondary"
              onClick={onRetake}
            >
              ↩ Retake the Assessment
            </button>
          </div>

        </div>
      </main>

      <footer
        style={{
          padding: "16px 40px",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-light)",
          }}
        >
          © 2026 CFFR · ProjectData Hub · Kenya
        </p>
      </footer>

    </div>
  );
};

export default Results;

