import React, { useEffect, useState } from "react";
import CardLayout from "../Components/User/CardLayout";
import axios from "axios";
import { serverLink } from "../Data/Variables";

const Election = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(serverLink + "voting/elections");
        let users = res.data;
        setData(users);
      } catch (error) {
        console.error("Error fetching elections:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      }
    }
    getData();
  }, []);

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
          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "100px",
              marginBottom: "24px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#00d4ff",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Active Elections
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>Choose Your </span>
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Election
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
            Browse through ongoing elections and cast your vote securely on the blockchain.
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
              Loading elections...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "24px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              No Active Elections
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              There are currently no elections in the voting phase. Check back later!
            </p>
          </div>
        )}

        {/* Elections Grid */}
        {!loading && data.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "32px",
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                }}
              >
                <CardLayout
                  index={index}
                  title={item.name}
                  candidates={item.candidates}
                  election={item._id}
                  link={item._id}
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        {!loading && data.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              marginTop: "64px",
              padding: "24px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#00d4ff",
                }}
              >
                {data.length}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Active Elections
              </div>
            </div>
            <div
              style={{
                width: "1px",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#00ff88",
                }}
              >
                {data.reduce((acc, item) => acc + (item.candidates?.length || 0), 0)}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Total Candidates
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Election;
