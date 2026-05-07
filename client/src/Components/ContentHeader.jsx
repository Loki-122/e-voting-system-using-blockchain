import React from "react";
import { Link } from "react-router-dom";

const ContentHeader = (props) => {
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf("/admin") + 7);
  const data = filename.split("/").filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        background: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Breadcrumbs */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Link
          to="/admin/dashboard"
          style={{
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.5)",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#8b5cf6")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.5)")}
        >
          Home
        </Link>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: "rgba(255, 255, 255, 0.3)" }}
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: "0.85rem",
                color: index === data.length - 1 ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                fontWeight: index === data.length - 1 ? 500 : 400,
                textTransform: "capitalize",
              }}
            >
              {item}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Action Button */}
      {props.title && (
        <Link
          to={props.link}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.3)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {props.title}
        </Link>
      )}
    </div>
  );
};

export default ContentHeader;
