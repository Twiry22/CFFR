/**
 * CFFR Results Email Route  v1.0
 * POST /api/results/email — sends career results to student's email
 * ─────────────────────────────────────────────────────────────────────────────
 * Uses Nodemailer with Gmail.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  TO CHANGE THE SENDER EMAIL — update these two env variables        │
 * │  in your Render dashboard under Environment:                        │
 * │                                                                     │
 * │  GMAIL_USER = yourname@gmail.com   ← the Gmail you send FROM       │
 * │  GMAIL_PASS = xxxx xxxx xxxx xxxx  ← Gmail App Password (not your  │
 * │                                       normal Gmail password)        │
 * │                                                                     │
 * │  HOW TO GET A GMAIL APP PASSWORD:                                   │
 * │  1. Go to myaccount.google.com/security                             │
 * │  2. Enable 2-Step Verification (must be on)                         │
 * │  3. Search "App passwords" at the top                               │
 * │  4. Create one → name it "CFFR" → copy the 16-character password   │
 * │  5. Paste it as GMAIL_PASS in Render                                │
 * │                                                                     │
 * │  Never use your real Gmail password — App Password only.            │
 * └─────────────────────────────────────────────────────────────────────┘
 */

const express    = require("express");
const nodemailer = require("nodemailer");
const router     = express.Router();

// ─── Transporter ──────────────────────────────────────────────────────────────
// To switch from Gmail to a custom domain later, replace this with:
//   host: "smtp.yourdomain.com", port: 465, secure: true,
//   auth: { user: "results@yourdomain.com", pass: "..." }

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,  // ← Render env: your Gmail address
      pass: process.env.GMAIL_PASS,  // ← Render env: Gmail App Password
    },
  });

// ─── Email HTML builder ───────────────────────────────────────────────────────

const buildEmailHtml = (recommendations) => {
  const rankLabel = ["Best Match", "Strong Match", "Good Match"];

  const cards = recommendations.map((rec, i) => `
    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:20px;background:#ffffff;">
      <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 6px 0;">
        #${i + 1} ${rankLabel[i] || "Match"}
      </p>
      <h2 style="font-size:20px;font-weight:800;color:#1e293b;margin:0 0 4px 0;">${rec.specificCareer}</h2>
      <p style="font-size:13px;color:#64748b;margin:0 0 4px 0;">${rec.clusterName}</p>
      <p style="font-size:13px;color:#1e40af;margin:0 0 16px 0;">${rec.tagline}</p>

      <div style="background:#eff6ff;border-radius:8px;padding:12px 16px;margin-bottom:16px;">
        <span style="font-size:28px;font-weight:800;color:#1e40af;">
          ${rec.matchScore}<span style="font-size:14px;font-weight:500;">/100</span>
        </span>
        <span style="font-size:13px;color:#475569;margin-left:12px;">Overall Match Score</span>
      </div>

      <p style="font-size:13px;color:#334155;line-height:1.7;border-left:3px solid #1e40af;padding-left:12px;margin:0 0 16px 0;">
        ${rec.whyItFitsYou}
      </p>

      <p style="font-size:12px;color:#16a34a;font-weight:700;margin:0 0 16px 0;">
       Recommended Pathway: <span style="font-weight:400;color:#334155;">${rec.sssPathway}</span>
      </p>

      ${rec.recommendedSchools && rec.recommendedSchools.length > 0 ? `
        <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 10px 0;">
          Recommended Schools
        </p>
        ${rec.recommendedSchools.map(s => `
          <div style="background:#f8fafc;border-radius:8px;padding:10px 14px;margin-bottom:8px;">
            <p style="font-weight:700;font-size:13px;color:#1e293b;margin:0 0 2px 0;">${s.name}</p>
            <p style="font-size:12px;color:#64748b;margin:0 0 2px 0;">${s.course}</p>
            <p style="font-size:12px;color:#475569;margin:0 0 4px 0;">${s.annualCostRange} · ${s.levelLabel}</p>
            <a href="${s.website}" style="font-size:12px;color:#1e40af;">${s.website}</a>
            ${s.parallelAdmission ? `
              <div style="margin-top:8px;padding:8px;background:#fefce8;border-radius:6px;border-left:3px solid #ca8a04;">
                <p style="font-size:11px;font-weight:700;color:#92400e;margin:0 0 2px 0;">⚡ Parallel Admission Available</p>
                <p style="font-size:11px;color:#78350f;margin:0;">${s.parallelAdmission.annualCost} — ${s.parallelAdmission.notes}</p>
              </div>
            ` : ""}
          </div>
        `).join("")}
      ` : ""}
    </div>
  `).join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <div style="background:#1e40af;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:0 0 6px 0;">Your Career Results</h1>
      <p style="color:#bfdbfe;font-size:13px;margin:0;">Career Fit & Future Readiness — Kenya's Best Career Guidance</p>
    </div>

    <div style="background:#f8fafc;padding:28px 24px;border-radius:0 0 12px 12px;">
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 24px 0;">
        Here are your top career matches based on Kenya's 4-year outlook, your interests and aptitude.
        Keep this email; share it with a parent, teacher or career counsellor.
      </p>

      ${cards}

      <div style="background:#eff6ff;border-radius:8px;padding:16px 20px;margin-top:8px;">
        <p style="font-size:12px;color:#475569;line-height:1.6;margin:0;">
          <strong style="color:#1e40af;">CFFR is a directional tool, not a final verdict.</strong>
          Your interests will grow and change, therefore consider retaking this assessment at key points in your education.
          Visit <a href="https://cffr.projectdatahub.org" style="color:#1e40af;">cffr.projectdatahub.org</a> anytime.
        </p>
      </div>

      <p style="font-size:11px;color:#94a3b8;text-align:center;margin:24px 0 0 0;">
        © 2026 CFFR · ProjectDataHub · Kenya
      </p>
    </div>

  </div>
</body>
</html>`;
};

// ─── POST /api/results/email ──────────────────────────────────────────────────

router.post("/email", async (req, res) => {
  const { email, recommendations } = req.body;

  if (!email || !recommendations || !Array.isArray(recommendations)) {
    return res.status(400).json({ success: false, message: "Email and recommendations are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address." });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("[CFFR Email] GMAIL_USER or GMAIL_PASS not set in Render environment.");
    return res.status(500).json({ success: false, message: "Email service not configured." });
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from:    `"CFFR Career Guidance" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: "Your CFFR Career Results — Career Guidance",
      html:    buildEmailHtml(recommendations),
    });

    console.log(`[CFFR Email] Results sent to: ${email}`);
    return res.status(200).json({ success: true, message: `Results sent to ${email}` });

  } catch (err) {
    console.error("[CFFR Email] Send error:", err.message);
    return res.status(500).json({ success: false, message: "Could not send email. Please try again." });
  }
});

module.exports = router;
