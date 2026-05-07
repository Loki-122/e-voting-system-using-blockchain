import * as React from "react";
import { Link } from "react-router-dom";

export default function CardLayout(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const link = "" + props.link;

  // Generate a unique color based on index
  const colors = [
    { primary: "#00d4ff", secondary: "#0099cc" },
    { primary: "#00ff88", secondary: "#00cc6a" },
    { primary: "#8b5cf6", secondary: "#6d28d9" },
    { primary: "#ec4899", secondary: "#db2777" },
    { primary: "#f59e0b", secondary: "#d97706" },
  ];
  const colorSet = colors[props.index % colors.length];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px ${colorSet.primary}25`
          : "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border Effect */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          background: `linear-gradient(135deg, ${colorSet.primary}80 0%, ${colorSet.secondary}50 100%)`,
          borderRadius: "26px",
          zIndex: -1,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Header with Gradient Pattern (No Image) */}
      <div
        style={{
          position: "relative",
          height: "140px",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${colorSet.primary}20 0%, ${colorSet.secondary}15 50%, rgba(0, 0, 0, 0.3) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Animated Grid Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${colorSet.primary}10 1px, transparent 1px),
              linear-gradient(90deg, ${colorSet.primary}10 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
            opacity: 0.5,
          }}
        />

        {/* Decorative Circles */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "100px",
            height: "100px",
            background: `radial-gradient(circle, ${colorSet.primary}30 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            width: "80px",
            height: "80px",
            background: `radial-gradient(circle, ${colorSet.secondary}25 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* Election Icon/Initial */}
        <div
          style={{
            width: "72px",
            height: "72px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `0 8px 32px ${colorSet.primary}40`,
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {getInitials(props.title)}
        </div>

        {/* Status Badge */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "rgba(0, 255, 136, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 255, 136, 0.3)",
            borderRadius: "100px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              background: "#00ff88",
              borderRadius: "50%",
              boxShadow: "0 0 8px #00ff88",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#00ff88",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Active
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}
        >
          {props.title}
        </h3>

        {/* Candidates List */}
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: colorSet.primary,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Candidates
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {props.candidates.slice(0, 3).map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    background: `${colors[index % colors.length].primary}25`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: colors[index % colors.length].primary,
                  }}
                >
                  {index + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
            {props.candidates.length > 3 && (
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  paddingLeft: "12px",
                }}
              >
                +{props.candidates.length - 3} more candidates
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={link}
          state={{ info: props.info }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "14px 20px",
            background: isHovered
              ? `linear-gradient(135deg, ${colorSet.primary} 0%, ${colorSet.secondary} 100%)`
              : "rgba(255, 255, 255, 0.05)",
            border: isHovered ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            color: isHovered ? "#030014" : "#ffffff",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          View Details
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
