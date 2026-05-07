import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Candidate from "../../../Components/Admin/Candidate";
import ContentHeader from "../../../Components/ContentHeader";

const ViewElectionResult = () => {
  const location = useLocation();
  const data = location.state?.info;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // If no data, show error state
  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          padding: "32px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "8px",
          }}
        >
          Election Data Not Found
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(255, 255, 255, 0.5)",
            marginBottom: "24px",
          }}
        >
          Please navigate from the results page to view election details.
        </p>
        <Link
          to="/admin/result"
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Results
        </Link>
      </div>
    );
  }

  // Calculate statistics
  const totalVotes = data.vote ? data.vote.reduce((sum, v) => sum + (v || 0), 0) : 0;
  const winnerIndex = data.vote ? data.vote.indexOf(Math.max(...data.vote)) : 0;
  const winnerName = data.candidates?.[winnerIndex] || "N/A";

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <ContentHeader />
      <div style={{ padding: "32px" }}>
        {/* Header Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          {/* Election Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "100px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: "#8b5cf6",
                borderRadius: "50%",
                boxShadow: "0 0 10px #8b5cf6",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#8b5cf6",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Election Results
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            {data.name}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.5)",
              marginBottom: "32px",
            }}
          >
            Final results and vote distribution
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {/* Total Votes */}
            <div
              style={{
                padding: "20px",
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Total Votes
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#00d4ff",
                }}
              >
                {totalVotes}
              </div>
            </div>

            {/* Candidates */}
            <div
              style={{
                padding: "20px",
                background: "rgba(139, 92, 246, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Candidates
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#8b5cf6",
                }}
              >
                {data.candidates?.length || 0}
              </div>
            </div>

            {/* Winner */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255, 215, 0, 0.05)",
                border: "1px solid rgba(255, 215, 0, 0.15)",
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Winner
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#ffd700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                    fill="#ffd700"
                  />
                </svg>
                {winnerName}
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Candidate Results
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {data.candidates != null &&
            data.candidates.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * index}s`,
                  }}
                >
                  <Candidate
                    username={item}
                    index={index}
                    id={data._id}
                    vote={data.vote?.[index] || 0}
                  />
                </div>
              );
            })}
        </div>

        {/* Vote Distribution Bar */}
        {data.vote && data.vote.length > 0 && totalVotes > 0 && (
          <div
            style={{
              marginTop: "40px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Vote Distribution
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.candidates.map((candidate, index) => {
                const votes = data.vote[index] || 0;
                const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
                const colors = ["#ffd700", "#c0c0c0", "#cd7f32", "#8b5cf6", "#00d4ff", "#00ff88"];
                const color = colors[index % colors.length];
                
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: color,
                          }}
                        />
                        {candidate}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {votes} votes ({percentage}%)
                      </span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}80)`,
                          borderRadius: "100px",
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link
            to="/admin/result"
            style={{
              padding: "14px 32px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to All Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewElectionResult;
