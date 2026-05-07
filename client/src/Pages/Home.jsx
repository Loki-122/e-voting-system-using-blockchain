import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { value: "100K+", label: "Votes Cast", icon: "ballot" },
    { value: "500+", label: "Elections", icon: "check" },
    { value: "99.9%", label: "Uptime", icon: "shield" },
    { value: "0", label: "Breaches", icon: "lock" },
  ];

  const features = [
    {
      title: "Immutable Records",
      description: "Every vote is permanently recorded on the blockchain, ensuring complete transparency.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Anonymous Voting",
      description: "Your identity is protected while your vote counts, maintaining electoral integrity.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Instant Results",
      description: "Real-time vote tallying with cryptographic verification ensures accuracy.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#ff006e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030014",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.06), transparent 40%),
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255, 0, 110, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(0, 255, 136, 0.06), transparent)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Grid Pattern */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Floating Blockchain Visual */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            opacity: isVisible ? 0.3 : 0,
            transition: "opacity 1s ease 0.5s",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              border: "2px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "20px",
              transform: "rotate(45deg)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "15%",
            opacity: isVisible ? 0.2 : 0,
            transition: "opacity 1s ease 0.7s",
            animation: "float 8s ease-in-out infinite 1s",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "2px solid rgba(0, 255, 136, 0.3)",
              borderRadius: "12px",
              transform: "rotate(20deg)",
            }}
          />
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "rgba(0, 255, 136, 0.1)",
            border: "1px solid rgba(0, 255, 136, 0.3)",
            borderRadius: "100px",
            marginBottom: "32px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "#00ff88",
              borderRadius: "50%",
              boxShadow: "0 0 10px #00ff88",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#00ff88",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Blockchain Secured
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          <span style={{ color: "#ffffff" }}>The Future of</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #00d4ff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientText 4s linear infinite",
            }}
          >
            Democratic Voting
          </span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(255, 255, 255, 0.6)",
            maxWidth: "600px",
            lineHeight: 1.7,
            marginBottom: "48px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          Experience transparent, secure, and tamper-proof elections powered by
          cutting-edge blockchain technology.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            marginBottom: "80px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <Link
            to="/election"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              border: "none",
              borderRadius: "14px",
              color: "#030014",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 20px rgba(0, 212, 255, 0.4)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 40px rgba(0, 212, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 212, 255, 0.4)";
            }}
          >
            Start Voting
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link
            to="/result"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              background: "transparent",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "14px",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00d4ff";
              e.currentTarget.style.color = "#00d4ff";
              e.currentTarget.style.background = "rgba(0, 212, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View Results
          </Link>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "700px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                padding: "24px 20px",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "16px",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0.5,
            animation: "bounce 2s infinite",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#00d4ff",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Why ChainVote
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Built for Trust
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.5)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Leveraging the power of decentralized technology to ensure every vote matters.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "32px",
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "24px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.3)";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "12px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "64px 40px",
            background: "linear-gradient(145deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 255, 136, 0.05) 100%)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            borderRadius: "32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative Elements */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
              position: "relative",
            }}
          >
            Ready to Cast Your Vote?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "32px",
              position: "relative",
            }}
          >
            Join thousands of voters in shaping the future through secure, transparent elections.
          </p>
          <Link
            to="/election"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 40px",
              background: "#ffffff",
              border: "none",
              borderRadius: "14px",
              color: "#030014",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Explore Elections
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        @keyframes gradientText {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </div>
  );
}
