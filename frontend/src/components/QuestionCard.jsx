/**
 * QuestionCard Component  v1.4
 * Handles: single, multi, dual, county, kcse
 *
 * FIX v1.4a — kcse type now treated identically to single (plain string stored).
 *   Previously fell through to multi/dual logic which stored an array,
 *   causing isAnswered() to fail the string check and disabling Next.
 * FIX v1.4b — county: CountySelect onSelect now always fires a plain string.
 *   Added defensive guard so even if CountySelect returns an array, we
 *   unwrap it to a string before calling onAnswer.
 */

import CountySelect from "./CountySelect";

const QuestionCard = ({ question, answer, onAnswer }) => {
  const { type, maxPicks = 1 } = question;

  // Normalise to array for multi/dual internal logic only
  const selected = Array.isArray(answer) ? answer : answer ? [answer] : [];

  const handleSelect = (value) => {
    // single, county and kcse all store a plain string
    if (type === "single" || type === "county" || type === "kcse") {
      // Defensive unwrap — in case a component returns an array
      const strValue = Array.isArray(value) ? value[0] : value;
      onAnswer(strValue);
      return;
    }
    // multi / dual — toggle selection
    if (selected.includes(value)) {
      onAnswer(selected.filter((v) => v !== value));
    } else {
      if (selected.length < maxPicks) {
        onAnswer([...selected, value]);
      }
    }
  };

  const isSelected = (value) => selected.includes(value);
  const maxReached = (value) =>
    type !== "single" && type !== "county" && type !== "kcse" &&
    selected.length >= maxPicks && !isSelected(value);

  // ── Badge text ─────────────────────────────────────────────────────────────
  const badgeText = () => {
    if (type === "single")  return "Select one";
    if (type === "county")  return "Search or scroll";
    if (type === "kcse")    return "Select one — or skip below";
    if (type === "multi")   return `Select up to ${maxPicks} · ${selected.length} selected`;
    if (type === "dual") {
      if (selected.length === 0) return "Select 1, or 2 if you're truly torn";
      if (selected.length === 1) return "1 selected — or pick a 2nd if unsure";
      return "2 selected";
    }
    return "Select one";
  };

  const indicatorRadius = type === "single" || type === "kcse" ? "50%" : "5px";

  // ── County question — render searchable dropdown ──────────────────────────
  if (type === "county") {
    return (
      <div className="fade-in-up">
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: "var(--royal-blue-pale)", color: "var(--royal-blue)",
          borderRadius: "999px", padding: "4px 14px",
          fontSize: "0.78rem", fontWeight: "700",
          fontFamily: "var(--font-display)", marginBottom: "16px", letterSpacing: "0.04em",
        }}>
          Q{question.number} · {badgeText()}
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
          fontWeight: "700", color: "var(--text-dark)", marginBottom: "8px", lineHeight: "1.3",
        }}>
          {question.question}
        </h2>

        <p style={{ fontSize: "0.88rem", color: "var(--text-light)", marginBottom: "24px" }}>
          {question.hint}
        </p>

        <CountySelect
          options={question.options}
          value={answer || ""}
          onSelect={(val) => {
            // Always pass a plain string — defensive unwrap
            const strVal = Array.isArray(val) ? val[0] : val;
            onAnswer(strVal);
          }}
        />

        {answer && (
          <div style={{
            marginTop: "12px", padding: "10px 14px",
            background: "var(--success-pale)", borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem", color: "var(--success)", fontWeight: "600",
          }}>
            ✅ {answer} selected — click Next to continue
          </div>
        )}
      </div>
    );
  }

  // ── All other question types (single, multi, dual, kcse) ──────────────────
  return (
    <div className="fade-in-up">

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center",
        background: "var(--royal-blue-pale)", color: "var(--royal-blue)",
        borderRadius: "999px", padding: "4px 14px",
        fontSize: "0.78rem", fontWeight: "700",
        fontFamily: "var(--font-display)", marginBottom: "16px", letterSpacing: "0.04em",
      }}>
        Q{question.number} · {badgeText()}
      </div>

      {/* Question */}
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight: "700", color: "var(--text-dark)", marginBottom: "8px", lineHeight: "1.3",
      }}>
        {question.question}
      </h2>

      {/* Hint */}
      {question.hint && (
        <p style={{
          fontSize: "0.88rem", color: "var(--text-light)", marginBottom: "24px",
          fontStyle: type === "dual" ? "italic" : "normal",
        }}>
          {question.hint}
        </p>
      )}

      {/* Dual nudge after 1st pick */}
      {type === "dual" && selected.length === 1 && (
        <div style={{
          background: "var(--royal-blue-pale)", border: "1px solid var(--royal-blue-mid)",
          borderRadius: "var(--radius-sm)", padding: "10px 14px",
          marginBottom: "16px", fontSize: "0.82rem", color: "var(--royal-blue-dark)",
        }}>
          ✅ Good choice. Pick a 2nd if another also feels like you — otherwise click Next.
        </div>
      )}

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {question.options.map((option) => {
          const active   = isSelected(option.value);
          const disabled = maxReached(option.value);

          return (
            <button
              key={option.value}
              onClick={() => !disabled && handleSelect(option.value)}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 18px", borderRadius: "var(--radius-md)",
                border:     active ? "2px solid var(--royal-blue)" : "2px solid var(--border)",
                background: active ? "var(--royal-blue-pale)" : "var(--white)",
                cursor:     disabled ? "not-allowed" : "pointer",
                opacity:    disabled ? 0.4 : 1,
                textAlign:  "left", transition: "all 0.18s ease",
                boxShadow:  active ? "var(--shadow-md)" : "var(--shadow-sm)",
                transform:  active ? "translateX(4px)" : "translateX(0)",
              }}
            >
              {/* Indicator */}
              <div style={{
                width: "20px", height: "20px", minWidth: "20px",
                borderRadius:   indicatorRadius,
                border:         active ? "2px solid var(--royal-blue)" : "2px solid var(--text-light)",
                background:     active ? "var(--royal-blue)" : "transparent",
                display:        "flex", alignItems: "center", justifyContent: "center",
                transition:     "all 0.18s ease",
              }}>
                {active && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              {/* Label */}
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.95rem",
                fontWeight: active ? "600" : "400",
                color:      active ? "var(--royal-blue-dark)" : "var(--text-dark)",
                lineHeight: "1.4", transition: "all 0.18s ease",
              }}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default QuestionCard;
