import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import { Link } from "react-router-dom";

const ViewPhase = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPhaseColor = (phase) => {
    const p = String(phase).toLowerCase();
    if (p === "init") return { bg: "rgba(255, 193, 7, 0.1)", border: "rgba(255, 193, 7, 0.3)", text: "#ffc107" };
    if (p === "voting") return { bg: "rgba(0, 255, 136, 0.1)", border: "rgba(0, 255, 136, 0.3)", text: "#00ff88" };
    if (p === "result") return { bg: "rgba(139, 92, 246, 0.1)", border: "rgba(139, 92, 246, 0.3)", text: "#8b5cf6" };
    return { bg: "rgba(255, 255, 255, 0.05)", border: "rgba(255, 255, 255, 0.1)", text: "rgba(255, 255, 255, 0.6)" };
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "name", headerName: "Election Name", width: 250 },
    { field: "candidates", headerName: "Candidates", width: 220, hide: true },
    { 
      field: "currentPhase", 
      headerName: "Current Phase", 
      width: 180,
      renderCell: (params) => {
        const phase = params.row.currentPhase || "init";
        const colors = getPhaseColor(phase);
        return (
          <div
            style={{
              padding: "6px 12px",
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: "100px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: colors.text,
                boxShadow: `0 0 8px ${colors.text}`,
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: colors.text,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {phase}
            </span>
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const link = "edit/" + params.row._id;
        return (
          <Link to={link} style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s ease",
                color: "#8b5cf6",
                fontSize: "0.8rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      setLoading(true);
      try {
        let link = serverLink + "/elections";
        let res = await axios.get(link);
        let tmp = res.data;
        setData(tmp || []);
      } catch (error) {
        console.log("API not available");
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Calculate phase stats
  const phaseStats = {
    init: data.filter(d => (d.currentPhase || "init").toLowerCase() === "init").length,
    voting: data.filter(d => (d.currentPhase || "").toLowerCase() === "voting").length,
    result: data.filter(d => (d.currentPhase || "").toLowerCase() === "result").length,
  };

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
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Election Phases
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Manage election phases: Init, Voting, and Result
          </p>
        </div>

        {/* Phase Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 193, 7, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 193, 7, 0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 193, 7, 0.15)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#ffc107" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="#ffc107" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 193, 7, 0.8)", fontSize: "0.85rem", fontWeight: 500 }}>
                Init Phase
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#ffc107" }}>
              {loading ? "-" : phaseStats.init}
            </span>
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "4px" }}>
              Setup & Configuration
            </p>
          </div>

          <div
            style={{
              background: "rgba(0, 255, 136, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(0, 255, 136, 0.15)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(0, 255, 136, 0.8)", fontSize: "0.85rem", fontWeight: 500 }}>
                Voting Phase
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#00ff88" }}>
              {loading ? "-" : phaseStats.voting}
            </span>
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "4px" }}>
              Active Voting
            </p>
          </div>

          <div
            style={{
              background: "rgba(139, 92, 246, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(139, 92, 246, 0.15)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(139, 92, 246, 0.8)", fontSize: "0.85rem", fontWeight: 500 }}>
                Result Phase
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#8b5cf6" }}>
              {loading ? "-" : phaseStats.result}
            </span>
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "4px" }}>
              Results Published
            </p>
          </div>
        </div>

        {/* Phase Legend */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Init", desc: "Setup phase", color: "#ffc107" },
            { label: "Voting", desc: "Active voting", color: "#00ff88" },
            { label: "Result", desc: "Results published", color: "#8b5cf6" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: item.color,
                  boxShadow: `0 0 10px ${item.color}`,
                }}
              />
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginLeft: "8px",
                  }}
                >
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "80px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(139, 92, 246, 0.2)",
                borderTop: "3px solid #8b5cf6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            />
            <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>
              Loading election phases...
            </p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "80px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#8b5cf6" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              No Elections Found
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.9rem",
                marginBottom: "24px",
                maxWidth: "400px",
                margin: "0 auto 24px",
              }}
            >
              Create an election first to manage its phases. Each election goes through Init, Voting, and Result phases.
            </p>
            <a
              href="/admin/election/add"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                border: "none",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Create Election
            </a>
          </div>
        )}

        {/* Data Table */}
        {!loading && data.length > 0 && (
          <BasicTable columns={columns} checkboxSelection rows={data} />
        )}
      </div>
    </div>
  );
};

export default ViewPhase;
