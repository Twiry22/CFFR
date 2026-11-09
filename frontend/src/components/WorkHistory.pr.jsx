/**
 * WorkHistory.pr.jsx  v1.0
 */

import { useState } from "react";
import SearchPicker from "./SearchPicker.pr";

const C = {
  brown:     "var(--pro-brown, #92400E)",
  brownDark: "var(--pro-brown-dark, #3E2A1D)",
  nudePale:  "var(--pro-nude-pale, #F5EBDF)",
  border:    "var(--pro-border, #E7DCCF)",
  textLight: "var(--pro-text-light, #9A8878)",
  textMid:   "var(--pro-text-mid, #6B5B4E)",
};

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: "8px",
  border: `2px solid ${C.border}`, background: "#FFFFFF", color: C.brownDark,
  fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: "1.5",
  outline: "none", boxSizing: "border-box",
};

const focusOn  = (e) => { e.target.style.borderColor = "var(--pro-brown, #92400E)"; };
const focusOff = (e) => { e.target.style.borderColor = "var(--pro-border, #E7DCCF)"; };

const blankEntry = (fields) => Object.fromEntries(fields.map((f) => [f.id, ""]));

export const isEntryComplete = (entry, fields) =>
  fields.every((f) => !f.required || String(entry[f.id] ?? "").trim() !== "");

const WorkHistory = ({ field, entries, onChange }) => {
  const fields = field.entryFields;
  const [openIndex, setOpenIndex] = useState(null);

  const update = (i, key, val) =>
    onChange(entries.map((e, idx) => (idx === i ? { ...e, [key]: val } : e)));

  const addEntry = () => {
    onChange([...entries, blankEntry(fields)]);
    setOpenIndex(entries.length);
  };

  const removeEntry = (i) => {
    onChange(entries.filter((_, idx) => idx !== i));
    setOpenIndex(null);
  };

  const labelFor = (fieldId, value) =>
    fields.find((f) => f.id === fieldId)?.options?.find((o) => o.id === value)?.label ?? value;

  const renderField = (f, entry, i) => {
    const val = entry[f.id] ?? "";
    const label = (
      <label style={{
        display: "block", fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "0.85rem", color: C.brownDark, marginBottom: "8px",
      }}>
        {f.label}{!f.required && <span style={{ fontWeight: 400, color: C.textLight }}> (optional)</span>}
      </label>
    );

    if (f.type === "single" && f.searchable) {
      return (
        <div key={f.id} style={{ marginBottom: "18px" }}>
          {label}
          <SearchPicker
            options={f.options}
            value={val ? [val] : []}
            maxPicks={1}
            onChange={(vals) => update(i, f.id, vals[0] ?? "")}
            placeholder="Search e.g. teacher, mpesa, sales…"
          />
        </div>
      );
    }

    if (f.type === "single") {
      return (
        <div key={f.id} style={{ marginBottom: "18px" }}>
          {label}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {f.options.map((o) => {
              const active = val === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => update(i, f.id, o.id)}
                  style={{
                    padding: "8px 14px", borderRadius: "999px", cursor: "pointer",
                    border: `2px solid ${active ? C.brown : C.border}`,
                    background: active ? C.nudePale : "#FFFFFF",
                    color: C.brownDark, fontFamily: "var(--font-body)",
                    fontSize: "0.88rem", fontWeight: active ? 600 : 400,
                  }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (f.type === "textarea") {
      return (
        <div key={f.id} style={{ marginBottom: "18px" }}>
          {label}
          <textarea
            value={val}
            maxLength={f.maxLength}
            rows={3}
            placeholder={f.placeholder}
            onChange={(e) => update(i, f.id, e.target.value)}
            onFocus={focusOn}
            onBlur={focusOff}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          {f.maxLength && (
            <div style={{ textAlign: "right", fontSize: "0.75rem", color: C.textLight, marginTop: "4px" }}>
              {val.length}/{f.maxLength}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={f.id} style={{ marginBottom: "18px" }}>
        {label}
        <input
          type="text"
          value={val}
          placeholder={f.placeholder}
          onChange={(e) => update(i, f.id, e.target.value)}
          onFocus={focusOn}
          onBlur={focusOff}
          style={inputStyle}
        />
      </div>
    );
  };

  return (
    <div className="fade-in-up">
      <div style={{
        display: "inline-flex", background: C.nudePale, color: C.brown,
        borderRadius: "6px", padding: "4px 14px", fontSize: "0.78rem", fontWeight: 700,
        fontFamily: "var(--font-display)", marginBottom: "16px", letterSpacing: "0.04em",
      }}>
        Section 2 · {entries.length}/{field.maxEntries} roles added
      </div>
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight: 700, color: C.brownDark, marginBottom: "8px", lineHeight: 1.3,
      }}>
        {field.section}
      </h2>
      <p style={{ fontSize: "0.9rem", color: C.textMid, marginBottom: "24px", lineHeight: 1.6 }}>
        {field.intro}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
        {entries.map((entry, i) => {
          const complete = isEntryComplete(entry, fields);
          const open = openIndex === i;

          if (!open) {
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                padding: "14px 16px", borderRadius: "8px", background: "#FFFFFF",
                border: `2px solid ${complete ? C.border : C.brown}`,
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: C.brownDark, fontFamily: "var(--font-display)" }}>
                    {entry.title || "Untitled role"}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: complete ? C.textLight : C.brown, marginTop: "2px" }}>
                    {complete
                      ? [labelFor("type", entry.type), labelFor("sector", entry.sector), entry.duration].filter(Boolean).join(" · ")
                      : "Some required details are missing"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button type="button" onClick={() => setOpenIndex(i)} style={smallBtn(true)}>Edit</button>
                  <button type="button" onClick={() => removeEntry(i)} style={smallBtn(false)}>Remove</button>
                </div>
              </div>
            );
          }

          return (
            <div key={i} style={{
              padding: "20px", borderRadius: "10px", background: "#FFFFFF",
              border: `2px solid ${C.brown}`,
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 700, color: C.brown,
                fontSize: "0.85rem", marginBottom: "16px",
              }}>
                Role {i + 1}
              </div>
              {fields.map((f) => renderField(f, entry, i))}
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => removeEntry(i)} style={smallBtn(false)}>Remove</button>
                <button
                  type="button"
                  disabled={!complete}
                  onClick={() => setOpenIndex(null)}
                  style={{ ...smallBtn(true), opacity: complete ? 1 : 0.4, cursor: complete ? "pointer" : "not-allowed" }}
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {entries.length < field.maxEntries && openIndex === null && (
        <button
          type="button"
          onClick={addEntry}
          style={{
            width: "100%", padding: "14px", borderRadius: "8px", cursor: "pointer",
            border: `2px dashed ${C.brown}`, background: "transparent", color: C.brown,
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.92rem",
          }}
        >
          + Add {entries.length ? "another" : "a"} role
        </button>
      )}

      {entries.length === 0 && field.minEntries === 0 && (
        <p style={{ fontSize: "0.82rem", color: C.textLight, marginTop: "12px", textAlign: "center" }}>
          Haven't held a role yet? That's fine. Click Next to carry on.
        </p>
      )}
    </div>
  );
};

const smallBtn = (primary) => ({
  padding: "8px 14px", borderRadius: "6px", cursor: "pointer",
  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8rem",
  border: primary ? "none" : `1px solid ${C.border}`,
  background: primary ? C.brown : "transparent",
  color: primary ? "#FBF7F1" : C.textMid,
});

export default WorkHistory;
