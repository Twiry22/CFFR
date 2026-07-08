/**
 * App.jsx  v1.4
 * Welcome is now the public entry point (no access code required).
 * Payment (Pesapal) now sits between Welcome and the Assessment questions.
 * AccessGate has been removed from the flow.
 */

import { useState } from "react";
import Welcome     from "./pages/Welcome";
import Payment     from "./pages/Payment";
import Assessment  from "./pages/Assessment";
import Results     from "./pages/Results";
import "./styles/global.css";

const PAGES = {
  WELCOME:    "welcome",
  PAYMENT:    "payment",
  ASSESSMENT: "assessment",
  RESULTS:    "results",
};

const App = () => {
  const [page, setPage]     = useState(PAGES.WELCOME);
  const [result, setResult] = useState(null);

  const handleStart    = () => setPage(PAGES.PAYMENT);
  const handlePaid     = () => setPage(PAGES.ASSESSMENT);
  const handleComplete = (data) => { setResult(data); setPage(PAGES.RESULTS); };
  const handleRetake   = () => { setResult(null); setPage(PAGES.WELCOME); };

  return (
    <>
      {page === PAGES.WELCOME    && <Welcome     onStart={handleStart} />}
      {page === PAGES.PAYMENT    && <Payment     onPaid={handlePaid} />}
      {page === PAGES.ASSESSMENT && <Assessment  onComplete={handleComplete} />}
      {page === PAGES.RESULTS    && <Results     result={result} onRetake={handleRetake} />}
    </>
  );
};

export default App;
