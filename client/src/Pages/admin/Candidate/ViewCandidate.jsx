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
      try {
        let res = await axios.get("http://localhost:1322/api/auth/candidates");
        let users = res.data;
        setData(users);
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
        <BasicTable
          columns={columns}
          rows={data}
          checkboxSelection={true}
          columnVisibilityModel={columnVisibilityModel}
        />
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
