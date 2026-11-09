/**
 * QuestionCard.pr.jsx  v1.1
 * CFFR Professional's question renderer.
 */

import "../styles/professionaltheme.pr.css";
import SearchPicker from "./SearchPicker.pr";

const SEARCH_THRESHOLD = 15; // more options than this → searchable list

const optVal = (o) => o.id ?? o.value;

const QuestionCard = ({ question, answer, onAnswer }) => {
  const { type, maxPicks = 1, options = [] } = question;
  const title = question.text ?? question.question;

  const selected = Array.isArray(answer) ? answer : answer ? [answer] : [];
  const isSingle = type === "single";
  const useSearch = question.searchable || options.length > SEARCH_THRESHOLD;

  const handleSelect = (value) => {
    if (isSingle) {
      onAnswer(value);
      return;
    }
    if (selected.includes(value)) {
      onAnswer(selected.filter((v) => v !== value));
    } else if (selected.length < maxPicks) {
      onAnswer([...selected, value]);
    }
  };

  const isSelected = (value) => selected.includes(value);
  const maxReached = (value) =>
    !isSingle && selected.length >= maxPicks && !isSelected(value);

  const badgeText = () => {
    if (type === "text")  return "Type your answer";
    if (isSingle)         return useSearch ? "Search or scroll · pick one" : "Select one";
    if (type === "multi") return `Select up to ${maxPicks} · ${selected.length} selected`;
    return "Select one";
  };

  const indicatorRadius = isSingle ? "50%" : "5px";

  const header = (
    <>
      <div style={{
        display: "inline-flex", alignItems: "center",
        background: "var(--pro-nude-pale)", color: "var(--pro-brown)",
        borderRadius: "6px", padding: "4px 14px",
        fontSize: "0.78rem", fontWeight: "700",
        fontFamily: "var(--font-display)", marginBottom: "16px", letterSpacing: "0.04em",
      }}>
        {question.sectionLabel ? `${question.sectionLabel} · ` : ""}{badgeText()}
      </div>
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight: "700", color: "var(--pro-brown-dark)",
        marginBottom: question.hint ? "8px" : "24px", lineHeight: "1.3",
      }}>
        {title}
      </h2>
      {question.hint && (
        <p style={{ fontSize: "0.88rem", color: "var(--pro-text-light)", marginBottom: "24px" }}>
          {question.hint}
        </p>
      )}
    </>
  );

  // ── Text type: open-ended reflection questions ─────────────────────────────
  if (type === "text") {
    return (
      <div className="fade-in-up">
        {header}
        <textarea
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder={question.placeholder || "Type your answer..."}
          rows={4}
          style={{
            width: "100%", padding: "14px 16px", borderRadius: "8px",
            border: "2px solid var(--pro-border)", background: "#FFFFFF",
            color: "var(--pro-brown-dark)", fontFamily: "var(--font-body)",
            fontSize: "0.95rem", lineHeight: "1.6", resize: "vertical",
            outline: "none", boxSizing: "border-box", transition: "border-color 0.18s ease",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--pro-brown)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "var(--pro-border)"; }}
        />
      </div>
    );
  }

  // ── Long / searchable lists ─────────────────────────────────────────────────
  if (useSearch) {
    return (
      <div className="fade-in-up">
        {header}
        <SearchPicker
          options={options}
          value={selected}
          maxPicks={isSingle ? 1 : maxPicks}
          onChange={(vals) => onAnswer(isSingle ? (vals[0] ?? "") : vals)}
        />
      </div>
    );
  }

  // ── single / multi buttons ──────────────────────────────────────────────────
  return (
    <div className="fade-in-up">
      {header}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {options.map((option) => {
          const value    = optVal(option);
          const active   = isSelected(value);
          const disabled = maxReached(value);

          return (
            <button
              key={value}
              type="button"
              onClick={() => !disabled && handleSelect(value)}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 18px", borderRadius: "8px",
                border:     active ? "2px solid var(--pro-brown)" : "2px solid var(--pro-border)",
                background: active ? "var(--pro-nude-pale)" : "#FFFFFF",
                cursor:     disabled ? "not-allowed" : "pointer",
                opacity:    disabled ? 0.4 : 1,
                textAlign:  "left", transition: "all 0.18s ease",
              }}
            >
              <div style={{
                width: "20px", height: "20px", minWidth: "20px",
                borderRadius: indicatorRadius,
                border:       active ? "2px solid var(--pro-brown)" : "2px solid var(--pro-text-light)",
                background:   active ? "var(--pro-brown)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.18s ease",
              }}>
                {active && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7.5L10 1" stroke="#FFFFFF" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.95rem",
                fontWeight: active ? "600" : "400", color: "var(--pro-brown-dark)",
                lineHeight: "1.4",
              }}>
                {option.icon ? `${option.icon} ` : ""}{option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
