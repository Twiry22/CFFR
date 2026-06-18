/**
 * AccessGate Component
 * Simple access code screen shown before the app loads.
 * Only users with the correct code can proceed.
 */

import { useState } from "react";

// ─── Access codes — add or remove codes here ──────────────────────────────────
// Each code is linked to a tester name for your records
const VALID_CODES = {
  "CFFR-T1": "Tester 1",
  "CFFR-T2": "Tester 2",
  "CFFR-T3": "Tester 3",
  "CFFR-T4": "Tester 4",
};

const AccessGate = ({ onUnlock }) => {
  const [code, setCode]       = useState("");
  const [error, setError]     = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = () => {
    const trimmed = code.trim().toUpperCase();

    if (VALID_CODES[trimmed]) {
      // Valid code — pass the tester name through
      onUnlock(VALID_CODES[trimmed]);
    } else {
      // Wrong code — shake and show error
      setError("That code isn't valid. Please check with your administrator.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setCode("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={{
      minHeight:       "100vh",
      background:      "var(--white)",
      display:         "flex",
      flexDirection:   "column",
      alignItems:      "center",
      justifyContent:  "center",
      padding:         "24px",
    }}>

      {/* Card */}
      <div style={{
        maxWidth:     "420px",
        width:        "100%",
        background:   "var(--white)",
        border:       "1px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        boxShadow:    "var(--shadow-lg)",
        padding:      "40px 36px",
        textAlign:    "center",
        animation:    shaking ? "shake 0.4s ease" : "none",
      }}>

        {/* Lock icon */}
        <div style={{
          width:          "64px",
          height:         "64px",
          borderRadius:   "50%",
          background:     "var(--royal-blue-pale)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          margin:         "0 auto 24px",
          fontSize:       "28px",
        }}>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily:   "var(--font-display)",
          fontSize:     "1.5rem",
          fontWeight:   "800",
          color:        "var(--text-dark)",
          marginBottom: "8px",
        }}>
          CFFR Access
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize:     "0.92rem",
          color:        "var(--text-mid)",
          lineHeight:   "1.6",
          marginBottom: "32px",
        }}>
          Enter your access code to continue.
        </p>

        {/* Input */}
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(""); }}
          onKeyDown={handleKeyDown}
          placeholder="Enter access code"
          autoFocus
          style={{
            width:        "100%",
            padding:      "14px 18px",
            borderRadius: "var(--radius-md)",
            border:       error
              ? "2px solid var(--error)"
              : "2px solid var(--border)",
            fontSize:     "1rem",
            fontFamily:   "var(--font-body)",
            color:        "var(--text-dark)",
            textAlign:    "center",
            letterSpacing:"0.12em",
            textTransform:"uppercase",
            outline:      "none",
            marginBottom: "12px",
            boxSizing:    "border-box",
            transition:   "border 0.2s ease",
          }}
        />

        {/* Error message */}
        {error && (
          <p style={{
            fontSize:     "0.82rem",
            color:        "var(--error)",
            marginBottom: "12px",
            lineHeight:   "1.5",
          }}>
            ⚠️ {error}
          </p>
        )}

        {/* Submit button */}
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={code.trim() === ""}
          style={{ marginTop: "8px" }}
        >
          Enter →
        </button>

        {/* Footer note */}
        <p style={{
          fontSize:   "0.75rem",
          color:      "var(--text-light)",
          marginTop:  "24px",
          lineHeight: "1.6",
        }}>
          Don't have a code? Contact the CFFR administrator.
        </p>

      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>

    </div>
  );
};

export default AccessGate;
