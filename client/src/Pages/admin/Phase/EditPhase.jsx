import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serverLink } from "../../../Data/Variables";
import ContentHeader from "../../../Components/ContentHeader";
import { phases } from "../../../Data/Variables";

const EditPhase = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      try {
        let link = serverLink + "/election/" + id;
        let res = await axios.get(link);
        let tmp = res.data;
        setData(tmp);
        setCandidates(tmp.candidates || []);
        setSelectedPhase(tmp.currentPhase || "init");
      } catch (error) {
        console.log("Error fetching election data:", error);
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = e.target.name.value;
    const newData = { name, currentPhase: selectedPhase };

    try {
      const link = serverLink + "phase/edit/" + data._id;
      const res = await axios.post(link, newData);
      if (res.status === 201) {
        navigate("/admin/phase");
      }
    } catch (error) {
      console.log("Error updating phase:", error);
      alert("Failed to update phase. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPhaseInfo = (phase) => {
    const p = String(phase).toLowerCase();
    if (p === "init") return { 
      color: "#ffc107", 
      bg: "rgba(255, 193, 7, 0.1)", 
      border: "rgba(255, 193, 7, 0.3)",
      desc: "Setup and preparation phase" 
    };
    if (p === "voting") return { 
      color: "#00ff88", 
      bg: "rgba(0, 255, 136, 0.1)", 
      border: "rgba(0, 255, 136, 0.3)",
      desc: "Active voting period" 
    };
    if (p === "result") return { 
      color: "#8b5cf6", 
      bg: "rgba(139, 92, 246, 0.1)", 
      border: "rgba(139, 92, 246, 0.3)",
      desc: "Results published to users" 
    };
    return { color: "rgba(255, 255, 255, 0.6)", bg: "rgba(255, 255, 255, 0.05)", border: "rgba(255, 255, 255, 0.1)", desc: "" };
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: "8px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
    e.target.style.boxShadow = "none";
  };

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(139, 92, 246, 0.2)",
            borderTopColor: "#8b5cf6",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <ContentHeader />
      <div style={{ padding: "32px" }}>
        <form onSubmit={handleSubmit} method="POST">
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "20px",
              padding: "32px",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(0, 255, 136, 0.2) 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "8px",
                }}
              >
                Edit Election Phase
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                Update the phase status for this election
              </p>
            </div>

            {/* Form */}
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              {/* Election Name */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Election Name</label>
                <input
                  name="name"
                  required
                  defaultValue={data.name}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Candidates (Read Only) */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Candidates</label>
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px",
                  }}
                >
                  {candidates.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {candidates.map((candidate, index) => (
                        <span
                          key={index}
                          style={{
                            padding: "6px 14px",
                            background: "rgba(139, 92, 246, 0.1)",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            borderRadius: "100px",
                            fontSize: "0.85rem",
                            color: "#8b5cf6",
                          }}
                        >
                          {candidate}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.9rem" }}>
                      No candidates assigned
                    </span>
                  )}
                </div>
              </div>

              {/* Phase Selection */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Election Phase</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                  }}
                >
                  {phases.map((phase) => {
                    const info = getPhaseInfo(phase);
                    const isSelected = selectedPhase === phase;
                    return (
                      <button
                        key={phase}
                        type="button"
                        onClick={() => setSelectedPhase(phase)}
                        style={{
                          padding: "20px 16px",
                          background: isSelected ? info.bg : "rgba(255, 255, 255, 0.02)",
                          border: `2px solid ${isSelected ? info.color : "rgba(255, 255, 255, 0.06)"}`,
                          borderRadius: "14px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background = info.bg;
                            e.currentTarget.style.borderColor = info.border;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                          }
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: info.color,
                              boxShadow: isSelected ? `0 0 12px ${info.color}` : "none",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              color: isSelected ? info.color : "rgba(255, 255, 255, 0.7)",
                              textTransform: "capitalize",
                            }}
                          >
                            {phase}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "rgba(255, 255, 255, 0.4)",
                            margin: 0,
                          }}
                        >
                          {info.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Status */}
              <div
                style={{
                  padding: "16px 20px",
                  background: getPhaseInfo(selectedPhase).bg,
                  border: `1px solid ${getPhaseInfo(selectedPhase).border}`,
                  borderRadius: "12px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke={getPhaseInfo(selectedPhase).color} strokeWidth="2"/>
                  <path d="M12 8v4l3 3" stroke={getPhaseInfo(selectedPhase).color} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "2px",
                    }}
                  >
                    Selected Phase
                  </div>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: getPhaseInfo(selectedPhase).color,
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedPhase}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "14px 40px",
                    background: isSubmitting
                      ? "rgba(139, 92, 246, 0.3)"
                      : "linear-gradient(135deg, #8b5cf6 0%, #00ff88 100%)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isSubmitting ? "none" : "0 4px 20px rgba(139, 92, 246, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(139, 92, 246, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isSubmitting ? "none" : "0 4px 20px rgba(139, 92, 246, 0.4)";
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          border: "2px solid rgba(255, 255, 255, 0.3)",
                          borderTopColor: "#ffffff",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Updating Phase...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Update Phase
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
          input::placeholder {
            color: rgba(255, 255, 255, 0.3);
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EditPhase;
