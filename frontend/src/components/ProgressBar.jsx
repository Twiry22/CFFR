/**
 * ProgressBar Component
 * Shows the student which question they are on out of 10
 */

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: "28px" }}>

      {/* Top row — question count + percentage */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        marginBottom:   "10px",
      }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: "600",
          fontSize:   "0.85rem",
          color:      "var(--royal-blue)",
        }}>
          Question {current} of {total}
        </span>
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: "700",
          fontSize:   "0.85rem",
          color:      "var(--text-mid)",
        }}>
          {percentage}% complete
        </span>
      </div>

      {/* Progress track */}
      <div style={{
        background:    "var(--royal-blue-mid)",
        borderRadius:  "999px",
        height:        "8px",
        overflow:      "hidden",
      }}>
        <div style={{
          width:         `${percentage}%`,
          height:        "100%",
          borderRadius:  "999px",
          background:    "linear-gradient(90deg, var(--royal-blue-light), var(--royal-blue))",
          transition:    "width 0.5s ease",
        }} />
      </div>

      {/* Step dots */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        marginTop:      "10px",
      }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width:        "8px",
              height:       "8px",
              borderRadius: "50%",
              background:   i < current
                ? "var(--royal-blue)"
                : "var(--royal-blue-mid)",
              transition:   "background 0.3s ease",
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default ProgressBar;