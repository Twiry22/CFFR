/**
 * CFFR Data Export Utility
 * Reads stored student records and exports them to a timestamped Excel file.
 *
 * Usage (from cffr-export folder):
 *   EXPORT_SECRET="cffr2026kenya" node export-to-excel.js
 *
 * Requires: npm install xlsx axios
 */

const axios  = require("axios");
const XLSX   = require("xlsx");
const path   = require("path");
const fs     = require("fs");

// ─── Config ───────────────────────────────────────────────────────────────────
// ***REPLACE WITH YOUR ACTUAL BACKEND URL***
const API_BASE   = process.env.API_URL || "https://cffr-backend.onrender.com";
const SECRET     = process.env.EXPORT_SECRET || "cffr2026kenya";
const OUTPUT_DIR = path.join(__dirname, "exports");

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  try {
    console.log("CFFR Data Export");
    console.log("────────────────────────────────");
    console.log(`Fetching records from ${API_BASE}...`);

    const response = await axios.get(`${API_BASE}/api/export/records`, {
      headers: { "x-export-secret": SECRET },
    });

    const records = response.data.records;

    if (!records || records.length === 0) {
      console.log(" No records found. Students may not have completed assessments yet.");
      return;
    }

    console.log(`Found ${records.length} student record(s). Building Excel file...`);

    // ── Build rows ────────────────────────────────────────────────────────────
    const rows = records.map((r, i) => ({
      "#":                    i + 1,
      "Timestamp":            r.timestamp || "",
      "County":               r.answers?.q9 || "",
      "Budget Tier":          r.answers?.q10 || "",
      "Subjects Enjoyed (Q1)":  (r.answers?.q1 || []).join(", "),
      "Best Subjects (Q2)":     (r.answers?.q2 || []).join(", "),
      "Activity (Q3)":          Array.isArray(r.answers?.q3) ? r.answers.q3.join(", ") : r.answers?.q3 || "",
      "Personality (Q4)":       Array.isArray(r.answers?.q4) ? r.answers.q4.join(", ") : r.answers?.q4 || "",
      "Job Value (Q5)":         Array.isArray(r.answers?.q5) ? r.answers.q5.join(", ") : r.answers?.q5 || "",
      "Tech Comfort (Q6)":      r.answers?.q6 || "",
      "Career Spaces (Q7)":     (r.answers?.q7 || []).join(", "),
      "Future Mindset (Q8)":    Array.isArray(r.answers?.q8) ? r.answers.q8.join(", ") : r.answers?.q8 || "",
      "#1 Career Match":        r.recommendations?.[0]?.clusterName || "",
      "#1 Match Score":         r.recommendations?.[0]?.matchScore || "",
      "#2 Career Match":        r.recommendations?.[1]?.clusterName || "",
      "#2 Match Score":         r.recommendations?.[1]?.matchScore || "",
      "#3 Career Match":        r.recommendations?.[2]?.clusterName || "",
      "#3 Match Score":         r.recommendations?.[2]?.matchScore || "",
    }));

    // ── Write Excel ───────────────────────────────────────────────────────────
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

    const timestamp  = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
    const filename   = `cffr-students-${timestamp}.xlsx`;
    const filepath   = path.join(OUTPUT_DIR, filename);

    const worksheet  = XLSX.utils.json_to_sheet(rows);
    const workbook   = XLSX.utils.book_new();

    // Auto column widths
    const colWidths  = Object.keys(rows[0]).map((key) => ({
      wch: Math.max(key.length, 18),
    }));
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Records");
    XLSX.writeFile(workbook, filepath);

    console.log(`\n Excel file saved to:`);
    console.log(`   ${filepath}`);
    console.log(`\n Summary:`);
    console.log(`   Total students: ${records.length}`);
    console.log(`   Exported at:    ${new Date().toLocaleString()}`);

  } catch (err) {
    if (err.response?.status === 403) {
      console.error(" Wrong export secret. Check your EXPORT_SECRET value.");
    } else if (err.response?.status === 404) {
      console.error(" Export endpoint not found. Make sure the backend is updated.");
    } else {
      console.error(" Export failed:", err.message);
    }
  }
})();
