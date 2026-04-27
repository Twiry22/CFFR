/**
 * App.jsx
 * Root component — manages which page is shown.
 *
 * UPDATED: Free trial logic added.
 * - During trial  → Welcome → Assessment → Results (no payment)
 * - After trial   → Welcome → Payment → Assessment → Results
 * - TrialBanner   → shown on every page during trial with live countdown
 */

import { useState } from "react";
import Welcome     from "./pages/Welcome";
import Payment     from "./pages/Payment";
import Assessment  from "./pages/Assessment";
import Results     from "./pages/Results";
import TrialBanner from "./components/TrialBanner";
import { IS_TRIAL_ACTIVE } from "./config/trialConfig";
import "./styles/global.css";

const PAGES = {
  WELCOME:    "welcome",
  PAYMENT:    "payment",
  ASSESSMENT: "assessment",
  RESULTS:    "results",
};

const App = () => {
  const [page,   setPage]   = useState(PAGES.WELCOME);
  const [result, setResult] = useState(null);

  // During trial: skip payment entirely
  const handleStart = () => {
    if (IS_TRIAL_ACTIVE) {
      setPage(PAGES.ASSESSMENT);   // free — go straight to assessment
    } else {
      setPage(PAGES.PAYMENT);      // trial over — pay first
    }
  };

  const handlePaid     = () => setPage(PAGES.ASSESSMENT);
  const handleComplete = (data) => { setResult(data); setPage(PAGES.RESULTS); };
  const handleRetake   = () => { setResult(null); setPage(PAGES.WELCOME); };

  return (
    <>
      {/* Trial countdown banner — visible on every page during trial */}
      <TrialBanner />

      {page === PAGES.WELCOME    && <Welcome    onStart={handleStart} />}
      {page === PAGES.PAYMENT    && <Payment    onPaid={handlePaid} />}
      {page === PAGES.ASSESSMENT && <Assessment onComplete={handleComplete} />}
      {page === PAGES.RESULTS    && <Results    result={result} onRetake={handleRetake} />}
    </>
  );
};

export default App;
