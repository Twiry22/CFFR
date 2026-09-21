/**
 * QuestionCard.pr.jsx  v1.0
 * CFFR Professional's question renderer.
 * Note: CountySelect is reused as-is from the shared components folder.
 * I don't have its source, so its internal styling (colors) is unverified —
 * if it turns out to be blue-themed internally too, flag it and I'll build
 * a pro-themed replacement.
 */ 

import "../../styles/professional-theme.pr.css";
import CountySelect from "../CountySelect";

const QuestionCard = ({ question, answer, onAnswer }) => {
  const { type, maxPicks = 1 } = question;

  const selected = Array.isArray(answer) ? answer : answer ? [answer] : [];

  const handleSelect = (value) => {
    if (type === "single" || type === "county") {
      const strValue = Array.isArray(value) ? value[0] : value;
      onAnswer(strValue);
      return;
    }
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
    type !== "single" && type !== "county" &&
    selected.length >= maxPicks && !isSelected(value);

  const badgeText = () => {
    if (type === "single")  return "Select one";
    if (type === "county")  return "Search or scroll";
    if (type === "text")    return "Type your answer";
    if (type === "multi")   return `Select up to ${maxPicks} · ${selected.length} selected`;
    if (type === "dual") {
      if (selected.length === 0) return "Select 1, or 2 if you're truly torn";
      if (selected.length === 1) return "1 selected — or pick a 2nd if unsure";
      return "2 selected";
    }
    return "Select one";
  };

  const indicatorRadius = type === "single" ? "50%" : "5px";

  const Badge = () => (
    <div style={{
      display: "inline-flex", alignItems: "center",
      background: "var(--pro-nude-pale)", color: "var(--pro-brown)",
      borderRadius: "6px", padding: "4px 14px",
      fontSize: "0.78rem", fontWeight: "700",
      fontFamily: "var(--font-display)", marginBottom: "16px", letterSpacing: "0.04em",
    }}>
      {question.number ? `Q${question.number} · ` : ""}{badgeText()}
    </div>
  );

  const Heading = () => (
    <>
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight: "700", color: "var(--pro-brown-dark)", marginBottom: "8px", lineHeight: "1.3",
      }}>
        {question.question}
      </h2>
      {question.hint && (
        <p style={{
          fontSize: "0.88rem", color: "var(--pro-text-light)", marginBottom: "24px",
          fontStyle: type === "dual" ? "italic" : "normal",
        }}>
          {question.hint}
        </p>
      )}
    </>
  );

  // ── Text type — open-ended reflection questions ────────────────────────────
  if (type === "text") {
    return (
      <div className="fade-in-up">
        <Badge />
        <Heading />
        <textarea
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder={question.placeholder || "Type your answer..."}
          rows={4}
          style={{
            width:        "100%",
            padding:      "14px 16px",
            borderRadius: "8px",
            border:       "2px solid var(--pro-border)",
            background:   "#FFFFFF",
            color:        "var(--pro-brown-dark)",
            fontFamily:   "var(--font-body)",
            fontSize:     "0.95rem",
            lineHeight:   "1.6",
            resize:       "vertical",
            outline:      "none",
            boxSizing:    "border-box",
            transition:   "border-color 0.18s ease",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--pro-brown)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "var(--pro-border)"; }}
        />
      </div>
    );
  }

  // ── County — searchable dropdown ────────────────────────────────────────────
  if (type === "county") {
    return (
      <div className="fade-in-up">
        <Badge />
        <Heading />
        <CountySelect
          options={question.options}
          value={answer || ""}
          onSelect={(val) => {
            const strVal = Array.isArray(val) ? val[0] : val;
            onAnswer(strVal);
          }}
        />
        {answer && (
          <div style={{
            marginTop: "12px", padding: "10px 14px",
            background: "var(--pro-nude-pale)", borderRadius: "6px",
            fontSize: "0.85rem", color: "var(--pro-brown)", fontWeight: "600",
          }}>
            ✓ {answer} selected: click Next to continue
          </div>
        )}
      </div>
    );
  }

  // ── single / multi / dual ────────────────────────────────────────────────
  return (
    <div className="fade-in-up">
      <Badge />
      <Heading />

      {type === "dual" && selected.length === 1 && (
        <div style={{
          background: "var(--pro-nude-pale)", border: "1px solid var(--pro-nude)",
          borderRadius: "8px", padding: "10px 14px",
          marginBottom: "16px", fontSize: "0.82rem", color: "var(--pro-brown-dark)",
        }}>
          ✓ Good choice. Pick a 2nd if another also feels like you, otherwise click Next.
        </div>
      )}

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
                borderRadius:   indicatorRadius,
                border:         active ? "2px solid var(--pro-brown)" : "2px solid var(--pro-text-light)",
                background:     active ? "var(--pro-brown)" : "transparent",
                display:        "flex", alignItems: "center", justifyContent: "center",
                transition:     "all 0.18s ease",
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
                fontWeight: active ? "600" : "400",
                color:      active ? "var(--pro-brown-dark)" : "var(--pro-brown-dark)",
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
