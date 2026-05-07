import React, { useEffect, useState } from "react";
import axios from "axios";
import { stringToColor, stringToAv } from "../../Data/Methods";
import { serverLink } from "../../Data/Variables";

const Candidate = (props) => {
  const [data, setData] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function getData() {
      let res = await axios.get(serverLink + "candidate/" + props.username);
      let user = res.data;
      setData(user);
    }
    getData();
  }, [props.username]);

  const avatarColor = data ? stringToColor(data.firstName + " " + data.lastName) : "#00d4ff";
  const isWinner = props.index === 0;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isWinner 
          ? "1px solid rgba(255, 215, 0, 0.3)" 
          : "1px solid rgba(255, 255, 255, 0.06)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? isWinner
            ? "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)"
            : "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.15)"
          : "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Winner Crown Badge */}
      {isWinner && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.15) 100%)",
            border: "1px solid rgba(255, 215, 0, 0.4)",
            borderRadius: "100px",
            zIndex: 10,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
              fill="#ffd700"
            />
          </svg>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#ffd700",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Winner
          </span>
        </div>
      )}

      {/* Gradient Border Effect */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          background: isWinner
            ? "linear-gradient(135deg, rgba(255, 215, 0, 0.6) 0%, rgba(255, 193, 7, 0.4) 50%, rgba(255, 215, 0, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(0, 212, 255, 0.5) 0%, rgba(0, 255, 136, 0.3) 50%, rgba(255, 0, 110, 0.5) 100%)",
          borderRadius: "26px",
          zIndex: -1,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Avatar Section */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px 24px",
          background: isWinner
            ? `radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15), transparent 70%)`
            : `radial-gradient(circle at 50% 0%, ${avatarColor}20, transparent 70%)`,
        }}
      >
        {/* Rank Badge */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "40px",
            height: "40px",
            background: isWinner
              ? "linear-gradient(135deg, #ffd700 0%, #ffb700 100%)"
              : props.index === 1
              ? "linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)"
              : props.index === 2
              ? "linear-gradient(135deg, #cd7f32 0%, #a0522d 100%)"
              : "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isWinner 
              ? "0 4px 15px rgba(255, 215, 0, 0.4)"
              : "0 4px 12px rgba(0, 212, 255, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#030014",
            }}
          >
            #{props.index + 1}
          </span>
        </div>

        {/* Avatar */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "24px",
            background: `linear-gradient(135deg, ${avatarColor} 0%, ${avatarColor}80 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 10px 30px ${avatarColor}40`,
            border: isWinner 
              ? "3px solid rgba(255, 215, 0, 0.5)"
              : "3px solid rgba(255, 255, 255, 0.1)",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          <span
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            {data !== "" && stringToAv(data.firstName, data.lastName)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 24px 24px", textAlign: "center" }}>
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "4px",
            letterSpacing: "-0.01em",
          }}
        >
          {props.username}
        </h3>

        {data && (
          <>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "8px",
              }}
            >
              {data.firstName} {data.lastName}
            </p>

            {/* Location Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "100px",
                marginBottom: "20px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="2"
                />
                <circle cx="12" cy="10" r="3" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" />
              </svg>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {data.location || "Location not set"}
              </span>
            </div>
          </>
        )}

        {/* Vote Count */}
        <div
          style={{
            padding: "20px",
            background: isWinner
              ? "rgba(255, 215, 0, 0.08)"
              : "rgba(0, 212, 255, 0.05)",
            border: isWinner
              ? "1px solid rgba(255, 215, 0, 0.2)"
              : "1px solid rgba(0, 212, 255, 0.15)",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Total Votes
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              background: isWinner
                ? "linear-gradient(135deg, #ffd700 0%, #ffb700 100%)"
                : "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {props.vote || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
