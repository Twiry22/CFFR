/**
 * App.jsx  v1.8
 * Flow:
 *   Landing → (select product) → Welcome → Assessment (5 free Qs → Payment
 *   gate → 6 remaining Qs) → Results
 *   Professional → ProWelcome → ProAssessment (3 free Qs → Payment gate →
 *   Track Record → remaining Qs)
 *   Global → Coming Soon message
 *
 */

import { useState, useEffect, useCallback } from "react";
import LandingPage from "./pages/LandingPage";
import Welcome     from "./pages/Welcome";
import Assessment  from "./pages/Assessment";
import Results     from "./pages/Results";
import ProWelcome  from "./pages/Welcome.pr";
import ProAssessment from "./pages/Assessment.pr";
import "./styles/global.css";

const PAGES = {
  LANDING:        "landing",
  WELCOME:        "welcome",
  ASSESSMENT:     "assessment",
  RESULTS:        "results",
  SOON:           "soon",
  PRO_WELCOME:    "pro-welcome",
  PRO_ASSESSMENT: "pro-assessment",
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

  // On first mount, replace (not push) so the very first history entry
  // represents the current page — otherwise the initial load has no state
  // attached and a back-press from it would land on `undefined`.
  useEffect(() => {
    window.history.replaceState({ page }, "", window.location.pathname + window.location.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Every real navigation should go through this instead of setPage
  // directly — it updates state AND pushes a browser history entry, which
  // is what the back/forward buttons actually read from. Without this,
  // "page" is just in-memory state with nothing for the browser to go back
  // to, which is exactly why only a hard refresh used to reset anything.
  const navigate = useCallback((nextPage) => {
    setPage(nextPage);
    window.history.pushState({ page: nextPage }, "", window.location.pathname);
  }, []);

  // Back/forward buttons fire this — sync state to whatever page that
  // history entry represents instead of leaving state untouched.
  useEffect(() => {
    const handlePopState = (event) => {
      setPage(event.state?.page || PAGES.LANDING);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Result data only ever lives in memory, not in the history entry — so
  // landing on Results via back/forward after a refresh would otherwise
  // render it with nothing to show. Bounce to Landing instead of breaking.
  useEffect(() => {
    if (page === PAGES.RESULTS && !result) {
      navigate(PAGES.LANDING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, result]);

  const handleSelectProduct = (productId) => {
    setProduct(productId);
    if (productId === "highschool") {
      navigate(PAGES.WELCOME);
    } else if (productId === "professional") {
      navigate(PAGES.PRO_WELCOME);
    } else {
      navigate(PAGES.SOON);
    }
  };

  const handleStart      = () => navigate(PAGES.ASSESSMENT);
  const handleProStart   = () => navigate(PAGES.PRO_ASSESSMENT);
  const handleComplete   = (data) => { setResult(data); navigate(PAGES.RESULTS); };
  const handleRetake     = () => { setResult(null); navigate(PAGES.WELCOME); };
  const handleBack       = () => navigate(PAGES.LANDING);

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
          We're working hard on this one. Check back soon!
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
      {page === PAGES.LANDING        && <LandingPage onSelectProduct={handleSelectProduct} />}
      {page === PAGES.WELCOME        && <Welcome      onStart={handleStart} onBack={handleBack} />}
      {page === PAGES.ASSESSMENT     && <Assessment   onComplete={handleComplete} />}
      {page === PAGES.RESULTS        && <Results      result={result} onRetake={handleRetake} />}
      {page === PAGES.PRO_WELCOME    && <ProWelcome   onStart={handleProStart} onBack={handleBack} />}
      {page === PAGES.PRO_ASSESSMENT && <ProAssessment onBack={handleBack} />}
    </>
  );
};

export default App;
