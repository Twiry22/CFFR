/**
 * professional/Welcome.jsx  v1.0
 * CFFR Professional — Welcome screen.
 * Deliberately more subdued/mature than the High School Welcome: muted
 * brown/cream/nude palette, tighter corners instead of full pill shapes,
 * quieter copy. Flat colors only — no gradients anywhere, including hovers
 * (hover states just shift to a darker/lighter flat shade).
 */

import "../styles/professionaltheme.pr.css";

const Welcome = ({ onStart, onBack }) => {
  return (
    <div style={{
      minHeight:     "100vh",
      background:    "var(--pro-cream)",
      display:       "flex",
      flexDirection: "column",
    }}>

      {/* Nav */}
      <nav style={{
        padding:        "18px 40px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        borderBottom:   "1px solid var(--pro-border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.png"
            alt="CFFR Logo"
            style={{ height: "36px", width: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span style={{
            fontFamily:    "var(--font-display)",
            fontWeight:    "800",
            fontSize:      "1.05rem",
            color:         "var(--pro-brown-dark)",
            letterSpacing: "0.02em",
          }}>
            CFFR <span style={{ fontWeight: "500", color: "var(--pro-text-mid)" }}>Professional</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {onBack && (
            <span
              role="button"
              tabIndex={0}
              onClick={onBack}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onBack(); }}
              style={{
                fontSize:   "0.82rem",
                fontWeight: "600",
                color:      "var(--pro-text-light)",
                cursor:     "pointer",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--pro-brown)"}
              onMouseLeave={(e) => e.target.style.color = "var(--pro-text-light)"}
            >
              ← Back to Products
            </span>
          )}
          <span
            role="button"
            tabIndex={0}
            onClick={() => { window.location.href = "mailto:projectdatahb@gmail.com"; }}
            style={{
              fontSize:   "0.82rem",
              color:      "var(--pro-text-mid)",
              fontFamily: "var(--font-body)",
              cursor:     "pointer",
            }}
          >
            
          </span>
        </div>
      </nav>

      {/* Hero */}
      <main style={{
        flex:           "1",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "60px 24px",
      }}>
        <div style={{ maxWidth: "620px", width: "100%", textAlign: "center" }} className="fade-in-up">

          {/* Eyebrow */}
          <div style={{
            display:       "inline-block",
            background:    "var(--pro-nude-pale)",
            color:         "var(--pro-brown)",
            borderRadius:  "6px",
            padding:       "6px 16px",
            fontSize:      "0.74rem",
            fontWeight:    "700",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom:  "32px",
          }}>
            For Working Professionals
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(1.9rem, 4.5vw, 2.7rem)",
            fontWeight:    "800",
            color:         "var(--pro-brown-dark)",
            lineHeight:    "1.2",
            marginBottom:  "16px",
            letterSpacing: "-0.01em",
          }}>
            Realign Your Career Direction
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize:     "1.02rem",
            color:        "var(--pro-text-mid)",
            lineHeight:   "1.75",
            marginBottom: "40px",
            maxWidth:     "480px",
            margin:       "0 auto 40px",
          }}>
            Your qualifications, experience, interest and where they can actually
            take you next. Built on real data.
          </p>

          {/* Info row */}
          <div style={{
            display:        "flex",
            justifyContent: "center",
            flexWrap:       "wrap",
            gap:            "10px",
            marginBottom:   "48px",
          }}>
            {[
              "For anyone already working",
              "Kenya-specific",
              "Confidential",
            ].map((pill) => (
              <span key={pill} style={{
                background:   "var(--pro-cream-alt)",
                border:       "1px solid var(--pro-border)",
                borderRadius: "6px",
                padding:      "6px 16px",
                fontSize:     "0.8rem",
                fontWeight:   "500",
                color:        "var(--pro-text-mid)",
              }}>
                {pill}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <button
              onClick={onStart}
              style={{
                width:        "100%",
                padding:      "15px 28px",
                background:   "var(--pro-brown)",
                color:        "var(--pro-cream)",
                border:       "none",
                borderRadius: "8px",
                fontFamily:   "var(--font-display)",
                fontWeight:   "700",
                fontSize:     "0.95rem",
                cursor:       "pointer",
                transition:   "background 0.18s ease",
              }}
              onMouseEnter={(e) => { e.target.style.background = "var(--pro-brown-hover)"; }}
              onMouseLeave={(e) => { e.target.style.background = "var(--pro-brown)"; }}
            >
              Begin Assessment →
            </button>
          </div>

          {/* Fine print */}
          <p style={{
            fontSize:   "0.75rem",
            color:      "var(--pro-text-light)",
            marginTop:  "22px",
            lineHeight: "1.6",
          }}>
            CFFR Professional maps your background to real openings 
            you make the final call.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding:   "16px 40px",
        borderTop: "1px solid var(--pro-border)",
        textAlign: "center",
      }}>
        <p style={{
          fontSize:   "0.75rem",
          color:      "var(--pro-text-light)",
          fontFamily: "var(--font-body)",
        }}>
          © 2026 CFFR Professional · ProjectData Hub · Kenya
        </p>
      </footer>
    </div>
  );
};

export default Welcome;
