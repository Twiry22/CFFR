/**
 * SchoolList Component
 * Displays recommended Kenyan universities and colleges
 * for a given career cluster.
 */

const SchoolList = ({ schools }) => {
  if (!schools || schools.length === 0) {
    return (
      <p style={{
        fontSize:  "0.88rem",
        color:     "var(--text-light)",
        fontStyle: "italic",
      }}>
        No schools found for your budget and county. Consider exploring HELB or scholarship options.
      </p>
    );
  }

  return (
    <div style={{ marginTop: "24px" }}>

      <p style={{
        fontFamily:    "var(--font-display)",
        fontWeight:    "700",
        fontSize:      "0.88rem",
        color:         "var(--text-mid)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom:  "14px",
      }}>
        🏫 Recommended Institutions
      </p>

      <div style={{
        display:       "flex",
        flexDirection: "column",
        gap:           "10px",
      }}>
        {schools.map((school, index) => (
          <div
            key={index}
            style={{
              background:   "var(--off-white)",
              border:       "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding:      "14px 16px",
            }}
          >
            <div style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "flex-start",
              marginBottom:   "6px",
              gap:            "8px",
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize:   "0.92rem",
                color:      "var(--text-dark)",
              }}>
                {school.name}
              </span>
              <span style={{
                background:   school.type === "Public" ? "var(--success-pale)" : "var(--royal-blue-pale)",
                color:        school.type === "Public" ? "var(--success)" : "var(--royal-blue)",
                borderRadius: "999px",
                padding:      "2px 10px",
                fontSize:     "0.72rem",
                fontWeight:   "600",
                fontFamily:   "var(--font-display)",
                whiteSpace:   "nowrap",
              }}>
                {school.type}
              </span>
            </div>

            <p style={{
              fontSize:     "0.85rem",
              color:        "var(--royal-blue-dark)",
              fontWeight:   "500",
              marginBottom: "4px",
            }}>
              📖 {school.course}
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-mid)" }}>
                📍 {school.location}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-mid)", fontWeight: "600" }}>
                💰 {school.annualCostRange}/yr
              </span>
            </div>

            {school.notes && (
              <p style={{
                fontSize:   "0.78rem",
                color:      "var(--text-light)",
                marginTop:  "6px",
                lineHeight: "1.5",
              }}>
                {school.notes}
              </p>
            )}

            <a
              href={school.website}
              target="_blank"
              rel="noreferrer"
              style={{
                display:    "inline-block",
                marginTop:  "8px",
                fontSize:   "0.78rem",
                fontWeight: "600",
                color:      "var(--royal-blue)",
              }}
            >
              Visit website →
            </a>

          </div>
        ))}
      </div>

    </div>
  );
};

export default SchoolList;
