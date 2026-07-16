

const express = require("express");
const fs      = require("fs");
const path    = require("path");
const router  = express.Router();

// Storage
// Records are written to a JSON file so they survive server restarts on Render.
const DATA_FILE = path.join(__dirname, "../data/student-records.json");

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Load existing records from disk on startup
let records = [];
try {
  if (fs.existsSync(DATA_FILE)) {
    records = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    console.log(`[CFFR Export] Loaded ${records.length} existing records from disk.`);
  }
} catch (err) {
  console.warn("[CFFR Export] Could not load existing records:", err.message);
}

// save to disk
const saveToDisk = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));
  } catch (err) {
    console.error("[CFFR Export] Failed to write records to disk:", err.message);
  }
};

// Shared save logic (used by both the HTTP route and direct calls)
const saveRecord = (answers, recommendations) => {
  const record = {
    id:              `cffr_${Date.now()}`,
    timestamp:       new Date().toISOString(),
    answers,
    recommendations: (recommendations || []).slice(0, 3).map((r) => ({
      rank:        r.rank,
      clusterName: r.clusterName,
      matchScore:  r.matchScore,
    })),
  };

  records.push(record);
  saveToDisk();

  console.log(`[CFFR Export] Record saved. Total: ${records.length}`);
  return record;
};

// POST/api/export/save
// Called internally by the assess route after a successful assessment.
router.post("/save", (req, res) => {
  try {
    const { answers, recommendations } = req.body;

    if (!answers || !recommendations) {
      return res.status(400).json({ success: false, message: "Missing answers or recommendations." });
    }

    saveRecord(answers, recommendations);
    return res.status(200).json({ success: true, message: "Record saved." });

  } catch (err) {
    console.error("[CFFR Export] Save error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to save record." });
  }
});

// GET/api/export/records
// Protected by a secret header — only your export script can call this.
router.get("/records", (req, res) => {
  const secret = req.headers["x-export-secret"];

  // ***SET THIS IN YOUR RENDER ENVIRONMENT VARIABLES AS EXPORT_SECRET***
  const validSecret = process.env.EXPORT_SECRET || "cffr2026kenya";

  if (secret !== validSecret) {
    console.warn("[CFFR Export] Unauthorised export attempt.");
    return res.status(403).json({ success: false, message: "Unauthorised." });
  }

  return res.status(200).json({
    success: true,
    count:   records.length,
    records,
  });
});

module.exports = router;
module.exports.saveRecord = saveRecord;
