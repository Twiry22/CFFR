/**
 * LandingPage.jsx
 * CFFR Platform Landing — premium, clean, confident.
 * Three product cards: High School, Global, Professional.
 */

const LandingPage = ({ onSelectProduct }) => {

  const products = [
    {
      id:          "highschool",
      badge:       "Available Now",
      badgeLive:   true,
      icon:        "🎓",
      title:       "CFFR High School",
      subtitle:    "Form 3 & Form 4",
      description: "Discover the career path that fits your personality. Answer 11 questions and get matched to Kenya's most promising career clusters with schools suggestions, real data and a 3-year outlook.",
      color:       "#2C5FC3",
      colorLight:  "#EEF3FC",
      colorMid:    "#D4E1FA",
      cta:         "Start Assessment →",
      available:   true,
    },
        {
      id:          "professional",
      badge:       "Coming Soon",
      badgeLive:   false,
      icon:        "💼",
      title:       "CFFR Professional",
      subtitle:    "For the Workforce",
      description: "Already working but feeling uncertain about your direction? CFFR Professional helps you realign, matching your experience, skills and values to where you can truly thrive.",
      color:       "#92400E",
      colorLight:  "#FFFBEB",
      colorMid:    "#FDE68A",
      cta:         "Notify Me →",
      available:   false,
    },
    {
      id:          "global",
      badge:       "Coming Soon",
      badgeLive:   false,
      icon:        "🌍",
      title:       "CFFR Global",
      subtitle:    "Students Worldwide",
      description: "Career guidance built for students navigating international education systems. Whether you're in East Africa, Europe or beyond, find the path that fits your world.",
      color:       "#0D9488",
      colorLight:  "#F0FDFA",
      colorMid:    "#CCFBF1",
      cta:         "Notify Me →",
      available:   false,
    },
  ];

  return (
    <div style={{
      minHeight:     "100vh",
      background:    "#FFFFFF",
      display:       "flex",
      flexDirection: "column",
      fontFamily:    "var(--font-body)",
    }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        padding:        "0 48px",
        height:         "64px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        borderBottom:   "1px solid #F1F5F9",
        position:       "sticky",
        top:            0,
        background:     "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        zIndex:         100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="CFFR" style={{ height: "32px", width: "auto" }}
            onError={(e) => { e.target.style.display = "none"; }} />
          <span style={{
            fontFamily:  "var(--font-display)",
            fontWeight:  "800",
            fontSize:    "1.1rem",
            color:       "#2C5FC3",
            letterSpacing: "0.01em",
          }}>
            CFFR
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Products", "About", "Contact"].map((item) => (
            <span key={item} style={{
              fontSize:   "0.88rem",
              fontWeight: "500",
              color:      "#64748B",
              cursor:     "pointer",
              transition: "color 0.15s ease",
            }}
              onMouseEnter={(e) => e.target.style.color = "#2C5FC3"}
              onMouseLeave={(e) => e.target.style.color = "#64748B"}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Nav CTA */}
        <div style={{
          background:   "#2C5FC3",
          color:        "#FFFFFF",
          padding:      "8px 20px",
          borderRadius: "8px",
          fontSize:     "0.85rem",
          fontWeight:   "600",
          cursor:       "pointer",
          fontFamily:   "var(--font-display)",
          transition:   "all 0.18s ease",
        }}
          onMouseEnter={(e) => { e.target.style.background = "#1E45A0"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = "#2C5FC3"; e.target.style.transform = "translateY(0)"; }}
          onClick={() => onSelectProduct("highschool")}
        >
          Get Started
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{
        padding:        "80px 48px 64px",
        textAlign:      "center",
        maxWidth:       "720px",
        margin:         "0 auto",
        width:          "100%",
      }}
        className="fade-in-up"
      >
        {/* Eyebrow */}
        <div style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            "8px",
          background:     "#EEF3FC",
          color:          "#2C5FC3",
          borderRadius:   "999px",
          padding:        "6px 16px",
          fontSize:       "0.78rem",
          fontWeight:     "700",
          letterSpacing:  "0.06em",
          textTransform:  "uppercase",
          marginBottom:   "28px",
        }}>
          <span style={{
            width: "7px", height: "7px",
            borderRadius: "50%",
            background: "#2C5FC3",
            display: "inline-block",
          }} />
          Career Fit & Future Readiness Platform

        {/* Headline */}
        <h1 style={{
          fontFamily:   "var(--font-display)",
          fontSize:     "clamp(2.2rem, 5vw, 3.4rem)",
          fontWeight:   "800",
          color:        "#0F172A",
          lineHeight:   "1.15",
          marginBottom: "20px",
          letterSpacing: "-0.02em",
        }}>
          Find the career path<br />
          <span style={{ color: "#2C5FC3" }}>built for your life.</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize:     "1.1rem",
          color:        "#64748B",
          lineHeight:   "1.75",
          marginBottom: "0",
          maxWidth:     "560px",
          margin:       "0 auto",
        }}>
          CFFR matches you to the right career direction using real data, your unique profile, and the opportunities that actually exist in your world.
        </p>
      </div>

      {/* ── PRODUCT CARDS ── */}
      <div style={{
        padding:             "0 48px 80px",
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap:                 "24px",
        maxWidth:            "1100px",
        margin:              "0 auto",
        width:               "100%",
      }}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => product.available && onSelectProduct(product.id)}
            style={{
              background:    "#FFFFFF",
              border:        `1px solid ${product.colorMid}`,
              borderTop:     `4px solid ${product.color}`,
              borderRadius:  "16px",
              padding:       "32px",
              cursor:        product.available ? "pointer" : "default",
              transition:    "all 0.22s ease",
              position:      "relative",
              overflow:      "hidden",
            }}
            onMouseEnter={(e) => {
              if (product.available) {
                e.currentTarget.style.transform   = "translateY(-4px)";
                e.currentTarget.style.boxShadow   = `0 12px 40px ${product.color}22`;
                e.currentTarget.style.borderColor = product.color;
              } else {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform   = "translateY(0)";
              e.currentTarget.style.boxShadow   = "none";
              e.currentTarget.style.borderColor = product.colorMid;
              e.currentTarget.style.borderTopColor = product.color;
            }}
          >
            {/* Badge */}
            <div style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "6px",
              background:   product.badgeLive ? product.colorLight : "#F8FAFC",
              color:        product.badgeLive ? product.color : "#94A3B8",
              borderRadius: "999px",
              padding:      "4px 12px",
              fontSize:     "0.72rem",
              fontWeight:   "700",
              letterSpacing:"0.06em",
              textTransform:"uppercase",
              marginBottom: "20px",
            }}>
              {product.badgeLive && (
                <span style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: product.color,
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }} />
              )}
              {product.badge}
            </div>

            {/* Icon */}
            <div style={{
              fontSize:     "2.4rem",
              marginBottom: "16px",
              lineHeight:   "1",
            }}>
              {product.icon}
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily:   "var(--font-display)",
              fontSize:     "1.35rem",
              fontWeight:   "800",
              color:        "#0F172A",
              marginBottom: "4px",
              lineHeight:   "1.2",
            }}>
              {product.title}
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize:     "0.8rem",
              fontWeight:   "600",
              color:        product.color,
              marginBottom: "14px",
              textTransform:"uppercase",
              letterSpacing:"0.05em",
            }}>
              {product.subtitle}
            </p>

            {/* Description */}
            <p style={{
              fontSize:     "0.92rem",
              color:        "#475569",
              lineHeight:   "1.7",
              marginBottom: "28px",
            }}>
              {product.description}
            </p>

            {/* CTA */}
            <div style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "6px",
              background:     product.available ? product.color : "#F1F5F9",
              color:          product.available ? "#FFFFFF" : "#94A3B8",
              borderRadius:   "10px",
              padding:        "11px 22px",
              fontSize:       "0.88rem",
              fontWeight:     "700",
              fontFamily:     "var(--font-display)",
              letterSpacing:  "0.01em",
              transition:     "all 0.18s ease",
            }}>
              {product.cta}
            </div>

            {/* Coming soon overlay hint */}
            {!product.available && (
              <div style={{
                position:   "absolute",
                bottom:     "16px",
                right:      "20px",
                fontSize:   "0.72rem",
                color:      "#CBD5E1",
                fontWeight: "500",
              }}>
                In development
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{
        borderTop:    "1px solid #F1F5F9",
        borderBottom: "1px solid #F1F5F9",
        padding:      "32px 48px",
        display:      "flex",
        justifyContent: "center",
        gap:          "64px",
        flexWrap:     "wrap",
        background:   "#FAFBFF",
      }}>
        {[
          { number: "3 min",label: "To complete" },
          
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily:   "var(--font-display)",
              fontSize:     "1.6rem",
              fontWeight:   "800",
              color:        "#0F172A",
              lineHeight:   "1",
              marginBottom: "4px",
            }}>
              {stat.number}
            </div>
            <div style={{
              fontSize:      "0.75rem",
              color:         "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontWeight:    "600",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        padding:        "28px 48px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: "700",
            fontSize:   "0.88rem",
            color:      "#2C5FC3",
          }}>
            CFFR
          </span>
          <span style={{ fontSize: "0.78rem", color: "#CBD5E1" }}>·</span>
          <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
            A ProjectDataHub Initiative · Kenya · 2026
          </span>
        </div>
        <span style={{ fontSize: "0.78rem", color: "#CBD5E1" }}>
          projectdatahb@gmail.com
        </span>
      </footer>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @media (max-width: 600px) {
          nav { padding: 0 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
        }
      `}</style>

    </div>
  );
};

export default LandingPage;
