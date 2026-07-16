/**
 * CFFR Assessment Route  v1.4
 * POST /api/assess        — receives answers, returns recommendations, logs response
 * POST /api/validate-code — validates and burns a one-time access code
 * POST /api/send-results  — emails results to student via Resend
 * GET  /api/export        — returns all logged responses as JSON (protected)
 * GET  /api/codes         — see status of all codes (protected)
 * POST /api/reset-code    — reset a used code (protected)
 * GET  /api/health        — confirms the API is running
 */

const express   = require("express");
const router    = express.Router();
const fs        = require("fs");
const path      = require("path");
const { Resend } = require("resend");
const { runCFFRAssessment, validateAnswers } = require("../engine/scorer");

// ─── Resend client ────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "CFFR Career Guidance <noreply@cffr.projectdatahub.org>";
const REPLY_TO   = "projectdatahb@gmail.com";

// ─── File paths ───────────────────────────────────────────────────────────────
const DATA_DIR   = path.join(__dirname, "../data");
const LOG_FILE   = path.join(DATA_DIR, "responses.json");
const CODES_FILE = path.join(DATA_DIR, "codes.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ─── One-time access codes ────────────────────────────────────────────────────
const DEFAULT_CODES = {
  "CFFR-T1": { name: "Tester 1", used: false, usedAt: null },
  "CFFR-T2": { name: "Tester 2", used: false, usedAt: null },
  "CFFR-T3": { name: "Tester 3", used: false, usedAt: null },
};

if (!fs.existsSync(CODES_FILE)) {
  fs.writeFileSync(CODES_FILE, JSON.stringify(DEFAULT_CODES, null, 2), "utf8");
}

function readCodes() {
  try { return JSON.parse(fs.readFileSync(CODES_FILE, "utf8")); }
  catch { return { ...DEFAULT_CODES }; }
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
    if (!codes[trimmed]) {
      return res.status(401).json({ success: false, message: "That code isn't valid. Please check with your administrator." });
    }
    if (codes[trimmed].used) {
      return res.status(403).json({ success: false, message: "This code has already been used and is no longer valid." });
    }
    codes[trimmed].used   = true;
    codes[trimmed].usedAt = new Date().toISOString();
    writeCodes(codes);
    return res.status(200).json({ success: true, name: codes[trimmed].name, message: "Access granted." });
  } catch (err) {
    console.error("[CFFR] Code validation error:", err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ─── Helper: build email HTML ─────────────────────────────────────────────────
function buildEmailHTML(recommendations, studentProfile, disclaimer) {

  const cardsHTML = recommendations.map((rec) => `
    <div style="margin-bottom:24px; border:1px solid #d0f0ed; border-radius:12px; overflow:hidden;">
      <!-- Card header -->
      <div style="background:#00B5A5; padding:16px 20px;">
        <div style="font-size:12px; color:rgba(255,255,255,0.8); margin-bottom:4px;">
          ${rankEmoji[rec.rank] } ${rec.rank === 1 ? "Best Match" : rec.rank === 2 ? "Strong Match" : "Good Match"} &nbsp;·&nbsp; ${rec.futureGrowthLabel}
        </div>
        <div style="font-size:20px; font-weight:800; color:#ffffff; margin-bottom:2px;">${rec.clusterName}</div>
        <div style="font-size:13px; color:rgba(255,255,255,0.85);">${rec.tagline}</div>
      </div>
      <!-- Score -->
      <div style="background:#f5fffe; padding:12px 20px; border-bottom:1px solid #d0f0ed;">
        <span style="font-size:26px; font-weight:800; color:#00B5A5;">${rec.matchScore}</span>
        <span style="font-size:14px; color:#666;">/100 overall match score</span>
      </div>
      <!-- Why it fits -->
      <div style="padding:14px 20px; border-bottom:1px solid #d0f0ed;">
        <div style="font-size:10px; font-weight:700; color:#00B5A5; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px;">Why it fits you</div>
        <div style="font-size:13.5px; color:#333; line-height:1.7;">${rec.whyItFitsYou}</div>
      </div>
      <!-- Careers -->
      <div style="padding:14px 20px; border-bottom:1px solid #d0f0ed;">
        <div style="font-size:10px; font-weight:700; color:#00B5A5; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px;">Example Careers</div>
        <div style="font-size:13px; color:#444; line-height:1.8;">${rec.careers.slice(0, 5).join(" &nbsp;·&nbsp; ")}</div>
      </div>
      <!-- Kenya outlook -->
      <div style="padding:14px 20px; border-bottom:1px solid #d0f0ed; background:#fafffe;">
        <div style="font-size:10px; font-weight:700; color:#00B5A5; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px;"> Kenya Outlook 2026–2030</div>
        <div style="font-size:13px; color:#444; line-height:1.7;">${rec.threeYearOutlook}</div>
      </div>
      <!-- Schools -->
      ${rec.recommendedSchools && rec.recommendedSchools.length > 0 ? `
      <div style="padding:14px 20px;">
        <div style="font-size:10px; font-weight:700; color:#00B5A5; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px;">🏫 Recommended Institutions</div>
        ${rec.recommendedSchools.slice(0, 2).map(school => `
          <div style="margin-bottom:8px; padding:10px 14px; background:#f5fffe; border-radius:8px; border:1px solid #d0f0ed;">
            <div style="font-size:13px; font-weight:700; color:#1A1A2E;">${school.name}
              <span style="font-size:11px; font-weight:600; color:${school.type === "Public" ? "#16A34A" : "#00B5A5"}; margin-left:8px; background:${school.type === "Public" ? "#DCFCE7" : "#E0F7F5"}; padding:2px 8px; border-radius:20px;">${school.type}</span>
            </div>
            <div style="font-size:12px; color:#00B5A5; margin:3px 0;">${school.course}</div>
            <div style="font-size:11.5px; color:#666;">📍 ${school.location} &nbsp;·&nbsp; 💰 ${school.annualCostRange}/yr</div>
          </div>
        `).join("")}
      </div>` : ""}
    </div>
  `).join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#f0f4f8; font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:620px; margin:32px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.10);">

    <!-- HEADER -->
    <div style="background:#00B5A5; padding:32px 36px 28px;">
      <div style="font-size:11px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.75); margin-bottom:6px;">Career Fit & Future Readiness</div>
      <div style="font-size:36px; font-weight:800; color:#ffffff; line-height:1; margin-bottom:6px;">Your CFFR Results</div>
      <div style="font-size:14px; color:rgba(255,255,255,0.85);">Kenya CBC Career Guidance · ${new Date().toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi", day: "numeric", month: "long", year: "numeric" })}</div>
    </div>

    <!-- PROFILE STRIP -->
    <div style="background:#1A1A2E; padding:16px 36px; display:flex; gap:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.08em;">Personality</td>
          <td style="font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.08em;">Tech Readiness</td>
          <td style="font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.08em;">Profile Type</td>
        </tr>
        <tr>
          <td style="font-size:13px; font-weight:700; color:#ffffff; padding-top:4px;">${studentProfile.personalityType}</td>
          <td style="font-size:13px; font-weight:700; color:#ffffff; padding-top:4px;">${studentProfile.techReadiness}</td>
          <td style="font-size:13px; font-weight:700; color:#00B5A5; padding-top:4px;">${studentProfile.exploratoryProfile ? "Exploratory" : "Focused"}</td>
        </tr>
      </table>
    </div>

    <!-- BODY -->
    <div style="padding:28px 36px;">

      <p style="font-size:14px; color:#444; line-height:1.7; margin-bottom:24px;">
        Based on your answers, here are your top career matches — selected from 8 Kenya-specific career clusters and scored against market demand, future relevance, your aptitude, interests, and accessibility.
      </p>

      ${cardsHTML}

      <!-- DISCLAIMER -->
      <div style="margin-top:24px; padding:14px 18px; background:#f5fffe; border-radius:10px; border:1px solid #d0f0ed;">
        <div style="font-size:12px; color:#555; line-height:1.7;"> ${disclaimer}</div>
      </div>

      <!-- RETAKE -->
      <div style="text-align:center; margin-top:28px;">
        <a href="https://cffr.projectdatahub.org" style="display:inline-block; background:#00B5A5; color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; padding:14px 36px; border-radius:10px;">
          Visit CFFR Again →
        </a>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background:#1A1A2E; padding:20px 36px; text-align:center;">
      <div style="font-size:13px; font-weight:700; color:#00B5A5; margin-bottom:4px;">cffr.projectdatahub.org</div>
      <div style="font-size:11.5px; color:rgba(255,255,255,0.45);">A ProjectDataHub Initiative · Kenya · 2026</div>
      <div style="font-size:11px; color:rgba(255,255,255,0.3); margin-top:6px;">Reply to this email if you have questions: ${REPLY_TO}</div>
    </div>

  </div>
</body>
</html>`;
}

// ─── POST /api/send-results ───────────────────────────────────────────────────
router.post("/send-results", async (req, res) => {
  try {
    const { email, recommendations, studentProfile, disclaimer } = req.body;

    // Basic email validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
      return res.status(400).json({ success: false, message: "No results to send." });
    }

    const htmlContent = buildEmailHTML(recommendations, studentProfile, disclaimer);

    const { data, error } = await resend.emails.send({
      from:     FROM_EMAIL,
      to:       [email.trim().toLowerCase()],
      reply_to: REPLY_TO,
      subject:  `Your CFFR Career Results — ${recommendations[0]?.clusterName || "Career Guidance"}`,
      html:     htmlContent,
    });

    if (error) {
      console.error("[CFFR] Resend error:", error);
      return res.status(500).json({ success: false, message: "Could not send email. Please try again." });
    }

    console.log("[CFFR] Email sent to:", email, "| ID:", data?.id);
    return res.status(200).json({ success: true, message: "Results sent! Check your inbox (and spam folder just in case)." });

  } catch (err) {
    console.error("[CFFR] Send results error:", err.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
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
      return res.status(400).json({ success: false, message: "Some answers are missing or invalid.", errors });
    }
    const result = runCFFRAssessment(answers);
    logResponse(answers, result);
    return res.status(200).json(result);
  } catch (err) {
    console.error("[CFFR] Assessment error:", err.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
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
  res.status(200).json({ status: "ok", service: "CFFR API", version: "1.4.0", timestamp: new Date().toISOString() });
});

module.exports = router;
