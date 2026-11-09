/**
 * Assessment.pr.jsx  v1.1
 * CFFR Professional assessment (frontend only, no backend call yet).
 *
 * Flow:
 *   3 random free questions  →  Payment gate
 *   →  Track Record (work history)  →  remaining questions  →  Done screen
 *
 * All questions are shuffled per attempt. The first FREE_QUESTIONS (3) of
 * the shuffle are the free preview; the rest follow the Track Record.
 * Q4/Q8 are never free, since they refer back to the Track Record.
 * Q4/Q8 (`dynamicFromHistory`) are skipped when no roles were added.
 *
 * Progress is kept in sessionStorage under its own key, so it never collides
 * with the High School assessment and survives the Pesapal redirect.
 */

import { useState, useEffect, useMemo } from "react";
import { QUESTIONS, FREE_QUESTIONS, WORK_HISTORY_FIELD } from "../data/questions.pr";
import QuestionCard from "../components/QuestionCard.pr";
import WorkHistory, { isEntryComplete } from "../components/WorkHistory.pr";
import Payment from "./Payment";
import ResultsPro from "./Results.pr";

const STORAGE_KEY = "cffr_pro_assessment_progress";

// ── TESTING SWITCH ───────────────────────────────────────────────────────────
// false = no payment page; every question flows straight through.
// Set back to true when testing is done to bring the payment gate back.
const PAYMENT_ENABLED = false;

const HISTORY_STEP_ID = "history";

// Q4/Q8 refer back to the Track Record, so they can never be in the free
// preview (which comes before it). Everything else is fair game.
const PRE_HISTORY_POOL = QUESTIONS.filter((q) => !q.dynamicFromHistory);
const HISTORY_QS       = QUESTIONS.filter((q) => q.dynamicFromHistory);
const ALL_IDS_KEY      = QUESTIONS.map((q) => q.id).sort().join(",");

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Every question is shuffled once per attempt. The first FREE_QUESTIONS of
// the shuffle become the free preview; the rest (plus Q4/Q8) are shuffled
// again and follow the Track Record. A saved order is reused, so the Pesapal
// redirect doesn't reshuffle mid-attempt, unless the question set changed.
const buildOrder = (saved) => {
  const byId = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
  if (Array.isArray(saved?.freeIds) && Array.isArray(saved?.restIds)) {
    const savedKey = [...saved.freeIds, ...saved.restIds].sort().join(",");
    if (savedKey === ALL_IDS_KEY) {
      return {
        free: saved.freeIds.map((id) => byId[id]),
        rest: saved.restIds.map((id) => byId[id]),
      };
    }
  }
  const pool = shuffleArray(PRE_HISTORY_POOL);
  return {
    free: pool.slice(0, FREE_QUESTIONS),
    rest: shuffleArray([...pool.slice(FREE_QUESTIONS), ...HISTORY_QS]),
  };
};

const buildSteps = (order, hasHistory) => [
  ...order.free.map((q) => ({ id: q.id, kind: "question", q })),
  { id: HISTORY_STEP_ID, kind: "history" },
  ...order.rest
    .filter((q) => hasHistory || !q.dynamicFromHistory)
    .map((q) => ({ id: q.id, kind: "question", q })),
];

// ── sessionStorage helpers ───────────────────────────────────────────────────
const loadSaved = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && typeof s.stepId === "string" ? s : null;
  } catch {
    return null;
  }
};
const clearSaved = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
};

const C = {
  cream:     "var(--pro-cream, #FBF7F1)",
  brown:     "var(--pro-brown, #92400E)",
  brownDark: "var(--pro-brown-dark, #3E2A1D)",
  nudePale:  "var(--pro-nude-pale, #F5EBDF)",
  border:    "var(--pro-border, #E7DCCF)",
  textMid:   "var(--pro-text-mid, #6B5B4E)",
  textLight: "var(--pro-text-light, #9A8878)",
};

