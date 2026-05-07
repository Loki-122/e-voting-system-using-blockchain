import React, { useState, useEffect } from "react";
import ContentHeader from "../../../Components/ContentHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddElection = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [candidateInput, setCandidateInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const name = e.target.name.value;
    const data = { name, candidates };

    try {
      const res = await axios.post("http://localhost:1322/api/auth/election/register", data);
      if (res.status === 201) {
        navigate("/admin/election");
      }
    } catch (error) {
      console.log("Error creating election:", error);
      alert("Failed to create election. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCandidate = () => {
    if (candidateInput.trim() && !candidates.includes(candidateInput.trim())) {
      setCandidates([...candidates, candidateInput.trim()]);
      setCandidateInput("");
    }
  };

  const handleRemoveCandidate = (indexToRemove) => {
    setCandidates(candidates.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCandidate();
    }
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
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                Create New Election
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                Set up a new election with candidates
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
                  placeholder="Enter election name (e.g., Presidential Election 2024)"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Candidates */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Candidates</label>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <input
                    value={candidateInput}
                    onChange={(e) => setCandidateInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter candidate username"
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={handleAddCandidate}
                    style={{
                      padding: "14px 20px",
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "12px",
                      color: "#8b5cf6",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginTop: "8px",
                  }}
                >
                  Press Enter or click Add to add a candidate
                </p>
              </div>

              {/* Candidates List */}
              {candidates.length > 0 && (
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "14px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Added Candidates ({candidates.length})
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {candidates.map((candidate, index) => (
                      <div
                        key={index}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 14px",
                          background: "rgba(139, 92, 246, 0.1)",
                          border: "1px solid rgba(139, 92, 246, 0.3)",
                          borderRadius: "100px",
                        }}
                      >
                        <span
                          style={{
                            width: "24px",
                            height: "24px",
                            background: "rgba(139, 92, 246, 0.2)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "#8b5cf6",
                          }}
                        >
                          {index + 1}
                        </span>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "#ffffff",
                          }}
                        >
                          {candidate}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCandidate(index)}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: 0,
                            background: "rgba(239, 68, 68, 0.2)",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(239, 68, 68, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={isSubmitting || candidates.length === 0}
                  style={{
                    padding: "14px 40px",
                    background: isSubmitting || candidates.length === 0
                      ? "rgba(139, 92, 246, 0.3)"
                      : "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: isSubmitting || candidates.length === 0 ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isSubmitting || candidates.length === 0 ? "none" : "0 4px 20px rgba(139, 92, 246, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    opacity: candidates.length === 0 ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && candidates.length > 0) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(139, 92, 246, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isSubmitting || candidates.length === 0 ? "none" : "0 4px 20px rgba(139, 92, 246, 0.4)";
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
                      Creating Election...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Create Election
                    </>
                  )}
                </button>
                {candidates.length === 0 && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 193, 7, 0.8)",
                      marginTop: "12px",
                    }}
                  >
                    Add at least one candidate to create an election
                  </p>
                )}
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

export default AddElection;
