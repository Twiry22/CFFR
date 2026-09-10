/**
 * App.jsx  v1.7
 * Flow:
 *   Landing → (select product) → Welcome → Assessment (5 free Qs → Payment
 *   gate → 6 remaining Qs) → Results
 *   Global / Professional → Coming Soon message
 */

import { useState } from "react";
import LandingPage from "./pages/Landingpage";
import Welcome     from "./pages/Welcome";
import Assessment  from "./pages/Assessment";
import Results     from "./pages/Results";
import "./styles/global.css";

const PAGES = {
  LANDING:    "landing",
  WELCOME:    "welcome",
  ASSESSMENT: "assessment",
  RESULTS:    "results",
  SOON:       "soon",
};

// If we've just landed back from Pesapal, or via the owner bypass link,
// start directly on Assessment so it can restore its saved progress and
// resume on the payment gate (a full page reload from an external redirect
// resets all React state, so Assessment.jsx's sessionStorage restore is what
// actually gets the student back to where they left off).
const getInitialPage = () => {
  const params  = new URLSearchParams(window.location.search);
  const payment = params.get("payment");
  const bypass  = params.get("bypass");

  if (bypass === "cffr-admin-2025") return PAGES.ASSESSMENT;
  if (payment === "success" || payment === "failed") return PAGES.ASSESSMENT;

  return PAGES.LANDING;
};

const App = () => {
  const [page, setPage]               = useState(getInitialPage);
  const [result, setResult]           = useState(null);
  const [selectedProduct, setProduct] = useState(null);

  const handleSelectProduct = (productId) => {
    setProduct(productId);
    if (productId === "highschool") {
      setPage(PAGES.WELCOME);
    } else {
      setPage(PAGES.SOON);
    }
  };

  const handleStart    = () => setPage(PAGES.ASSESSMENT);
  const handleComplete = (data) => { setResult(data); setPage(PAGES.RESULTS); };
  const handleRetake   = () => { setResult(null); setPage(PAGES.WELCOME); };
  const handleBack     = () => setPage(PAGES.LANDING);

  // ── Coming Soon screen ──────────────────────────────────────────────────────
  if (page === PAGES.SOON) {
    const productNames = {
      global:       { name: "CFFR Global",       color: "#0D9488", icon: "🌍" },
      professional: { name: "CFFR Professional",  color: "#92400E", icon: "💼" },
    };
    const p = productNames[selectedProduct] || { name: "This product", color: "#2C5FC3", icon: "🚀" };

    return (
      <div style={{
        minHeight:      "100vh",
        background:     "#FFFFFF",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "40px 24px",
        textAlign:      "center",
      }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "20px" }}>{p.icon}</div>
        <div style={{
          display:      "inline-block",
          background:   "#F1F5F9",
          color:        "#64748B",
          borderRadius: "999px",
          padding:      "5px 16px",
          fontSize:     "0.75rem",
          fontWeight:   "700",
          letterSpacing:"0.08em",
          textTransform:"uppercase",
          marginBottom: "16px",
        }}>
          In Development
        </div>
        <h1 style={{
          fontFamily:   "var(--font-display)",
          fontSize:     "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight:   "800",
          color:        "#0F172A",
          marginBottom: "12px",
          letterSpacing:"-0.02em",
        }}>
          {p.name}
        </h1>
        <p style={{
          fontSize:     "1rem",
          color:        "#64748B",
          lineHeight:   "1.75",
          maxWidth:     "460px",
          marginBottom: "36px",
        }}>
          We're working hard on this one. It will be worth the wait — check back soon or reach out to us to be notified when it launches.
        </p>
        <div style={{
          display:      "flex",
          gap:          "12px",
          flexWrap:     "wrap",
          justifyContent:"center",
        }}>
          <button
            onClick={handleBack}
            style={{
              background:   p.color,
              color:        "#FFFFFF",
              border:       "none",
              borderRadius: "10px",
              padding:      "12px 28px",
              fontSize:     "0.92rem",
              fontWeight:   "700",
              fontFamily:   "var(--font-display)",
              cursor:       "pointer",
              transition:   "all 0.18s ease",
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            ← Back to Products
          </button>
          <a
            href="mailto:projectdatahb@gmail.com?subject=Notify me about CFFR"
            style={{
              background:   "transparent",
              color:        "#64748B",
              border:       "1px solid #E2E8F0",
              borderRadius: "10px",
              padding:      "12px 28px",
              fontSize:     "0.92rem",
              fontWeight:   "600",
              fontFamily:   "var(--font-display)",
              cursor:       "pointer",
              textDecoration:"none",
              transition:   "all 0.18s ease",
            }}
          >
            Notify Me →
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {page === PAGES.LANDING    && <LandingPage onSelectProduct={handleSelectProduct} />}
      {page === PAGES.WELCOME    && <Welcome      onStart={handleStart} />}
      {page === PAGES.ASSESSMENT && <Assessment   onComplete={handleComplete} />}
      {page === PAGES.RESULTS    && <Results      result={result} onRetake={handleRetake} />}
    </>
  );
};

export default App;
