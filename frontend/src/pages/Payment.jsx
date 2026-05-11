/**
 * Payment.jsx  v2.1 — Pesapal
 * ─────────────────────────────────────────────────────────────────────────────
 * v2.0 — Pesapal integration
 * v2.1 — Fee updated to KES 250
 *
 * Flow:
 * 1. Student enters phone + optional email
 * 2. Frontend calls /api/pay/initiate → gets Pesapal redirect URL
 * 3. Student is redirected to Pesapal's hosted payment page
 * 4. Student pays (Mpesa, Airtel, card, bank — their choice)
 * 5. Pesapal redirects back to frontend with ?payment=success&ref=CFFR-xxx
 * 6. Frontend detects success and proceeds to assessment
 */

import { useState, useEffect } from "react";
import api from "../services/api";

const Payment = ({ onPaid }) => {
  const [phone,    setPhone]    = useState("");
  const [email,    setEmail]    = useState("");
  const [step,     setStep]     = useState("form");   // "form" | "redirecting" | "waiting" | "error"
  const [message,  setMessage]  = useState("");
  const [orderRef, setOrderRef] = useState(null);

  // ── Check URL params — bypass or Pesapal return ───────────────────────────
  useEffect(() => {
    const params  = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const ref     = params.get("ref");

    // ── Owner bypass — access via ?bypass=cffr-admin-2025 ────────────────────
    if (params.get("bypass") === "cffr-admin-2025") {
      window.history.replaceState({}, "", window.location.pathname);
      onPaid();
      return;
    }

    if (payment === "success" && ref) {
      window.history.replaceState({}, "", window.location.pathname);
      setStep("waiting");
      setMessage("Payment confirmed! Loading your assessment...");
      setTimeout(() => onPaid(), 1500);
    } else if (payment === "failed") {
      window.history.replaceState({}, "", window.location.pathname);
      setStep("error");
      setMessage("Payment was not completed. Please try again.");
    }
  }, []);

  // ── Initiate payment ──────────────────────────────────────────────────────
  const handlePay = async () => {
    const cleanPhone = phone.replace(/\s+/g, "");
    const cleanEmail = email.trim();

    if (!cleanPhone && !cleanEmail) {
      setMessage("Please enter your phone number or email address.");
      return;
    }

    if (cleanPhone && !/^(07|01|\+2547|\+2541|2547|2541)\d{8}$/.test(cleanPhone)) {
      setMessage("Please enter a valid Kenyan phone number e.g. 0712 345 678");
      return;
    }

    setStep("redirecting");
    setMessage("Preparing your secure payment page...");

    try {
      const res = await api.post("/api/pay/initiate", {
        phone:     cleanPhone,
        email:     cleanEmail,
        firstName: "Student",
        lastName:  "User",
      });

      if (!res.data.success) {
        setStep("error");
        setMessage(res.data.message || "Could not initiate payment. Please try again.");
        return;
      }

      setOrderRef(res.data.orderRef);
      window.location.href = res.data.redirectUrl;

    } catch (err) {
      setStep("error");
      setMessage(err.response?.data?.message || "Could not reach payment server. Please try again.");
    }
  };

  const handleRetry = () => {
    setStep("form");
    setMessage("");
    setOrderRef(null);
  };

  // ── Render ────────────────────────────────────────────────────────────────
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
      <div style={{
        width:        "100%",
        maxWidth:     "440px",
        background:   "var(--white)",
        borderRadius: "var(--radius-lg)",
        boxShadow:    "var(--shadow-lg)",
        padding:      "40px 36px",
        textAlign:    "center",
      }}>

        {/* Icon */}
        <div style={{
          width:          "64px",
          height:         "64px",
          borderRadius:   "50%",
          background:     "var(--royal-blue-pale)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          margin:         "0 auto 24px",
          fontSize:       "1.8rem",
        }}>
          💳
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
          A one-time fee of{" "}
          <strong style={{ color: "var(--text-dark)" }}>KES 250</strong>{" "}
          unlocks your full personalised career report.
        </p>

        {/* Payment method icons */}
        <div style={{
          display:        "flex",
          justifyContent: "center",
          gap:            "10px",
          marginBottom:   "28px",
          flexWrap:       "wrap",
        }}>
          {["Mpesa", "Airtel", "Visa", "Bank"].map((method) => (
            <span key={method} style={{
              background:   "var(--royal-blue-pale)",
              color:        "var(--royal-blue)",
              borderRadius: "6px",
              padding:      "4px 12px",
              fontSize:     "0.75rem",
              fontWeight:   "700",
              fontFamily:   "var(--font-display)",
            }}>
              {method}
            </span>
          ))}
        </div>

        {/* ── FORM ── */}
        {step === "form" && (
          <>
            {/* Phone */}
            <div style={{ marginBottom: "14px", textAlign: "left" }}>
              <label style={{
                display:      "block",
                fontSize:     "0.82rem",
                fontWeight:   "700",
                color:        "var(--text-dark)",
                marginBottom: "6px",
                fontFamily:   "var(--font-display)",
              }}>
                Phone Number <span style={{ color: "var(--text-light)", fontWeight: 400 }}>(Mpesa / Airtel)</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 0712 345 678"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setMessage(""); }}
                style={{
                  width:        "100%",
                  padding:      "13px 16px",
                  borderRadius: "var(--radius-md)",
                  border:       "2px solid var(--border)",
                  fontSize:     "1rem",
                  fontFamily:   "var(--font-body)",
                  outline:      "none",
                  boxSizing:    "border-box",
                }}
                onFocus={(e) => e.target.style.border = "2px solid var(--royal-blue)"}
                onBlur={(e)  => e.target.style.border = "2px solid var(--border)"}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <label style={{
                display:      "block",
                fontSize:     "0.82rem",
                fontWeight:   "700",
                color:        "var(--text-dark)",
                marginBottom: "6px",
                fontFamily:   "var(--font-display)",
              }}>
                Email Address <span style={{ color: "var(--text-light)", fontWeight: 400 }}>(optional — for card payments)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. student@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setMessage(""); }}
                onKeyDown={(e) => e.key === "Enter" && handlePay()}
                style={{
                  width:        "100%",
                  padding:      "13px 16px",
                  borderRadius: "var(--radius-md)",
                  border:       "2px solid var(--border)",
                  fontSize:     "1rem",
                  fontFamily:   "var(--font-body)",
                  outline:      "none",
                  boxSizing:    "border-box",
                }}
                onFocus={(e) => e.target.style.border = "2px solid var(--royal-blue)"}
                onBlur={(e)  => e.target.style.border = "2px solid var(--border)"}
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
              style={{ width: "100%" }}
            >
              Pay KES 250 Securely →
            </button>

            <p style={{
              fontSize:   "0.76rem",
              color:      "var(--text-light)",
              marginTop:  "14px",
              lineHeight: "1.5",
            }}>
              🔒 Powered by Pesapal. You will be redirected to a secure
              payment page. Pay via Mpesa, Airtel Money, Visa, or bank transfer.
            </p>
          </>
        )}

        {/* ── REDIRECTING ── */}
        {step === "redirecting" && (
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
            <p style={{ fontSize: "0.82rem", color: "var(--text-light)", marginTop: "8px" }}>
              You will be redirected to Pesapal's secure payment page shortly.
            </p>
          </div>
        )}

        {/* ── WAITING (returned from Pesapal) ── */}
        {step === "waiting" && (
          <div style={{ padding: "16px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>✅</div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize:   "1rem",
              color:      "var(--success)",
            }}>
              {message}
            </p>
          </div>
        )}

        {/* ── ERROR ── */}
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
            <button className="btn-primary" onClick={handleRetry} style={{ width: "100%" }}>
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Payment;
