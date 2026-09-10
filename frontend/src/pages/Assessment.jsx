/**
 * Assessment Page  v3.0
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from "react";
import QUESTIONS from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import Payment from "./Payment";
import { submitAssessment } from "../services/api";

const FREE_QUESTION_COUNT = 5;
const STORAGE_KEY = "cffr_assessment_progress";

// ── sessionStorage helpers ───────────────────────────────────────────────────
const loadSavedState = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Guard against a stale save from a previous question-set version
    if (!Array.isArray(parsed.orderIds) || parsed.orderIds.length !== QUESTIONS.length) return null;
    return parsed;
  } catch {
    return null;
  }
};

const clearSavedState = () => {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
};

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Builds the question order for this session: restore it if we have a saved
// one (so a Pesapal redirect doesn't reshuffle mid-attempt), otherwise
// generate a fresh shuffle.
const buildInitialOrder = (saved) => {
  if (saved) {
    const byId = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
    const restored = saved.orderIds.map((id) => byId[id]).filter(Boolean);
    if (restored.length === QUESTIONS.length) return restored;
  }
  return shuffleArray(QUESTIONS);
};

const Assessment = ({ onComplete }) => {
  const [savedState] = useState(loadSavedState); // read once, on mount
  const [shuffledQuestions] = useState(() => buildInitialOrder(savedState));

  const [currentIndex, setCurrentIndex] = useState(savedState?.currentIndex ?? 0);
  const [answers, setAnswers]           = useState(savedState?.answers ?? {});
  const [paid, setPaid]                 = useState(savedState?.paid ?? false);
  const [phase, setPhase]               = useState(() => {
    // If we saved mid-gate (reached Q6 without paying), resume on the gate.
    if (!savedState?.paid && (savedState?.currentIndex ?? 0) >= FREE_QUESTION_COUNT) {
      return "payment";
    }
    return "questions";
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const currentQuestion = shuffledQuestions[currentIndex];
  const currentAnswer   = answers[currentQuestion.id];
  const isLastQuestion  = currentIndex === shuffledQuestions.length - 1;

  // ── Persist progress on every relevant change ─────────────────────────────
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        orderIds:    shuffledQuestions.map((q) => q.id),
        currentIndex,
        answers,
        paid,
      }));
    } catch {}
  }, [shuffledQuestions, currentIndex, answers, paid]);

  // ── Is current question answered? ─────────────────────────────────────────
  const isAnswered = () => {
    const { type, skippable } = currentQuestion;

    if (skippable) return true;

    if (currentAnswer === undefined || currentAnswer === null || currentAnswer === "") return false;

    if (type === "single" || type === "county" || type === "kcse") {
      return typeof currentAnswer === "string" && currentAnswer.trim() !== "";
    }

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
      advanceOrGate(updated);
    }
  };

  // ── Build clean payload (still keyed by question.id — order-independent) ──
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
      clearSavedState(); // fresh shuffle + no gate memory on next attempt
      onComplete(result);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // ── Shared "move forward" logic used by both Next and Skip ────────────────
  // Gates at the boundary between question 5 and question 6, unless already paid.
  const advanceOrGate = (answersSnapshot) => {
    const nextIndex = currentIndex + 1;

    if (!paid && currentIndex === FREE_QUESTION_COUNT - 1) {
      setCurrentIndex(nextIndex); // so a resumed session lands correctly post-payment
      setPhase("payment");
      return;
    }

    setCurrentIndex(nextIndex);
  };

  // ── Next ──────────────────────────────────────────────────────────────────
  const handleNext = async () => {
    if (!isAnswered()) return;
    if (!isLastQuestion) {
      advanceOrGate(answers);
    } else {
      await submitAndComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ── Called by Payment.jsx once Pesapal confirms (or the bypass fires) ─────
  const handlePaymentComplete = () => {
    setPaid(true);
    setPhase("questions");
    // currentIndex was already advanced to FREE_QUESTION_COUNT when the gate
    // triggered, so the student now sees question 6.
  };

  // ── Payment gate screen ────────────────────────────────────────────────────
  if (phase === "payment") {
    return <Payment onPaid={handlePaymentComplete} />;
  }

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

          <ProgressBar current={currentIndex + 1} total={shuffledQuestions.length} />

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

            {/* Skip button — only for skippable questions (Q11), wherever it lands */}
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
