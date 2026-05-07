import * as React from "react";
import { Link } from "react-router-dom";

export default function CardLayout(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const image = "https://picsum.photos/400/300?random=" + (props.index + 10);
  const link = "" + props.link;

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
          ? "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.15)"
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
          background: "linear-gradient(135deg, rgba(0, 212, 255, 0.5) 0%, rgba(0, 255, 136, 0.3) 50%, rgba(255, 0, 110, 0.5) 100%)",
          borderRadius: "26px",
          zIndex: -1,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Image Container */}
      <div
        style={{
          position: "relative",
          height: "180px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={props.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
          crossOrigin="anonymous"
        />
        {/* Overlay Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(3, 0, 20, 0.9) 0%, transparent 60%)",
          }}
        />

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

        {/* Election Icon */}
        <div
          style={{
            position: "absolute",
            bottom: "-24px",
            left: "24px",
            width: "56px",
            height: "56px",
            background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0, 212, 255, 0.4)",
            border: "3px solid #030014",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z"
              stroke="#030014"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 24px 24px" }}>
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
              color: "#00d4ff",
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
                    background: `linear-gradient(135deg, ${index === 0 ? '#00d4ff' : index === 1 ? '#00ff88' : '#ff006e'} 0%, ${index === 0 ? '#0099cc' : index === 1 ? '#00cc6a' : '#cc0058'} 100%)`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#030014",
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
              ? "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)"
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
