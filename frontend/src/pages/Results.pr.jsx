/**
 * Results.pr.jsx  v1.0
 * CFFR Professional results page. Renders the object returned by
 * scorer.pr.js (runProAssessment). Separate from the High School Results.jsx.
 *
 * Props
 *   result    : scorer output
 *   onReview  : go back to the questions
 *   onRetake  : clear answers and start again
 *   onExit    : back to products
 */

import ResultCard from "../components/ResultCard.pr";

const C = {
  cream:     "var(--pro-cream, #FBF7F1)",
  brown:     "var(--pro-brown, #92400E)",
  brownDark: "var(--pro-brown-dark, #3E2A1D)",
  nudePale:  "var(--pro-nude-pale, #F5EBDF)",
  border:    "var(--pro-border, #E7DCCF)",
  textMid:   "var(--pro-text-mid, #6B5B4E)",
  textLight: "var(--pro-text-light, #9A8878)",
};

const btn = (primary) => ({
  padding: "13px 24px", borderRadius: "8px", cursor: "pointer",
  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.92rem",
  border: primary ? "none" : `2px solid ${C.border}`,
  background: primary ? C.brown : "transparent",
  color: primary ? "#FBF7F1" : C.brownDark,
});

const capitalise = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const ResultsPro = ({ result, onReview, onRetake, onExit }) => {
  const { profile = {}, recommendations = [], qualificationNotes = [], disclaimer } = result || {};

  const facts = [
    { label: "Your strengths", value: (profile.strengths || []).map(capitalise).join(" · ") || "—" },
    { label: "Work experience", value: profile.experience || "None yet" },
    { label: "Studied",         value: profile.studied || "—" },
    { label: "Based in",        value: profile.location || "—" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column" }}>

      <nav style={{
        padding: "16px clamp(16px, 5vw, 40px)", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: `1px solid ${C.border}`,
      }}>
        <button
          type="button"
          onClick={onExit}
          style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <img src="/logo.png" alt="" style={{ height: "36px", width: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: C.brown }}>
            CFFR Professional
          </span>
        </button>
        <span style={{ fontSize: "0.82rem", color: C.textLight }}>Your Results</span>
      </nav>

      <main style={{ flex: 1, padding: "40px 16px 64px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "720px", width: "100%" }}>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, color: C.brownDark,
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)", lineHeight: 1.2, margin: "0 0 8px",
          }}>
            Your career matches
          </h1>
          <p style={{ fontSize: "0.95rem", color: C.textMid, lineHeight: 1.7, margin: "0 0 24px" }}>
            Ranked on market demand, how stable the field looks over the next three years,
            your strengths, your experience, how reachable it is for you, and what you enjoy.
          </p>

          {/* Profile summary */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px",
            background: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: "12px",
            padding: "16px 18px", marginBottom: "28px",
          }}>
            {facts.map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: "0.72rem", color: C.textLight, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {f.label}
                </div>
                <div style={{ fontSize: "0.9rem", color: C.brownDark, fontWeight: 600, marginTop: "2px", lineHeight: 1.4 }}>
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          {/* Matches */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recommendations.map((rec) => <ResultCard key={rec.rank} rec={rec} />)}
          </div>

          {/* Careers they wanted but need a qualification for */}
          {qualificationNotes.length > 0 && (
            <div style={{
              marginTop: "24px", padding: "18px 20px", borderRadius: "12px",
              background: C.nudePale, color: C.brownDark,
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "8px" }}>
                Careers you picked that need a qualification first
              </div>
              {qualificationNotes.map((q) => (
                <p key={q.id} style={{ margin: "4px 0", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  <strong>{q.label}</strong> needs {q.requires}. It's still within reach if you're
                  willing to get it.
                </p>
              ))}
            </div>
          )}

          {disclaimer && (
            <p style={{ fontSize: "0.8rem", color: C.textLight, lineHeight: 1.7, marginTop: "28px" }}>
              {disclaimer}
            </p>
          )}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
            {onReview && <button type="button" onClick={onReview} style={btn(false)}>← Review answers</button>}
            {onRetake && <button type="button" onClick={onRetake} style={btn(false)}>Retake assessment</button>}
            {onExit   && <button type="button" onClick={onExit}   style={btn(true)}>Back to Products</button>}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ResultsPro;
