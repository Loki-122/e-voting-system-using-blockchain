import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/admin");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        textAlign: "center",
      }}
    >
      {/* Animation Container */}
      <div
        style={{
          width: "100px",
          height: "100px",
          background: "rgba(139, 92, 246, 0.1)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          position: "relative",
        }}
      >
        {/* Spinning Ring */}
        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            border: "2px solid transparent",
            borderTopColor: "#8b5cf6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        {/* Icon */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "12px",
        }}
      >
        Signing Out
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "rgba(255, 255, 255, 0.5)",
          marginBottom: "24px",
        }}
      >
        You are being redirected to the login page...
      </p>

      {/* Countdown */}
      <div
        style={{
          width: "60px",
          height: "60px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#8b5cf6",
          }}
        >
          {countdown}
        </span>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogout;
