import React from "react";
import ContentHeader from "../../../Components/ContentHeader";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DashboardCard from "../../../Components/DashboardCard";
import { Link } from "react-router-dom";

const ViewDashboard = () => {
  const [users, setUsers] = useState(0);
  const [candidates, setCandidates] = useState(0);
  const [elections, setElections] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    async function getUsers() {
      try {
        let res = await axios.get("http://localhost:1322/api/auth/users");
        let users = res.data;
        res = null;
        setUsers(users.length);
        res = await axios.get("http://localhost:1322/api/auth/candidates");
        let candidates = res.data;
        setCandidates(candidates.length);
        res = await axios.get("http://localhost:1322/api/auth/elections");
        let elections = res.data;
        setElections(elections.length);
      } catch (error) {
        console.log("API not available - using demo data");
        setUsers(156);
        setCandidates(24);
        setElections(8);
      }
    }
    getUsers();
  }, []);

  const stats = [
    { 
      title: "Total Users", 
      value: users, 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "#00d4ff",
      link: "/admin/user",
      change: "+12%",
    },
    { 
      title: "Candidates", 
      value: candidates, 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: "#00ff88",
      link: "/admin/candidate",
      change: "+8%",
    },
    { 
      title: "Elections", 
      value: elections, 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "#8b5cf6",
      link: "/admin/election",
      change: "+3",
    },
  ];

  const quickActions = [
    { title: "Add User", link: "/admin/user/add", icon: "user-plus" },
    { title: "Add Candidate", link: "/admin/candidate/add", icon: "user-check" },
    { title: "New Election", link: "/admin/election/add", icon: "vote" },
    { title: "View Results", link: "/admin/result", icon: "chart" },
  ];

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "40px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
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
              background: "#00ff88",
              borderRadius: "50%",
              boxShadow: "0 0 10px #00ff88",
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
            System Online
          </span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          Dashboard Overview
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          Welcome back! Here is what is happening with your voting system.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            style={{
              textDecoration: "none",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * (index + 1)}s`,
            }}
          >
            <div
              style={{
                padding: "28px",
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.borderColor = `${stat.color}40`;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px ${stat.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Gradient Accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: `${stat.color}15`,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    background: "rgba(0, 255, 136, 0.1)",
                    borderRadius: "100px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#00ff88",
                  }}
                >
                  {stat.change}
                </div>
              </div>

              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "4px",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {stat.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8b5cf6",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {action.title}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginLeft: "auto", color: "rgba(255, 255, 255, 0.3)" }}
                >
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div
        style={{
          marginTop: "40px",
          padding: "24px",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "20px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          System Status
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            { label: "Blockchain", status: "Operational", color: "#00ff88" },
            { label: "Database", status: "Operational", color: "#00ff88" },
            { label: "API Server", status: "Operational", color: "#00ff88" },
            { label: "Smart Contract", status: "Deployed", color: "#00d4ff" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: item.color,
                  borderRadius: "50%",
                  boxShadow: `0 0 10px ${item.color}`,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: item.color,
                  }}
                >
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDashboard;
