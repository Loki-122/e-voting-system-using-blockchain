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
      try {
        let res = await axios.get("http://localhost:1322/api/auth/elections");
        let elections = res.data;
        setData(elections);
      } catch (error) {
        console.log("API not available");
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
        <BasicTable columns={columns} rows={data} />
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