const AssessmentPro = ({ onBack }) => {
  const [saved] = useState(loadSaved);
  const [order, setOrder] = useState(() => buildOrder(saved));
  const lastFreeId = order.free[order.free.length - 1]?.id;

  const [stepId, setStepId]   = useState(saved?.stepId ?? order.free[0].id);
  const [answers, setAnswers] = useState(saved?.answers ?? {});
  const [history, setHistory] = useState(saved?.history ?? []);
  const [paid, setPaid]       = useState(saved?.paid ?? false);
  const [done, setDone]       = useState(false);
  const [result, setResult]   = useState(null); // scorer output, once the backend is connected

  const steps = useMemo(
    () => buildSteps(order, history.length > 0),
    [order, history.length]
  );
  const freeIds = useMemo(() => new Set(order.free.map((q) => q.id)), [order]);

  // If the saved step vanished (e.g. Q4 after all roles were removed), fall
  // back to the Track Record step rather than crashing.
  const foundIndex = steps.findIndex((s) => s.id === stepId);
  const index = foundIndex === -1
    ? steps.findIndex((s) => s.id === HISTORY_STEP_ID)
    : foundIndex;
  const step   = steps[index];
  const isLast = index === steps.length - 1;

  // Past the free section without paying (e.g. back from Pesapal) → gate.
  const onGate = PAYMENT_ENABLED && !paid && !freeIds.has(step.id);
  const showFreeLabels = PAYMENT_ENABLED && !paid;

  useEffect(() => {
    if (done) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        stepId: step.id,
        freeIds: order.free.map((q) => q.id),
        restIds: order.rest.map((q) => q.id),
        answers, history, paid,
      }));
    } catch {}
  }, [step.id, order, answers, history, paid, done]);

  useEffect(() => { window.scrollTo(0, 0); }, [step.id, onGate]);

  // ── Validation ─────────────────────────────────────────────────────────────
  const isComplete = () => {
    if (step.kind === "history") {
      return history.every((e) => isEntryComplete(e, WORK_HISTORY_FIELD.entryFields));
    }
    const a = answers[step.q.id];
    if (step.q.type === "multi") return Array.isArray(a) && a.length > 0;
    return typeof a === "string" && a.trim() !== "";
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (!isComplete()) return;
    if (isLast) {
      finish();
      return;
    }
    setStepId(steps[index + 1].id);
    // Moving past the last free question without having paid lands on the
    // gate automatically (onGate), with stepId already pointing at the
    // Track Record so it resumes there after payment.
  };

  const handleBack = () => {
    if (index > 0) setStepId(steps[index - 1].id);
  };

  const handlePaid = () => setPaid(true);

  // ── Finish (no backend yet: build the payload and log it) ─────────────────
  const buildPayload = () => {
    const out = { ...answers };
    if (history.length === 0) {
      QUESTIONS.filter((q) => q.dynamicFromHistory).forEach((q) => { delete out[q.id]; });
    }
    return { product: "professional", answers: out, history };
  };

  const finish = () => {
    const payload = buildPayload();
    // TODO: send payload to POST /api/professional/assess and show the real result.
    console.log("[CFFR Professional] assessment payload", payload);
    setDone(true);
  };

  const retake = () => {
    clearSaved();
    const fresh = buildOrder(null);
    setOrder(fresh);
    setAnswers({});
    setHistory([]);
    setStepId(fresh.free[0].id);
    setResult(null);
    setDone(false);
  };

  const exitToProducts = () => {
    clearSaved();
    onBack?.();
  };

  // ── Payment gate ───────────────────────────────────────────────────────────
  if (onGate) {
    return <Payment onPaid={handlePaid} />;
  }

  // ── Results ─────────────────────────────────────────────────────────────
  if (done && result) {
    return (
      <ResultsPro
        result={result}
        onReview={() => setDone(false)}
        onRetake={retake}
        onExit={exitToProducts}
      />
    );
  }

  // ── Finished, but no result yet (backend not connected) ──────────────────
  if (done) {
    return (
      <div style={{
        minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "14px",
        padding: "40px 24px", textAlign: "center",
      }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: C.brownDark }}>
          That's everything. Thank you!
        </h1>
        <p style={{ fontSize: "0.95rem", color: C.textMid, maxWidth: "440px", lineHeight: 1.7 }}>
          Your answers are saved. Your career matches will appear here once results are connected.
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => setDone(false)} style={secondaryBtn}>
            ← Review answers
          </button>
          <button type="button" onClick={exitToProducts} style={primaryBtn(true)}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // ── Assessment screen ─────────────────────────────────────────────────────
  const complete = isComplete();
  const freeIndex = order.free.findIndex((q) => q.id === step.id);

  return (
    <div style={{ minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column" }}>

      <nav style={{
        padding: "16px clamp(16px, 5vw, 40px)", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: `1px solid ${C.border}`,
      }}>
        <button
          type="button"
          onClick={exitToProducts}
          style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <img src="/logo.png" alt="" style={{ height: "36px", width: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: C.brown }}>
            CFFR Professional
          </span>
        </button>
        <span style={{ fontSize: "0.82rem", color: C.textLight, fontFamily: "var(--font-body)" }}>
          {freeIndex !== -1 && showFreeLabels
            ? `Free preview · ${freeIndex + 1} of ${order.free.length}`
            : "Career Assessment"}
        </span>
      </nav>

      <main style={{ flex: 1, padding: "40px 16px 64px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "640px", width: "100%" }}>

          {/* Progress */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "0.8rem", color: C.textLight, marginBottom: "8px", fontFamily: "var(--font-body)",
            }}>
              <span>Step {index + 1} of {steps.length}</span>
              <span>{Math.round(((index + 1) / steps.length) * 100)}%</span>
            </div>
            <div style={{ height: "6px", background: C.nudePale, borderRadius: "999px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${((index + 1) / steps.length) * 100}%`,
                background: C.brown, borderRadius: "999px", transition: "width 0.3s ease",
              }} />
            </div>
          </div>

          <div style={{ marginBottom: "40px" }}>
            {step.kind === "history" ? (
              <WorkHistory field={WORK_HISTORY_FIELD} entries={history} onChange={setHistory} />
            ) : (
              <QuestionCard
                key={step.id}
                question={step.q}
                answer={answers[step.id]}
                onAnswer={(v) => setAnswers((prev) => ({ ...prev, [step.id]: v }))}
              />
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {index > 0 && (
              <button type="button" onClick={handleBack} style={secondaryBtn}>
                ← Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!complete}
              style={{ ...primaryBtn(complete), flex: 1 }}
            >
              {isLast
                ? "Finish →"
                : step.id === lastFreeId && showFreeLabels
                  ? "Continue to full assessment →"
                  : "Next →"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

const primaryBtn = (enabled) => ({
  padding: "14px 28px", borderRadius: "8px", border: "none",
  background: enabled ? "var(--pro-brown, #92400E)" : "var(--pro-border, #E7DCCF)",
  color: enabled ? "#FBF7F1" : "var(--pro-text-light, #9A8878)",
  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem",
  cursor: enabled ? "pointer" : "not-allowed", transition: "all 0.18s ease",
});

const secondaryBtn = {
  padding: "14px 28px", borderRadius: "8px",
  border: "2px solid var(--pro-border, #E7DCCF)", background: "transparent",
  color: "var(--pro-brown-dark, #3E2A1D)", fontFamily: "var(--font-display)",
  fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
};

export default AssessmentPro;
