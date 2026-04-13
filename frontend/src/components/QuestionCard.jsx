/**
 * QuestionCard Component  v1.1
 * Handles three question types:
 *   "single" — classic radio, 1 pick only
 *   "multi"  — checkboxes, up to maxPicks (default 3)
 *   "dual"   — checkboxes, up to 2 picks, with nudge-to-1 messaging
 */

const QuestionCard = ({ question, answer, onAnswer }) => {
  const { type, maxPicks = 1 } = question;

  // Normalise answer to array for internal logic
  const selected = Array.isArray(answer) ? answer : answer ? [answer] : [];

  const handleSelect = (value) => {
    if (type === "single") {
      // Always a plain string for single questions
      onAnswer(value);
      return;
    }

    // multi / dual — toggle behaviour
    if (selected.includes(value)) {
      const next = selected.filter((v) => v !== value);
      // For single questions that mistakenly reach here, keep as string
      onAnswer(next);
    } else {
      if (selected.length < maxPicks) {
        onAnswer([...selected, value]);
      }
    }
  };

  const isSelected = (value) => selected.includes(value);
  const maxReached = (value) =>
    type !== "single" && selected.length >= maxPicks && !isSelected(value);

  // ── Badge label at top of question ──────────────────────────────────────────
  const badgeText = () => {
    if (type === "single") return "Select one";
    if (type === "multi")  return `Select up to ${maxPicks} · ${selected.length} selected`;
    if (type === "dual") {
      if (selected.length === 0) return "Select 1, or 2 if you're truly torn";
      if (selected.length === 1) return "1 selected — or pick a 2nd if you're unsure";
      return "2 selected";
    }
    return "Select one";
  };

  // ── Indicator shape: circle for single, square for multi/dual ───────────────
  const indicatorRadius = type === "single" ? "50%" : "5px";

  return (
    <div className="fade-in-up">

      {/* Badge */}
      <div style={{
        display:      "inline-flex",
        alignItems:   "center",
        background:   "var(--royal-blue-pale)",
        color:        "var(--royal-blue)",
        borderRadius: "999px",
        padding:      "4px 14px",
        fontSize:     "0.78rem",
        fontWeight:   "700",
        fontFamily:   "var(--font-display)",
        marginBottom: "16px",
        letterSpacing:"0.04em",
      }}>
        Q{question.number} · {badgeText()}
      </div>

      {/* Question text */}
      <h2 style={{
        fontFamily:   "var(--font-display)",
        fontSize:     "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight:   "700",
        color:        "var(--text-dark)",
        marginBottom: "8px",
        lineHeight:   "1.3",
      }}>
        {question.question}
      </h2>

      {/* Hint — shown for dual questions to set expectations */}
      {question.hint && (
        <p style={{
          fontSize:     "0.88rem",
          color:        "var(--text-light)",
          marginBottom: "24px",
          fontFamily:   "var(--font-body)",
          fontStyle:    type === "dual" ? "italic" : "normal",
        }}>
          {question.hint}
        </p>
      )}

      {/* Dual-pick contextual nudge — appears after 1 pick */}
      {type === "dual" && selected.length === 1 && (
        <div style={{
          background:    "var(--royal-blue-pale)",
          border:        "1px solid var(--royal-blue-mid)",
          borderRadius:  "var(--radius-sm)",
          padding:       "10px 14px",
          marginBottom:  "16px",
          fontSize:      "0.82rem",
          color:         "var(--royal-blue-dark)",
          fontFamily:    "var(--font-body)",
        }}>
          ✅ Good choice. If another option also feels like you, go ahead and pick it too — otherwise move on.
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
                display:      "flex",
                alignItems:   "center",
                gap:          "14px",
                padding:      "14px 18px",
                borderRadius: "var(--radius-md)",
                border:       active
                  ? "2px solid var(--royal-blue)"
                  : "2px solid var(--border)",
                background:   active
                  ? "var(--royal-blue-pale)"
                  : "var(--white)",
                cursor:       disabled ? "not-allowed" : "pointer",
                opacity:      disabled ? 0.4 : 1,
                textAlign:    "left",
                transition:   "all 0.18s ease",
                boxShadow:    active ? "var(--shadow-md)" : "var(--shadow-sm)",
                transform:    active ? "translateX(4px)" : "translateX(0)",
              }}
            >
              {/* Indicator */}
              <div style={{
                width:          "20px",
                height:         "20px",
                minWidth:       "20px",
                borderRadius:   indicatorRadius,
                border:         active
                  ? "2px solid var(--royal-blue)"
                  : "2px solid var(--text-light)",
                background:     active ? "var(--royal-blue)" : "transparent",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                transition:     "all 0.18s ease",
              }}>
                {active && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4L4 7.5L10 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Label */}
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize:   "0.95rem",
                fontWeight: active ? "600" : "400",
                color:      active ? "var(--royal-blue-dark)" : "var(--text-dark)",
                lineHeight: "1.4",
                transition: "all 0.18s ease",
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
