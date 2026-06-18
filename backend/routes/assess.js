/**
 * CFFR Assessment Route  v1.3
 * POST /api/assess        — receives answers, returns recommendations, logs response
 * POST /api/validate-code — validates and burns a one-time access code
 * GET  /api/export        — returns all logged responses as JSON (protected)
 * GET  /api/codes         — see status of all codes (protected)
 * POST /api/reset-code    — reset a used code (protected)
 * GET  /api/health        — confirms the API is running
 */

const express = require("express");
const router  = express.Router();
const fs      = require("fs");
const path    = require("path");
const { runCFFRAssessment, validateAnswers } = require("../engine/scorer");

// ─── File paths ───────────────────────────────────────────────────────────────
const DATA_DIR   = path.join(__dirname, "../data");
const LOG_FILE   = path.join(DATA_DIR, "responses.json");
const CODES_FILE = path.join(DATA_DIR, "codes.json");

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ─── One-time access codes ────────────────────────────────────────────────────
const DEFAULT_CODES = {
  "CFFR-T1": { name: "Tester 1", used: false, usedAt: null },
  "CFFR-T2": { name: "Tester 2", used: false, usedAt: null },
  "CFFR-T3": { name: "Tester 3", used: false, usedAt: null },
  "CFFR-T4": { name: "Tester 4", used: false, usedAt: null },
};

// Initialise codes file if it doesn't exist
if (!fs.existsSync(CODES_FILE)) {
  fs.writeFileSync(CODES_FILE, JSON.stringify(DEFAULT_CODES, null, 2), "utf8");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function readCodes() {
  try {
    return JSON.parse(fs.readFileSync(CODES_FILE, "utf8"));
  } catch {
    return { ...DEFAULT_CODES };
  }
}

function writeCodes(codes) {
  fs.writeFileSync(CODES_FILE, JSON.stringify(codes, null, 2), "utf8");
}

// ─── POST /api/validate-code ──────────────────────────────────────────────────
router.post("/validate-code", (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ success: false, message: "No code provided." });
    }

    const trimmed = code.trim().toUpperCase();
    const codes   = readCodes();

    // Code doesn't exist
    if (!codes[trimmed]) {
      return res.status(401).json({
        success: false,
        message: "That code isn't valid. Please check with your administrator.",
      });
    }

    // Code already used
    if (codes[trimmed].used) {
      return res.status(403).json({
        success: false,
        message: "This code has already been used and is no longer valid.",
      });
    }

    // ✅ Valid and unused — burn it now
    codes[trimmed].used   = true;
    codes[trimmed].usedAt = new Date().toISOString();
    writeCodes(codes);

    return res.status(200).json({
      success: true,
      name:    codes[trimmed].name,
      message: "Access granted.",
    });

  } catch (err) {
    console.error("[CFFR] Code validation error:", err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ─── Helper: log response ─────────────────────────────────────────────────────
function logResponse(answers, result) {
  try {
    let responses = [];
    if (fs.existsSync(LOG_FILE)) {
      const raw = fs.readFileSync(LOG_FILE, "utf8");
      responses = JSON.parse(raw);
    }

    const entry = {
      timestamp:       new Date().toISOString(),
      date:            new Date().toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi" }),
      time:            new Date().toLocaleTimeString("en-KE", { timeZone: "Africa/Nairobi" }),
      county:          answers.q9,
      budget:          answers.q10,
      techComfort:     answers.q6,
      subjectsEnjoyed: (answers.q1 || []).join(", "),
      subjectsBest:    (answers.q2 || []).join(", "),
      activity:        Array.isArray(answers.q3) ? answers.q3.join(", ") : answers.q3,
      personality:     Array.isArray(answers.q4) ? answers.q4.join(", ") : answers.q4,
      jobValues:       Array.isArray(answers.q5) ? answers.q5.join(", ") : answers.q5,
      careerSpaces:    (answers.q7 || []).join(", "),
      futureMindset:   Array.isArray(answers.q8) ? answers.q8.join(", ") : answers.q8,
      personalityType: result.studentProfile?.personalityType,
      techReadiness:   result.studentProfile?.techReadiness,
      isExploratory:   result.studentProfile?.exploratoryProfile ? "Yes" : "No",
      rank1Career:     result.recommendations?.[0]?.clusterName,
      rank1Score:      result.recommendations?.[0]?.matchScore,
      rank2Career:     result.recommendations?.[1]?.clusterName,
      rank2Score:      result.recommendations?.[1]?.matchScore,
      rank3Career:     result.recommendations?.[2]?.clusterName,
      rank3Score:      result.recommendations?.[2]?.matchScore,
      rank1Pathway:    result.recommendations?.[0]?.sssPathway,
    };

    responses.push(entry);
    fs.writeFileSync(LOG_FILE, JSON.stringify(responses, null, 2), "utf8");

  } catch (err) {
    console.error("[CFFR] Logging error:", err.message);
  }
}

// ─── POST /api/assess ─────────────────────────────────────────────────────────
router.post("/assess", (req, res) => {
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
    logResponse(answers, result);

    return res.status(200).json(result);

  } catch (err) {
    console.error("[CFFR] Assessment error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

// ─── GET /api/export ──────────────────────────────────────────────────────────
router.get("/export", (req, res) => {
  const secret = req.query.key;
  if (!secret || secret !== process.env.EXPORT_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorised." });
  }
  try {
    if (!fs.existsSync(LOG_FILE)) {
      return res.status(200).json({ success: true, count: 0, responses: [] });
    }
    const responses = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    return res.status(200).json({ success: true, count: responses.length, responses });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Could not read response log." });
  }
});

// ─── GET /api/codes ───────────────────────────────────────────────────────────
router.get("/codes", (req, res) => {
  const secret = req.query.key;
  if (!secret || secret !== process.env.EXPORT_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorised." });
  }
  return res.status(200).json({ success: true, codes: readCodes() });
});

// ─── POST /api/reset-code ─────────────────────────────────────────────────────
router.post("/reset-code", (req, res) => {
  const secret = req.query.key;
  if (!secret || secret !== process.env.EXPORT_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorised." });
  }
  const { code } = req.body;
  const trimmed  = code?.trim().toUpperCase();
  const codes    = readCodes();
  if (!codes[trimmed]) {
    return res.status(404).json({ success: false, message: "Code not found." });
  }
  codes[trimmed].used   = false;
  codes[trimmed].usedAt = null;
  writeCodes(codes);
  return res.status(200).json({ success: true, message: `Code ${trimmed} has been reset.` });
});

// ─── GET /api/health ──────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.status(200).json({
    status:    "ok",
    service:   "CFFR API",
    version:   "1.3.0",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
