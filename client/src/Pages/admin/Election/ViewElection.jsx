import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import "../../../style.css";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { Alert, Snackbar } from "@mui/material";

const ViewElection = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "name", headerName: "Election Name", width: 250 },
    { 
      field: "candidates", 
      headerName: "Candidates", 
      width: 300,
      renderCell: (params) => {
        const candidates = params.row.candidates || [];
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}
            </span>
            {candidates.length > 0 && (
              <div
                style={{
                  padding: "4px 8px",
                  background: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  color: "#8b5cf6",
                }}
              >
                {candidates.slice(0, 2).join(", ")}
                {candidates.length > 2 && "..."}
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const deleteBtn = () => {
          const link = serverLink + "election/delete/" + params.row._id;
          axios.get(link);
          setOpen(true);
        };
        return (
          <button
            onClick={deleteBtn}
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.2s ease",
              color: "#ef4444",
              fontSize: "0.8rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete
          </button>
        );
      },
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      setLoading(true);
      try {
        let res = await axios.get("http://localhost:1322/api/auth/elections");
        let elections = res.data;
        setData(elections);
      } catch (error) {
        console.log("API not available");
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [open]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <ContentHeader title="Add Election" link="/admin/election/add" />
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
            Election Management
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Create and manage elections in the blockchain voting system
          </p>
        </div>

        {/* Stats Cards */}
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
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
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
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Total Elections
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff" }}>
              {loading ? "-" : data.length}
            </span>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
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
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Total Candidates
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff" }}>
              {loading ? "-" : data.reduce((acc, el) => acc + (el.candidates?.length || 0), 0)}
            </span>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
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
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Blockchain Status
              </span>
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "#22c55e" }}>
              Active
            </span>
          </div>
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
              Loading elections...
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
                <path d="M9 11l3 3L22 4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              No Elections Yet
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
              Create your first blockchain-based election to get started. Elections are immutable and transparent.
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
              Create First Election
            </a>
          </div>
        )}

        {/* Data Table */}
        {!loading && data.length > 0 && (
          <BasicTable columns={columns} rows={data} />
        )}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert 
          onClose={handleClose} 
          severity="error" 
          sx={{ 
            width: "100%",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            backdropFilter: "blur(10px)",
          }}
        >
          Election Deleted
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewElection;
