/**
 * Assessment Page  v2.1
 * ─────────────────────────────────────────────────────────────────────────────
 * FIX v2.1a — Q11 (kcse type): isAnswered() now correctly treats kcse answers
 *   as valid so Next button enables after a selection is made.
 * FIX v2.1b — County: isAnswered() explicitly handles county type.
 * Q11 is still skippable — Skip button always available on that question.
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
  const isLastQuestion  = currentIndex === QUESTIONS.length - 1;

  // ── Is current question answered? ─────────────────────────────────────────
  const isAnswered = () => {
    const { type, skippable } = currentQuestion;

    // Skippable questions (Q11) — always allow Next whether answered or not
    if (skippable) return true;

    // No answer at all
    if (currentAnswer === undefined || currentAnswer === null || currentAnswer === "") return false;

    // Single-pick types — need a non-empty string
    if (type === "single" || type === "county" || type === "kcse") {
      return typeof currentAnswer === "string" && currentAnswer.trim() !== "";
    }

    // Multi-pick types — need at least one item in array
    if (type === "multi" || type === "dual") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }

    return false;
  };

  // ── Store answer ──────────────────────────────────────────────────────────
  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  // ── Skip handler (Q11 only) ───────────────────────────────────────────────
  const handleSkip = () => {
    const updated = { ...answers, [currentQuestion.id]: "skipped" };
    setAnswers(updated);
    if (isLastQuestion) {
      submitAndComplete(updated);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // ── Build clean payload ───────────────────────────────────────────────────
  const buildPayload = (answersOverride = null) => {
    const src     = answersOverride || answers;
    const payload = { ...src };

    QUESTIONS.forEach((q) => {
      if (q.type === "single" || q.type === "county" || q.type === "kcse") {
        if (Array.isArray(payload[q.id])) payload[q.id] = payload[q.id][0];
      }
      if (q.type === "multi" || q.type === "dual") {
        if (!Array.isArray(payload[q.id])) {
          payload[q.id] = payload[q.id] ? [payload[q.id]] : [];
        }
      }
    });

    return payload;
  };

  // ── Submit assessment ─────────────────────────────────────────────────────
  const submitAndComplete = async (answersOverride = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitAssessment(buildPayload(answersOverride));
      onComplete(result);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // ── Next ──────────────────────────────────────────────────────────────────
  const handleNext = async () => {
    if (!isAnswered()) return;
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await submitAndComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ── Loading screen ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "20px", background: "var(--white)", padding: "40px 20px",
      }}>
        <div className="spinner" />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "1.1rem", color: "var(--text-dark)" }}>
            Analysing your profile...
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--text-light)", marginTop: "6px" }}>
            Matching you to Kenya's best career opportunities
          </p>
        </div>
      </div>
    );
  }

  // ── Assessment screen ─────────────────────────────────────────────────────
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
        <span style={{ fontSize: "0.82rem", color: "var(--text-light)", fontFamily: "var(--font-body)" }}>
          Career Assessment
        </span>
      </nav>

      {/* Content */}
      <main style={{ flex: "1", padding: "48px 24px 64px", display: "flex", justifyContent: "center" }}>
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
              background: "var(--error-pale)", border: "1px solid var(--error)",
              borderRadius: "var(--radius-md)", padding: "12px 16px",
              marginBottom: "20px", fontSize: "0.88rem", color: "var(--error)",
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

            {currentIndex > 0 && (
              <button className="btn-secondary" onClick={handleBack}
                style={{ width: "auto", padding: "14px 28px" }}>
                ← Back
              </button>
            )}

            {/* Skip button — only for skippable questions (Q11) */}
            {currentQuestion.skippable && (
              <button
                onClick={handleSkip}
                style={{
                  padding:      "14px 24px",
                  borderRadius: "var(--radius-md)",
                  border:       "2px solid var(--border)",
                  background:   "transparent",
                  color:        "var(--text-light)",
                  fontFamily:   "var(--font-display)",
                  fontWeight:   "600",
                  fontSize:     "0.9rem",
                  cursor:       "pointer",
                  transition:   "all 0.18s ease",
                }}
                onMouseEnter={(e) => { e.target.style.borderColor = "var(--royal-blue)"; e.target.style.color = "var(--royal-blue)"; }}
                onMouseLeave={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-light)"; }}
              >
                Skip — I don't have my results yet
              </button>
            )}

            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={!isAnswered()}
            >
              {isLastQuestion ? "See My Results →" : "Next →"}
            </button>

          </div>

        </div>
      </main>

    </div>
  );
};

export default Assessment;
