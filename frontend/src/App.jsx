/**
 * App.jsx
 * Root component — manages which page is shown.
 * UPDATED: Added Payment gate between Welcome and Assessment.
 */

import { useState } from "react";
import Welcome    from "./pages/Welcome";
import Payment    from "./pages/Payment";       // ← NEW
import Assessment from "./pages/Assessment";
import Results    from "./pages/Results";
import "./styles/global.css";

const PAGES = {
  WELCOME:    "welcome",
  PAYMENT:    "payment",    // ← NEW
  ASSESSMENT: "assessment",
  RESULTS:    "results",
};

const App = () => {
  const [page,   setPage]   = useState(PAGES.WELCOME);
  const [result, setResult] = useState(null);

  const handleStart    = () => setPage(PAGES.PAYMENT);              // Welcome → Payment
  const handlePaid     = () => setPage(PAGES.ASSESSMENT);           // Payment → Assessment
  const handleComplete = (data) => { setResult(data); setPage(PAGES.RESULTS); };
  const handleRetake   = () => { setResult(null); setPage(PAGES.WELCOME); };

  return (
    <>
      {page === PAGES.WELCOME    && <Welcome    onStart={handleStart} />}
      {page === PAGES.PAYMENT    && <Payment    onPaid={handlePaid} />}
      {page === PAGES.ASSESSMENT && <Assessment onComplete={handleComplete} />}
      {page === PAGES.RESULTS    && <Results    result={result} onRetake={handleRetake} />}
    </>
  );
};

export default App;
