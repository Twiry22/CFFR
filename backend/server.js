/**
 * CFFR Backend Server
 * Career Fit & Future Readiness — Kenya CBC Grade 9 Career Guidance
 */

require("dotenv").config();
const express      = require("express");
const helmet       = require("helmet");
const cors         = require("cors");
const rateLimit    = require("express-rate-limit");
const assessRouter = require("./routes/assess");
const payRouter    = require("./routes/pay");
const exportRouter = require("./routes/export");
const emailRouter  = require("./routes/email");    // ← email route

const app  = express();
const PORT = process.env.PORT || 4000;

// ─── Trust Render's proxy ─────────────────────────────────────────────────────
// Required on Render — fixes the X-Forwarded-For rate limiter warning
app.set("trust proxy", 1);

// ─── Security: HTTP Headers ───────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// ─── Security: CORS ───────────────────────────────────────────────────────────
const allowedOrigins = [
  "https://cffr.projectdatahub.org",
  "https://cffr-frontend.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

if (process.env.ALLOWED_ORIGIN && !allowedOrigins.includes(process.env.ALLOWED_ORIGIN)) {
  allowedOrigins.push(process.env.ALLOWED_ORIGIN.trim());
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CFFR] CORS blocked origin: ${origin}`);
      callback(new Error(`CORS policy: origin '${origin}' is not allowed.`));
    }
  },
  methods:              ["GET", "POST", "OPTIONS"],
  allowedHeaders:       ["Content-Type", "x-export-secret"],
  optionsSuccessStatus: 200,
}));

app.options("*", cors());

// ─── Security: Rate Limiting ──────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: "Too many requests from this device. Please wait a few minutes and try again.",
  },
});
app.use("/api/", limiter);

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "50kb" }));  // raised from 10kb — results payload can be large
app.use(express.urlencoded({ extended: false, limit: "50kb" }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api",          assessRouter);
app.use("/api/pay",      payRouter);
app.use("/api/export",   exportRouter);
app.use("/api/results",  emailRouter);    // ← email route registered HERE (after body parsing)

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    name:        "CFFR API",
    description: "Career Fit & Future Readiness — Kenya CBC Career Guidance Engine",
    endpoints: {
      health:        "GET  /api/health",
      assess:        "POST /api/assess",
      pay:           "POST /api/pay",
      payCallback:   "GET  /api/pay/callback",
      payStatus:     "GET  /api/pay/status/:ref",
      exportRecords: "GET  /api/export/records",
      emailResults:  "POST /api/results/email",
    },
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  if (err.message?.includes("CORS")) {
    return res.status(403).json({ success: false, message: err.message });
  }
  console.error("[CFFR] Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║     CFFR — Career Fit & Future Readiness API         ║
  ║     Kenya CBC Career Guidance Engine                 ║
  ╠══════════════════════════════════════════════════════╣
  ║  Server running on  → http://localhost:${PORT}          ║
  ║  Health check       → GET  /api/health               ║
  ║  Assessment         → POST /api/assess               ║
  ║  Payment            → POST /api/pay                  ║
  ║  Email Results      → POST /api/results/email        ║
  ║  Export Records     → GET  /api/export/records       ║
  ╚══════════════════════════════════════════════════════╝
  `);
  console.log("[CFFR] Allowed origins:", allowedOrigins);
});

module.exports = app;