import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030014",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
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
            radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 40%),
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(239, 68, 68, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(236, 72, 153, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(0, 212, 255, 0.06), transparent)
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
            linear-gradient(rgba(239, 68, 68, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating Elements */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          opacity: isVisible ? 0.3 : 0,
          transition: "opacity 1s ease 0.5s",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            border: "2px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "20px",
            transform: "rotate(45deg)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          opacity: isVisible ? 0.2 : 0,
          transition: "opacity 1s ease 0.7s",
          animation: "float 8s ease-in-out infinite 1s",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "12px",
            transform: "rotate(20deg)",
          }}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "600px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* 404 Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "100px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "#ef4444",
              borderRadius: "50%",
              boxShadow: "0 0 10px #ef4444",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#ef4444",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Error 404
          </span>
        </div>

        {/* Large 404 Number */}
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: "16px",
            background: "linear-gradient(135deg, #ef4444 0%, #8b5cf6 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 80px rgba(239, 68, 68, 0.3)",
          }}
        >
          404
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.5)",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          The page you are looking for does not exist or has been moved. Please check the URL or navigate back to the dashboard.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/admin/dashboard"
            style={{
              padding: "14px 28px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(139, 92, 246, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(139, 92, 246, 0.4)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            style={{
              padding: "14px 28px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "16px",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.5)",
              marginBottom: "16px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Helpful Links
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { title: "Users", link: "/admin/user" },
              { title: "Candidates", link: "/admin/candidate" },
              { title: "Elections", link: "/admin/election" },
              { title: "Results", link: "/admin/result" },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                style={{
                  padding: "8px 16px",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  borderRadius: "8px",
                  color: "#8b5cf6",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(45deg); }
            50% { transform: translateY(-20px) rotate(45deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PageNotFound;
