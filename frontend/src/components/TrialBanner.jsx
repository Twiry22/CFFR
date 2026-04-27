/**
 * TrialBanner.jsx
 * Sticky top banner shown during the free trial period.
 * Displays a live countdown timer with days, hours, minutes, seconds.
 * Automatically hides itself when the trial ends.
 */

import { useState, useEffect } from "react";
import { TRIAL_END_DATE, IS_TRIAL_ACTIVE } from "../config/trialConfig";

const TrialBanner = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = TRIAL_END_DATE - new Date();
    if (diff <= 0) return null;
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    if (!IS_TRIAL_ACTIVE) return;
    const timer = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Don't render if trial is over or timer ran out
  if (!IS_TRIAL_ACTIVE || !timeLeft) return null;

  const pad = (n) => String(n).padStart(2, "0");

  const unitStyle = {
    display:       "flex",
    flexDirection: "column",
    alignItems:    "center",
    minWidth:      "36px",
  };

  const numStyle = {
    fontFamily:  "var(--font-display)",
    fontWeight:  "800",
    fontSize:    "1.1rem",
    lineHeight:  "1",
    color:       "#ffffff",
  };

  const labelStyle = {
    fontSize:    "0.58rem",
    color:       "rgba(255,255,255,0.75)",
    marginTop:   "2px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  const sepStyle = {
    fontWeight: "800",
    fontSize:   "1rem",
    color:      "rgba(255,255,255,0.5)",
    margin:     "0 2px",
    paddingBottom: "10px",
  };

  return (
    <div style={{
      width:          "100%",
      background:     "linear-gradient(90deg, #1a3fa8 0%, #2563eb 50%, #1a3fa8 100%)",
      padding:        "10px 20px",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      gap:            "16px",
      flexWrap:       "wrap",
      zIndex:         1000,
      position:       "sticky",
      top:            0,
      boxShadow:      "0 2px 12px rgba(37,99,235,0.35)",
    }}>

      {/* Label */}
      <span style={{
        fontFamily:  "var(--font-display)",
        fontWeight:  "700",
        fontSize:    "0.85rem",
        color:       "#ffffff",
        letterSpacing: "0.02em",
      }}>
        🎉 FREE TRIAL — Full access ends in:
      </span>

      {/* Countdown */}
      <div style={{
        display:     "flex",
        alignItems:  "center",
        gap:         "4px",
        background:  "rgba(0,0,0,0.2)",
        borderRadius:"8px",
        padding:     "6px 14px",
      }}>
        <div style={unitStyle}>
          <span style={numStyle}>{pad(timeLeft.days)}</span>
          <span style={labelStyle}>days</span>
        </div>
        <span style={sepStyle}>:</span>
        <div style={unitStyle}>
          <span style={numStyle}>{pad(timeLeft.hours)}</span>
          <span style={labelStyle}>hrs</span>
        </div>
        <span style={sepStyle}>:</span>
        <div style={unitStyle}>
          <span style={numStyle}>{pad(timeLeft.minutes)}</span>
          <span style={labelStyle}>min</span>
        </div>
        <span style={sepStyle}>:</span>
        <div style={unitStyle}>
          <span style={numStyle}>{pad(timeLeft.seconds)}</span>
          <span style={labelStyle}>sec</span>
        </div>
      </div>

      {/* After-trial notice */}
      <span style={{
        fontSize:   "0.78rem",
        color:      "rgba(255,255,255,0.8)",
        fontStyle:  "italic",
      }}>
        After trial: KES 100 per assessment
      </span>

    </div>
  );
};

export default TrialBanner;
