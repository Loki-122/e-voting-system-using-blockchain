import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandidateLayout from "../Components/User/CandidateLayout";
import axios from "axios";
import { serverLink } from "../Data/Variables";

const ViewElection = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        let link = serverLink + "election/" + id;
        let res = await axios.get(link);
        let users = res.data;
        setData(users);
      } catch (error) {
        console.error("Error fetching election:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      }
    }
    getData();
  }, [id]);

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
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.12), transparent),
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
            marginBottom: "64px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Back Link */}
          <a
            href="/election"
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.3)";
              e.currentTarget.style.color = "#00d4ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Elections
          </a>

          {/* Election Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "rgba(0, 255, 136, 0.1)",
              border: "1px solid rgba(0, 255, 136, 0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
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
              Voting Open
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
            <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>Candidates of </span>
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.name || "Loading..."}
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.5)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Select a candidate and cast your vote. Your vote will be securely recorded on the blockchain.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 24px",
              gap: "24px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "3px solid rgba(255, 255, 255, 0.1)",
                borderTopColor: "#00d4ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.95rem" }}>
              Loading candidates...
            </span>
          </div>
        )}

        {/* Candidates Grid */}
        {!loading && data.candidates && data.candidates.length > 0 && (
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
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                }}
              >
                <CandidateLayout username={item} index={index} id={data._id} />
              </div>
            ))}
          </div>
        )}

        {/* Voting Instructions */}
        {!loading && data.candidates && data.candidates.length > 0 && (
          <div
            style={{
              marginTop: "64px",
              padding: "32px",
              background: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              borderRadius: "20px",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(0, 212, 255, 0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  Secure Voting Instructions
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  Click &quot;Cast Your Vote&quot; on your preferred candidate. You will be prompted to log in and connect your MetaMask wallet. Once confirmed, your vote will be permanently recorded on the blockchain with full transparency and security.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ViewElection;
