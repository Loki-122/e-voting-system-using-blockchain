import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import "../../../style.css";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "mobile", headerName: "Mobile", width: 200 },
    {
      field: "time",
      headerName: "Updated At",
      width: 200,
      valueGetter: (params) => {
        let date = new Date(params.row.updatedAt);
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      },
      hide: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        const link = "edit/" + params.row._id;
        return (
          <Link to={link}>
            <button
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        const deleteBtn = () => {
          const link = serverLink + "user/delete/" + params.row._id;
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
        let res = await axios.get(serverLink + "users");
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
      <ContentHeader title="Add User" link="/admin/user/add" />
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
            User Management
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Manage all registered users in the system
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Total Users
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                Active Status
              </span>
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "#22c55e" }}>
              All Systems Active
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
              Loading users...
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              No Users Yet
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
              Add your first user to enable blockchain voting capabilities.
            </p>
            <a
              href="/admin/user/add"
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
              Add First User
            </a>
          </div>
        )}

        {/* Data Table */}
        {!loading && data.length > 0 && (
          <BasicTable columns={columns} rows={data} checkboxSelection={true} />
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
          User Deleted
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewUser;
