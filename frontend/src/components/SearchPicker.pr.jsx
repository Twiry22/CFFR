/**
 * SearchPicker.pr.jsx  v1.0
 * CFFR Professional: searchable list for long option sets
 * (Q7 career fields, Q14 counties, Track Record "Sector / industry").
 * Matches on label + keywords. "other-*" fallback options always stay visible
 * at the bottom so nobody gets stuck when their search finds nothing.
 *
 * value    : array of selected ids (single-select still passes [id])
 * onChange : receives the new array
 */

import { useMemo, useState } from "react";

const C = {
  brown:     "var(--pro-brown, #92400E)",
  brownDark: "var(--pro-brown-dark, #3E2A1D)",
  nude:      "var(--pro-nude, #E8D5C0)",
  nudePale:  "var(--pro-nude-pale, #F5EBDF)",
  border:    "var(--pro-border, #E7DCCF)",
  textLight: "var(--pro-text-light, #9A8878)",
};

const norm       = (s) => (s || "").toLowerCase().trim();
const optVal     = (o) => o.value ?? o.id;
const isFallback = (o) => String(optVal(o)).startsWith("other-");

const SearchPicker = ({
  options,
  value = [],
  onChange,
  maxPicks = 1,
  placeholder = "Start typing to search…",
}) => {
  const [query, setQuery] = useState("");
  const single = maxPicks === 1;

  const byId = useMemo(
    () => Object.fromEntries(options.map((o) => [optVal(o), o])),
    [options]
  );

  const { list, hitCount } = useMemo(() => {
    const q = norm(query);
    if (!q) return { list: options, hitCount: options.length };
    const hits = options.filter(
      (o) =>
        !isFallback(o) &&
        (norm(o.label).includes(q) || (o.keywords || []).some((k) => norm(k).includes(q)))
    );
    return { list: [...hits, ...options.filter(isFallback)], hitCount: hits.length };
  }, [query, options]);

  const full = !single && value.length >= maxPicks;

  const toggle = (id) => {
    if (single) {
      onChange([id]);
      setQuery("");
      return;
    }
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else if (value.length < maxPicks) onChange([...value, id]);
  };

  return (
    <div>
      {/* Selected chips */}
      {value.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          {value.map((id) => (
            <span
              key={id}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: C.nudePale, border: `1px solid ${C.nude}`, color: C.brownDark,
                borderRadius: "999px", padding: "6px 8px 6px 14px",
                fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)",
              }}
            >
              {byId[id]?.label ?? id}
              <button
                type="button"
                onClick={() => onChange(value.filter((v) => v !== id))}
                aria-label={`Remove ${byId[id]?.label ?? id}`}
                style={{
                  border: "none", background: C.brown, color: "#FFFFFF",
                  width: "20px", height: "20px", borderRadius: "50%",
                  cursor: "pointer", fontSize: "0.75rem", lineHeight: 1,
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 14px", borderRadius: "8px",
          border: `2px solid ${C.border}`, background: "#FFFFFF", color: C.brownDark,
          fontFamily: "var(--font-body)", fontSize: "0.95rem",
          outline: "none", boxSizing: "border-box", marginBottom: "8px",
        }}
        onFocus={(e) => { e.target.style.borderColor = "var(--pro-brown, #92400E)"; }}
        onBlur={(e)  => { e.target.style.borderColor = "var(--pro-border, #E7DCCF)"; }}
      />

      {query && hitCount === 0 && (
        <p style={{ fontSize: "0.82rem", color: C.textLight, margin: "4px 2px 8px" }}>
          Nothing matches "{query}". Try another word, or pick one of the options below.
        </p>
      )}

      <div
        role="listbox"
        aria-multiselectable={!single}
        style={{
          maxHeight: "320px", overflowY: "auto",
          border: `1px solid ${C.border}`, borderRadius: "8px", background: "#FFFFFF",
        }}
      >
        {list.map((o) => {
          const id       = optVal(o);
          const active   = value.includes(id);
          const disabled = full && !active;
          return (
            <button
              key={id}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => !disabled && toggle(id)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                width: "100%", textAlign: "left", padding: "11px 14px",
                border: "none", borderBottom: `1px solid ${C.border}`,
                background: active ? C.nudePale : "transparent",
                color: C.brownDark, fontFamily: "var(--font-body)", fontSize: "0.92rem",
                fontWeight: active ? 600 : 400,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1,
              }}
            >
              <span style={{
                width: "16px", height: "16px", minWidth: "16px",
                borderRadius: single ? "50%" : "4px",
                border: `2px solid ${active ? C.brown : C.textLight}`,
                background: active ? C.brown : "transparent",
              }} />
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPicker;
