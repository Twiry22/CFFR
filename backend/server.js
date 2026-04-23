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

const app  = express();
const PORT = process.env.PORT || 4000;

// ─── Security: HTTP Headers ───────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// ─── Security: CORS ───────────────────────────────────────────────────────────
// FIX: Hardcode all known frontend origins instead of relying on a single
// ALLOWED_ORIGIN env var that was never set on Render, causing all production
// requests to be blocked with a 403 CORS error.
const allowedOrigins = [
  "https://cffr.projectdatahub.org",       // production frontend
  "https://cffr-frontend.onrender.com",    // Render frontend (if applicable)
  "http://localhost:5173",                  // Vite dev server
  "http://localhost:3000",                  // fallback dev
];

// Also allow any extra origin set via environment variable on Render
if (process.env.ALLOWED_ORIGIN && !allowedOrigins.includes(process.env.ALLOWED_ORIGIN)) {
  allowedOrigins.push(process.env.ALLOWED_ORIGIN.trim());
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CFFR] CORS blocked origin: ${origin}`);
      callback(new Error(`CORS policy: origin '${origin}' is not allowed.`));
    }
  },
  methods:          ["GET", "POST", "OPTIONS"],
  allowedHeaders:   ["Content-Type"],
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
}));

// Explicitly handle preflight OPTIONS requests for all routes
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
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", assessRouter);

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    name:        "CFFR API",
    description: "Career Fit & Future Readiness — Kenya CBC Career Guidance Engine",
    endpoints: {
      health: "GET  /api/health",
      assess: "POST /api/assess",
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
  ║  Allowed origins    → ${allowedOrigins.length} configured              ║
  ╚══════════════════════════════════════════════════════╝
  `);
  console.log("[CFFR] Allowed origins:", allowedOrigins);
});

module.exports = app;
