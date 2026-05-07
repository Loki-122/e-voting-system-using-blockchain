import React, { useEffect, useState } from "react";
import axios from "axios";
import { stringToAv, stringToColor } from "../../Data/Methods";
import { serverLink } from "../../Data/Variables";

const CandidateLayout = (props) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const link = "/login";

  const handleClick = async () => {
    setLoading(true);
    const sendingData = {
      candidate_id: data._id,
      candidate_username: props.username,
      election_id: props.id,
    };
    sessionStorage.setItem("voteContext", JSON.stringify(sendingData));
    setLoading(false);
    const query = new URLSearchParams({
      election_id: props.id,
      candidate_id: data._id,
      candidate_username: props.username,
    }).toString();
    window.location.href = `${link}?${query}`;
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get(serverLink + "candidate/" + props.username);
      let user = res.data;
      setData(user);
    }
    getData();
  }, [props.username]);

  const avatarColor = data ? stringToColor(data.firstName + " " + data.lastName) : "#00d4ff";

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 0, 20, 0.9)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "3px solid rgba(255, 255, 255, 0.1)",
              borderTopColor: "#00d4ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ color: "#ffffff", fontSize: "1rem" }}>Processing your vote...</span>
        </div>
      )}

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

        {/* Avatar Section */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px 24px",
            background: `radial-gradient(circle at 50% 0%, ${avatarColor}20, transparent 70%)`,
          }}
        >
          {/* Rank Badge */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0, 212, 255, 0.4)",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
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
              border: "3px solid rgba(255, 255, 255, 0.1)",
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

          {/* Decorative Ring */}
          <div
            style={{
              position: "absolute",
              width: "140px",
              height: "140px",
              borderRadius: "28px",
              border: "2px dashed rgba(255, 255, 255, 0.1)",
              top: "35px",
              animation: isHovered ? "rotate 10s linear infinite" : "none",
            }}
          />
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

          {/* Vote Button */}
          <button
            onClick={handleClick}
            disabled={!data || !data._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "16px 24px",
              background: (!data || !data._id)
                ? "rgba(255, 255, 255, 0.1)"
                : "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              border: "none",
              borderRadius: "14px",
              color: (!data || !data._id) ? "rgba(255, 255, 255, 0.5)" : "#030014",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: (!data || !data._id) ? "not-allowed" : "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: (!data || !data._id) ? "none" : "0 4px 15px rgba(0, 212, 255, 0.4)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              if (data && data._id) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 212, 255, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (data && data._id) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 212, 255, 0.4)";
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cast Your Vote
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default CandidateLayout;
