/**
 * App.jsx  v1.3
 * Added AccessGate as the first screen.
 * Only users with a valid code can proceed.
 */

import { useState } from "react";
import AccessGate  from "./components/accessgate";
import Welcome     from "./pages/Welcome";
import Assessment  from "./pages/Assessment";
import Results     from "./pages/Results";
import "./styles/global.css";

const PAGES = {
  GATE:       "gate",
  WELCOME:    "welcome",
  ASSESSMENT: "assessment",
  RESULTS:    "results",
};

const App = () => {
  const [page, setPage]         = useState(PAGES.GATE);
  const [result, setResult]     = useState(null);
  const [testerName, setTester] = useState("");

  const handleUnlock   = (name) => { setTester(name); setPage(PAGES.WELCOME); };
  const handleStart    = () => setPage(PAGES.ASSESSMENT);
  const handleComplete = (data) => { setResult(data); setPage(PAGES.RESULTS); };
  const handleRetake   = () => { setResult(null); setPage(PAGES.WELCOME); };

  return (
    <>
      {page === PAGES.GATE       && <AccessGate  onUnlock={handleUnlock} />}
      {page === PAGES.WELCOME    && <Welcome      onStart={handleStart} testerName={testerName} />}
      {page === PAGES.ASSESSMENT && <Assessment   onComplete={handleComplete} />}
      {page === PAGES.RESULTS    && <Results      result={result} onRetake={handleRetake} />}
    </>
  );
};

export default App;
