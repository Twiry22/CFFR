/**
 * Payment.jsx
 * Shown before the assessment starts.
 * Student enters phone number → STK Push sent → polls for confirmation → proceeds.
 */

import { useState } from "react";
import api from "../services/api";

const POLL_INTERVAL_MS = 3000;  // check every 3 seconds
const POLL_MAX_TRIES   = 20;    // give up after 60 seconds

const Payment = ({ onPaid }) => {
  const [phone,   setPhone]   = useState("");
  const [step,    setStep]    = useState("form");   // "form" | "waiting" | "error"
  const [message, setMessage] = useState("");

  // ── Initiate STK Push ───────────────────────────────────────────────────────
  const handlePay = async () => {
    const cleaned = phone.replace(/\s+/g, "");
    if (!/^(07|01|\+2547|\+2541|2547|2541)\d{8}$/.test(cleaned)) {
      setMessage("Please enter a valid Safaricom number e.g. 0712 345 678");
      return;
    }

    setStep("waiting");
    setMessage("Sending payment request to your phone...");

    try {
      const res = await api.post("/api/pay", { phone: cleaned });
      if (!res.data.success) {
        setStep("error");
        setMessage(res.data.message || "Payment initiation failed. Please try again.");
        return;
      }

      const checkoutId = res.data.checkoutRequestId;
      setMessage("Check your phone and enter your Mpesa PIN ✅");
      pollPaymentStatus(checkoutId);

    } catch (err) {
      setStep("error");
      setMessage(err.response?.data?.message || "Could not reach payment server. Please try again.");
    }
  };

  // ── Poll backend until paid or failed ───────────────────────────────────────
  const pollPaymentStatus = (checkoutId) => {
    let tries = 0;

    const interval = setInterval(async () => {
      tries++;
      try {
        const res = await api.get(`/api/pay/status/${checkoutId}`);
        const { status } = res.data;

        if (status === "paid") {
          clearInterval(interval);
          setMessage("Payment confirmed! Loading your assessment...");
          setTimeout(() => onPaid(), 1200);
        } else if (status === "failed") {
          clearInterval(interval);
          setStep("error");
          setMessage("Payment was cancelled or failed. Please try again.");
        } else if (tries >= POLL_MAX_TRIES) {
          clearInterval(interval);
          setStep("error");
          setMessage("Payment timed out. If you were charged, please contact support.");
        }
      } catch {
        // network blip — keep polling
      }
    }, POLL_INTERVAL_MS);
  };

  // ── Retry ───────────────────────────────────────────────────────────────────
  const handleRetry = () => {
    setStep("form");
    setMessage("");
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight:      "100vh",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      background:     "var(--white)",
      padding:        "40px 24px",
    }}>

      {/* Card */}
      <div style={{
        width:        "100%",
        maxWidth:     "440px",
        background:   "var(--white)",
        borderRadius: "var(--radius-lg)",
        boxShadow:    "var(--shadow-lg)",
        padding:      "40px 36px",
        textAlign:    "center",
      }}>

        {/* Mpesa logo mark */}
        <div style={{
          width:          "64px",
          height:         "64px",
          borderRadius:   "50%",
          background:     "#4CAF50",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          margin:         "0 auto 24px",
          fontSize:       "1.6rem",
        }}>
          📱
        </div>

        <h2 style={{
          fontFamily:   "var(--font-display)",
          fontSize:     "1.4rem",
          fontWeight:   "800",
          color:        "var(--text-dark)",
          marginBottom: "8px",
        }}>
          Unlock Your Career Assessment
        </h2>

        <p style={{
          fontSize:     "0.92rem",
          color:        "var(--text-light)",
          marginBottom: "32px",
          lineHeight:   "1.6",
        }}>
          A one-time fee of <strong style={{ color: "var(--text-dark)" }}>KES 100</strong> unlocks
          your full personalised career report — matched to Kenya's job market.
        </p>

        {/* ── FORM STATE ── */}
        {step === "form" && (
          <>
            <div style={{ marginBottom: "16px", textAlign: "left" }}>
              <label style={{
                display:      "block",
                fontSize:     "0.82rem",
                fontWeight:   "700",
                color:        "var(--text-dark)",
                marginBottom: "8px",
                fontFamily:   "var(--font-display)",
              }}>
                Mpesa Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0712 345 678"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setMessage(""); }}
                onKeyDown={(e) => e.key === "Enter" && handlePay()}
                style={{
                  width:        "100%",
                  padding:      "14px 16px",
                  borderRadius: "var(--radius-md)",
                  border:       "2px solid var(--border)",
                  fontSize:     "1rem",
                  fontFamily:   "var(--font-body)",
                  outline:      "none",
                  boxSizing:    "border-box",
                  transition:   "border 0.18s ease",
                }}
                onFocus={(e)  => e.target.style.border = "2px solid var(--royal-blue)"}
                onBlur={(e)   => e.target.style.border = "2px solid var(--border)"}
              />
            </div>

            {message && (
              <p style={{
                fontSize:     "0.85rem",
                color:        "var(--error)",
                marginBottom: "12px",
                textAlign:    "left",
              }}>
                ⚠️ {message}
              </p>
            )}

            <button
              className="btn-primary"
              onClick={handlePay}
              style={{ width: "100%", marginTop: "8px" }}
            >
              Pay KES 100 via Mpesa →
            </button>

            <p style={{
              fontSize:   "0.78rem",
              color:      "var(--text-light)",
              marginTop:  "16px",
              lineHeight: "1.5",
            }}>
              🔒 Secure payment via Safaricom Mpesa.
              You will receive a PIN prompt on your phone.
            </p>
          </>
        )}

        {/* ── WAITING STATE ── */}
        {step === "waiting" && (
          <div style={{ padding: "16px 0" }}>
            <div className="spinner" style={{ margin: "0 auto 20px" }} />
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize:   "1rem",
              color:      "var(--text-dark)",
            }}>
              {message}
            </p>
            <p style={{
              fontSize:   "0.82rem",
              color:      "var(--text-light)",
              marginTop:  "8px",
            }}>
              Do not close this page. This may take up to 30 seconds.
            </p>
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {step === "error" && (
          <div style={{ padding: "8px 0" }}>
            <p style={{
              fontSize:     "0.92rem",
              color:        "var(--error)",
              marginBottom: "24px",
              lineHeight:   "1.5",
            }}>
              ⚠️ {message}
            </p>
            <button
              className="btn-primary"
              onClick={handleRetry}
              style={{ width: "100%" }}
            >
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Payment;
