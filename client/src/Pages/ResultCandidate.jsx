import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Candidate from "../Components/Admin/Candidate";

const ResultCandidate = () => {
  const location = useLocation();
  const data = location.state?.info;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#030014",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "48px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "24px",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>
            No Results Found
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Please navigate from the results page.
          </p>
        </div>
      </div>
    );
  }

  // Calculate total votes
  const totalVotes = data.vote?.reduce((acc, v) => acc + v, 0) || 0;
  const winnerVotes = data.vote?.[0] || 0;
  const winnerPercentage = totalVotes > 0 ? ((winnerVotes / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030014",
        position: "relative",
        overflow: "hidden",
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
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 215, 0, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 212, 255, 0.08), transparent),
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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Back Link */}
          <a
            href="/result"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "100px",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.85rem",
              textDecoration: "none",
              marginBottom: "24px",
              transition: "all 0.3s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Results
          </a>

          {/* Trophy Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.1) 100%)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                fill="#ffd700"
              />
            </svg>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#ffd700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Final Results
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>Results of </span>
            <span
              style={{
                background: "linear-gradient(135deg, #ffd700 0%, #ffb700 50%, #ffd700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.name}
            </span>
          </h1>
        </div>

        {/* Stats Summary */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "64px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          <div
            style={{
              padding: "24px 40px",
              background: "rgba(255, 215, 0, 0.08)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #ffd700 0%, #ffb700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {totalVotes}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Total Votes
            </div>
          </div>

          <div
            style={{
              padding: "24px 40px",
              background: "rgba(0, 255, 136, 0.08)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#00ff88",
              }}
            >
              {data.candidates?.length || 0}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Candidates
            </div>
          </div>

          <div
            style={{
              padding: "24px 40px",
              background: "rgba(0, 212, 255, 0.08)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#00d4ff",
              }}
            >
              {winnerPercentage}%
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Winner Margin
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        {data.candidates && data.candidates.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {data.candidates.map((item, index) => (
              <div
                key={index}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                }}
              >
                <Candidate
                  username={item}
                  index={index}
                  id={data._id}
                  vote={data.vote[index]}
                />
              </div>
            ))}
          </div>
        )}

        {/* Blockchain Verified Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "64px",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 24px",
              background: "rgba(0, 255, 136, 0.05)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              borderRadius: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "rgba(0, 255, 136, 0.1)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z"
                  stroke="#00ff88"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#00ff88",
                }}
              >
                Blockchain Verified Results
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                All votes cryptographically verified on-chain
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCandidate;
