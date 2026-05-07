/**
 * Welcome Page
 * Clean website feel — no emoji icon, uses the CFFR logo.
 */

const Welcome = ({ onStart }) => {
  return (
    <div style={{
      minHeight:       "100vh",
      background:      "var(--white)",
      display:         "flex",
      flexDirection:   "column",
    }}>

      {/* ── Nav Bar ── */}
      <nav style={{
        padding:        "18px 40px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        borderBottom:   "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.png"
            alt="CFFR Logo"
            style={{ height: "40px", width: "auto" }}
          />
          <span style={{
            fontFamily:  "var(--font-display)",
            fontWeight:  "800",
            fontSize:    "1.1rem",
            color:       "var(--royal-blue)",
            letterSpacing: "0.02em",
          }}>
            CFFR
          </span>
        </div>
        <span style={{
          fontSize:   "0.82rem",
          color:      "var(--text-light)",
          fontFamily: "var(--font-body)",
        }}>
          Career Fit & Future Readiness
        </span>
      </nav>

      {/* ── Hero Section ── */}
      <main style={{
        flex:           "1",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "60px 24px",
      }}>
        <div style={{
          maxWidth:  "640px",
          width:     "100%",
          textAlign: "center",
        }}
          className="fade-in-up"
        >

          {/* Logo */}
          <img
            src="/logo.png"
            alt="CFFR"
            style={{
              height:       "110px",
              width:        "auto",
              marginBottom: "32px",
            }}
          />

          {/* Heading */}
          <h1 style={{
            fontFamily:   "var(--font-display)",
            fontSize:     "clamp(2rem, 5vw, 3rem)",
            fontWeight:   "800",
            color:        "var(--text-dark)",
            lineHeight:   "1.15",
            marginBottom: "12px",
          }}>
            Find Your Career Direction
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize:     "1.05rem",
            color:        "var(--text-mid)",
            lineHeight:   "1.7",
            marginBottom: "40px",
            maxWidth:     "480px",
            margin:       "0 auto 40px",
          }}>
            Answer 11 simple questions and discover the 3 career paths
            that best match who you are.
          </p>

          {/* Info row */}
          <div style={{
            display:        "flex",
            justifyContent: "center",
            flexWrap:       "wrap",
            gap:            "10px",
            marginBottom:   "44px",
          }}>
            {[
              "⏱️ 3 minutes",
              "🇰🇪 Kenya-specific",
              "🔒 Private",
            ].map((pill) => (
              <span key={pill} style={{
                background:   "var(--royal-blue-pale)",
                borderRadius: "999px",
                padding:      "6px 18px",
                fontSize:     "0.82rem",
                fontWeight:   "500",
                color:        "var(--royal-blue)",
              }}>
                {pill}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ maxWidth: "320px", margin: "0 auto" }}>
            <button className="btn-primary" onClick={onStart}>
              Start My Assessment →
            </button>
          </div>

          {/* Fine print */}
          <p style={{
            fontSize:   "0.75rem",
            color:      "var(--text-light)",
            marginTop:  "24px",
            lineHeight: "1.6",
          }}>
            CFFR gives you directions to explore: not a final verdict.
            Your interests will grow as you discover more about the world.
          </p>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        padding:    "16px 40px",
        borderTop:  "1px solid var(--border)",
        textAlign:  "center",
      }}>
        <p style={{
          fontSize:  "0.75rem",
          color:     "var(--text-light)",
          fontFamily:"var(--font-body)",
        }}>
          © 2026 CFFR · ProjectData Hub · Kenya
        </p>
      </footer>

    </div>
  );
};

export default Welcome;
