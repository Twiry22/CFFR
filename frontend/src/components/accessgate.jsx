/**
 * AccessGate Component  v1.1
 * Validates access codes against the backend — one-time use only.
 * Once a code is used, it cannot be used again by anyone.
 */

import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AccessGate = ({ onUnlock }) => {
  const [code, setCode]         = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [shaking, setShaking]   = useState(false);

  const handleSubmit = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    try {
      const res  = await fetch(`${API_BASE}/api/validate-code`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ code: trimmed }),
      });

      const data = await res.json();

      if (data.success) {
        // Code valid and now burned — let them in
        onUnlock(data.name);
      } else {
        // Invalid or already used
        setError(data.message);
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
        setCode("");
      }

    } catch {
      setError("Could not reach the server. Please check your connection.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "var(--white)",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "24px",
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
          disabled={loading}
          style={{
            width:         "100%",
            padding:       "14px 18px",
            borderRadius:  "var(--radius-md)",
            border:        error
              ? "2px solid var(--error)"
              : "2px solid var(--border)",
            fontSize:      "1rem",
            fontFamily:    "var(--font-body)",
            color:         "var(--text-dark)",
            textAlign:     "center",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            outline:       "none",
            marginBottom:  "12px",
            boxSizing:     "border-box",
            transition:    "border 0.2s ease",
            opacity:       loading ? 0.6 : 1,
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
          disabled={code.trim() === "" || loading}
          style={{ marginTop: "8px" }}
        >
          {loading ? "Checking..." : "Enter →"}
        </button>

        {/* Footer note */}
        <p style={{
          fontSize:   "0.75rem",
          color:      "var(--text-light)",
          marginTop:  "24px",
          lineHeight: "1.6",
        }}>
          Each access code is single-use only.
          Contact the CFFR administrator for a code.
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
