import React, { useState } from "react";
import { Link } from "react-router-dom";

const VoteSuccess = () => {
  const [info] = useState(() => {
    const raw = sessionStorage.getItem("voteSuccess");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

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
        padding: "120px 24px 80px",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0, 255, 136, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 212, 255, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(255, 0, 110, 0.06), transparent)
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

      {/* Success Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "580px",
          width: "100%",
          padding: "48px 40px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "32px",
          textAlign: "center",
          animation: "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-3px",
              background: "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)",
              borderRadius: "30px",
              zIndex: -1,
              opacity: 0.5,
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z"
              stroke="#00ff88"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          Vote Recorded Successfully
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "32px",
            lineHeight: 1.6,
          }}
        >
          Your vote has been permanently secured on the blockchain. Thank you for participating in democracy.
        </p>

        {/* Vote Details */}
        {info && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "32px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.4)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Transaction Details
            </div>

            {info.candidate_username && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "4px",
                  }}
                >
                  Candidate
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#00d4ff",
                  }}
                >
                  {info.candidate_username}
                </div>
              </div>
            )}

            {info.election_id && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "4px",
                  }}
                >
                  Election ID
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "'SF Mono', monospace",
                    color: "rgba(255, 255, 255, 0.8)",
                    wordBreak: "break-all",
                  }}
                >
                  {info.election_id}
                </div>
              </div>
            )}

            {info.txHash && (
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "4px",
                  }}
                >
                  Transaction Hash
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "'SF Mono', monospace",
                    color: "#00ff88",
                    wordBreak: "break-all",
                    padding: "12px",
                    background: "rgba(0, 255, 136, 0.05)",
                    borderRadius: "10px",
                    border: "1px solid rgba(0, 255, 136, 0.1)",
                  }}
                >
                  {info.txHash}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Blockchain Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "rgba(0, 255, 136, 0.1)",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            borderRadius: "100px",
            marginBottom: "32px",
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
              letterSpacing: "0.05em",
            }}
          >
            Blockchain Verified
          </span>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#030014",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
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
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go Home
          </Link>

          <Link
            to="/result"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "transparent",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Results
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default VoteSuccess;
