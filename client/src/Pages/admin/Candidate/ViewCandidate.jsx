import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import "../../../style.css";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

const ViewCandidate = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const dateConverter = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const columnVisibilityModel = {
    _id: false,
    qualification: false,
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "fname",
      headerName: "Full Name",
      valueGetter: (data) => {
        return data.row.firstName + " " + data.row.lastName;
      },
      width: 300,
    },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "dob",
      headerName: "Date of Birth",
      valueGetter: (params) => dateConverter(params.row.dob),
      width: 120,
      hide: true,
    },
    {
      field: "qualification",
      headerName: "Qualification",
      width: 200,
    },
    {
      field: "time",
      headerName: "Updated At",
      width: 120,
      valueGetter: (params) => dateConverter(params.row.updatedAt),
      hide: true,
    },
    {
      field: "delete",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        const deleteBtn = () => {
          const link = serverLink + "candidate/delete/" + params.row._id;
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
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      setLoading(true);
      try {
        let res = await axios.get("http://localhost:1322/api/auth/candidates");
        let users = res.data;
        setData(users);
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
      <ContentHeader title="Add Candidate" link="/admin/candidate/add" />
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
            Candidate Management
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Manage election candidates in the system
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Total Candidates
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Verified
              </span>
            </div>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>
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
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#3b82f6" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#3b82f6" strokeWidth="2"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Status
              </span>
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "#3b82f6" }}>
              Ready for Elections
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
              Loading candidates...
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              No Candidates Yet
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
              Register candidates to participate in blockchain elections. Each candidate will be verified and stored on-chain.
            </p>
            <a
              href="/admin/candidate/add"
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
              Add First Candidate
            </a>
          </div>
        )}

        {/* Data Table */}
        {!loading && data.length > 0 && (
          <BasicTable
            columns={columns}
            rows={data}
            checkboxSelection={true}
            columnVisibilityModel={columnVisibilityModel}
          />
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
          Candidate Deleted
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewCandidate;
