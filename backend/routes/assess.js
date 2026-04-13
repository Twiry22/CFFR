/**
 * CFFR Assessment Route
 * POST /api/assess  — receives answers, returns 3 career recommendations
 * GET  /api/health  — confirms the API is running
 */

const express = require("express");
const router  = express.Router();
const { runCFFRAssessment, validateAnswers } = require("../engine/scorer");

// ─── POST /api/assess ─────────────────────────────────────────────────────────
router.post("/assess", (req, res) => {
  try {
    const { answers } = req.body;

    // 1. Validate the student's answers
    const { valid, errors } = validateAnswers(answers);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Some answers are missing or invalid. Please review the questions.",
        errors,
      });
    }

    // 2. Run the CFFR scoring engine
    const result = runCFFRAssessment(answers);

    // 3. Send back the recommendations
    return res.status(200).json(result);

  } catch (err) {
    console.error("[CFFR] Assessment error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating your career assessment. Please try again.",
    });
  }
});

// ─── GET /api/health ──────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.status(200).json({
    status:    "ok",
    service:   "CFFR API",
    version:   "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;