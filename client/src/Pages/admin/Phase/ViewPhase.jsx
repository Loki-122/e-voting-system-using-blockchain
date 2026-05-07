import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import { Link } from "react-router-dom";

const ViewPhase = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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
      try {
        let link = serverLink + "/elections";
        let res = await axios.get(link);
        let tmp = res.data;
        setData(tmp || []);
      } catch (error) {
        console.log("API not available");
        setData([]);
      }
    }
    getData();
  }, []);

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

        <BasicTable columns={columns} checkboxSelection rows={data} />
      </div>
    </div>
  );
};

export default ViewPhase;
