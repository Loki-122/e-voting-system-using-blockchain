import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../../Data/Variables";

export default function ElectionResult(props) {
  const [publishing, setPublishing] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const isPublished = String(props.currentPhase || "").toLowerCase() === "result";

  const handlePublish = async () => {
    if (!props.electionId) {
      alert("Election ID not found.");
      return;
    }
    setPublishing(true);
    try {
      const payload = { name: props.title, currentPhase: "result" };
      const res = await axios.post(
        `${serverLink}phase/edit/${props.electionId}`,
        payload
      );
      if (res.status === 201) {
        alert("Result published for users.");
      } else {
        alert("Failed to publish result.");
      }
    } catch (err) {
      alert(err.response?.data || "Failed to publish result.");
    } finally {
      setPublishing(false);
    }
  };

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
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(10px)",
        border: hovering
          ? "1px solid rgba(139, 92, 246, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovering ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovering
          ? "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)"
          : "none",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Header with Gradient */}
      <div
        style={{
          height: "100px",
          background: `linear-gradient(135deg, 
            rgba(139, 92, 246, ${0.2 + (props.index % 3) * 0.1}) 0%, 
            rgba(236, 72, 153, ${0.15 + (props.index % 2) * 0.1}) 50%,
            rgba(0, 212, 255, ${0.1 + (props.index % 4) * 0.05}) 100%)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Election Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {getInitials(props.title)}
        </div>

        {/* Status Badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "6px 12px",
            background: isPublished
              ? "rgba(0, 255, 136, 0.15)"
              : "rgba(255, 193, 7, 0.15)",
            border: isPublished
              ? "1px solid rgba(0, 255, 136, 0.3)"
              : "1px solid rgba(255, 193, 7, 0.3)",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isPublished ? "#00ff88" : "#ffc107",
              boxShadow: isPublished ? "0 0 8px #00ff88" : "0 0 8px #ffc107",
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: isPublished ? "#00ff88" : "#ffc107",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {isPublished ? "Published" : "Pending"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "16px",
            letterSpacing: "-0.01em",
          }}
        >
          {props.title}
        </h3>

        {/* Candidates List */}
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.5)",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Candidates
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {props.candidates.slice(0, 3).map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    background: `linear-gradient(135deg, ${
                      ["#8b5cf6", "#00d4ff", "#00ff88", "#ec4899"][index % 4]
                    }30, transparent)`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: ["#8b5cf6", "#00d4ff", "#00ff88", "#ec4899"][index % 4],
                  }}
                >
                  {index + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.8)",
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
                +{props.candidates.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to={props.link}
            state={{ info: props.info }}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
              textAlign: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            View Details
          </Link>

          <button
            onClick={handlePublish}
            disabled={publishing || isPublished}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: isPublished
                ? "rgba(0, 255, 136, 0.1)"
                : "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              border: isPublished ? "1px solid rgba(0, 255, 136, 0.3)" : "none",
              borderRadius: "10px",
              color: isPublished ? "#00ff88" : "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: publishing || isPublished ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              opacity: publishing ? 0.7 : 1,
            }}
          >
            {isPublished
              ? "Published"
              : publishing
              ? "Publishing..."
              : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
