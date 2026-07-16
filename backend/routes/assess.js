

const express = require("express");
const router  = express.Router();
const { runCFFRAssessment, validateAnswers } = require("../engine/scorer");
const { saveRecord } = require("./export");

// TODO: confirm this matches what email.js actually exports.
// Guessed shape: module.exports = { sendResultsEmail: async (email, result) => {...} }
let sendResultsEmail = null;
try {
  ({ sendResultsEmail } = require("./email"));
} catch (err) {
  console.warn("[CFFR Assess] Could not load email module — emails will be skipped:", err.message);
}

// POST /api/assess
router.post("/assess", async (req, res) => {
  try {
    const { answers } = req.body;

    const { valid, errors } = validateAnswers(answers);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Some answers are missing or invalid. Please review the questions.",
        errors,
      });
    }

    const result = runCFFRAssessment(answers);

    // Save via the single shared storage in export.js — no duplicate file.
    try {
      saveRecord(answers, result.recommendations);
    } catch (err) {
      console.error("[CFFR Assess] Could not save record:", err.message);
      // Don't fail the whole request just because saving the record failed.
    }

    // Email the student their results, if we have an address and the email
    // module loaded. Failure to send should never block the response —
    // the student still sees their results on screen either way.
    const studentEmail = answers.email || answers.q_email || null;
    if (studentEmail && sendResultsEmail) {
      sendResultsEmail(studentEmail, result).catch((err) => {
        console.error("[CFFR Assess] Could not send results email:", err.message);
      });
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error("[CFFR Assess] Assessment error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

// GET /api/health
router.get("/health", (_req, res) => {
  res.status(200).json({
    status:    "ok",
    service:   "CFFR API",
    version:   "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
