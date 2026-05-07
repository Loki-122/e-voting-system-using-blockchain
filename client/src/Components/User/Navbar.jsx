import React, { useState, useEffect } from "react";
import { NavbarData } from "../../Data/NavbarData";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: scrolled ? "16px" : "24px",
          left: "50%",
          transform: "translateX(-50%)",
          width: scrolled ? "calc(100% - 48px)" : "calc(100% - 64px)",
          maxWidth: "1200px",
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: scrolled ? "12px 24px" : "16px 32px",
            background: scrolled
              ? "rgba(10, 10, 26, 0.85)"
              : "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: scrolled ? "16px" : "24px",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)"
              : "0 4px 24px rgba(0, 0, 0, 0.3)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.3))" }}
              >
                <path
                  d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z"
                  stroke="#030014"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.02em",
                }}
              >
                ChainVote
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Blockchain Voting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="desktop-nav"
          >
            {NavbarData.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  to={item.link}
                  key={index}
                  style={{
                    position: "relative",
                    padding: "10px 20px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive ? "#00d4ff" : "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    borderRadius: "12px",
                    background: isActive ? "rgba(0, 212, 255, 0.1)" : "transparent",
                    border: isActive
                      ? "1px solid rgba(0, 212, 255, 0.3)"
                      : "1px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {item.title}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-1px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "20px",
                        height: "2px",
                        background: "#00d4ff",
                        borderRadius: "2px",
                        boxShadow: "0 0 10px rgba(0, 212, 255, 0.8)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Admin Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              to="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
                border: "none",
                borderRadius: "12px",
                color: "#030014",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 212, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 212, 255, 0.3)";
              }}
              className="admin-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  fill="#030014"
                />
              </svg>
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              className="mobile-menu-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              left: 0,
              right: 0,
              background: "rgba(10, 10, 26, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              animation: "slideDown 0.3s ease forwards",
            }}
          >
            {NavbarData.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  to={item.link}
                  key={index}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: "12px 16px",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: isActive ? "#00d4ff" : "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    borderRadius: "10px",
                    background: isActive ? "rgba(0, 212, 255, 0.1)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: "120px" }} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .admin-btn {
            display: none !important;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
