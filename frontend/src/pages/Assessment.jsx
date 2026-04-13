/**
 * Assessment Page  v1.1
 * Handles single, multi, and dual question types.
 * For dual questions: sends array to backend (1 or 2 items).
 * For single questions: sends plain string.
 */

import { useState } from "react";
import QUESTIONS from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { submitAssessment } from "../services/api";

const Assessment = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]           = useState({});
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const currentAnswer   = answers[currentQuestion.id];

  // ── Determine if question has a valid answer ─────────────────────────────────
  const isAnswered = () => {
    const { type } = currentQuestion;
    if (!currentAnswer) return false;

    if (type === "single") {
      return typeof currentAnswer === "string" && currentAnswer !== "";
    }
    if (type === "multi" || type === "dual") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    return false;
  };

  // ── Normalise answer before storing ─────────────────────────────────────────
  // single → plain string
  // multi / dual → always array
  const handleAnswer = (value) => {
    const { type } = currentQuestion;

    if (type === "single") {
      // value comes in as a plain string from QuestionCard
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    } else {
      // multi / dual — value is already an array from QuestionCard
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  // ── Build the final answers payload for the backend ──────────────────────────
  // Q3 and Q4 (dual) can be array of 1 or 2.
  // All single questions must be plain strings.
  const buildPayload = () => {
    const payload = { ...answers };

    QUESTIONS.forEach((q) => {
      if (q.type === "single" && Array.isArray(payload[q.id])) {
        // Shouldn't happen, but safety net
        payload[q.id] = payload[q.id][0];
      }
      if ((q.type === "multi" || q.type === "dual") && !Array.isArray(payload[q.id])) {
        payload[q.id] = payload[q.id] ? [payload[q.id]] : [];
      }
    });

    return payload;
  };

  const handleNext = async () => {
    if (!isAnswered()) return;

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setLoading(true);
      setError(null);
      try {
        const result = await submitAssessment(buildPayload());
        onComplete(result);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ── Loading screen ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "20px",
        background:     "var(--white)",
        padding:        "40px 20px",
      }}>
        <div className="spinner" />
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontWeight: "700",
            fontSize:   "1.1rem",
            color:      "var(--text-dark)",
          }}>
            Analysing your profile...
          </p>
          <p style={{
            fontSize:  "0.88rem",
            color:     "var(--text-light)",
            marginTop: "6px",
          }}>
            Matching you to Kenya's best career opportunities
          </p>
        </div>
      </div>
    );
  }

  // ── Assessment screen ─────────────────────────────────────────────────────────
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
        <span style={{
          fontSize:   "0.82rem",
          color:      "var(--text-light)",
          fontFamily: "var(--font-body)",
        }}>
          Career Assessment
        </span>
      </nav>

      {/* Content */}
      <main style={{
        flex:           "1",
        padding:        "48px 24px 64px",
        display:        "flex",
        justifyContent: "center",
      }}>
        <div style={{ maxWidth: "640px", width: "100%" }}>

          <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />

          <div className="fade-in-up" style={{ marginBottom: "40px" }}>
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={handleAnswer}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background:   "var(--error-pale)",
              border:       "1px solid var(--error)",
              borderRadius: "var(--radius-md)",
              padding:      "12px 16px",
              marginBottom: "20px",
              fontSize:     "0.88rem",
              color:        "var(--error)",
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: "12px" }}>
            {currentIndex > 0 && (
              <button
                className="btn-secondary"
                onClick={handleBack}
                style={{ width: "auto", padding: "14px 28px" }}
              >
                ← Back
              </button>
            )}
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={!isAnswered()}
            >
              {currentIndex === QUESTIONS.length - 1
                ? "See My Results →"
                : "Next →"}
            </button>
          </div>

        </div>
      </main>

    </div>
  );
};

export default Assessment;
