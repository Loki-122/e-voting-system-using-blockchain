import React, { useState, useEffect } from "react";
import ContentHeader from "../../../Components/ContentHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddElection = () => {
  const navigate = useNavigate();
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [availableCandidates, setAvailableCandidates] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsVisible(true);
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:1322/api/auth/candidates");
      // API returns array directly, not wrapped in candidates property
      if (res.data && Array.isArray(res.data)) {
        setAvailableCandidates(res.data);
      } else if (res.data && res.data.candidates) {
        setAvailableCandidates(res.data.candidates);
      }
    } catch (error) {
      console.log("Error fetching candidates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const name = e.target.name.value;
    const candidates = selectedCandidates.map(c => c.username);
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

  const handleRemoveCandidate = (candidateId) => {
    setSelectedCandidates(selectedCandidates.filter(c => c._id !== candidateId));
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

              {/* Candidates Selection */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Select Candidates</label>
                
                {isLoading ? (
                  <div
                    style={{
                      padding: "14px 16px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(139, 92, 246, 0.3)",
                        borderTopColor: "#8b5cf6",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.95rem" }}>
                      Loading candidates...
                    </span>
                  </div>
                ) : availableCandidates.length === 0 ? (
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(255, 193, 7, 0.1)",
                      border: "1px solid rgba(255, 193, 7, 0.3)",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ color: "rgba(255, 193, 7, 0.9)", fontSize: "0.9rem", marginBottom: "12px" }}>
                      No candidates available. Please add candidates first.
                    </p>
                    <a
                      href="/admin/candidate/add"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 16px",
                        background: "rgba(255, 193, 7, 0.2)",
                        border: "1px solid rgba(255, 193, 7, 0.4)",
                        borderRadius: "8px",
                        color: "#ffc107",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Add Candidate
                    </a>
                  </div>
                ) : (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Search Input */}
                    <div style={{ padding: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search candidates..."
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Candidates List with Checkboxes */}
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {availableCandidates
                        .filter(c => 
                          c.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.name?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((candidate) => {
                          const isSelected = selectedCandidates.some(c => c._id === candidate._id);
                          return (
                            <label
                              key={candidate._id}
                              style={{
                                padding: "12px 16px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                                background: isSelected ? "rgba(139, 92, 246, 0.15)" : "transparent",
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.08)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = isSelected ? "rgba(139, 92, 246, 0.15)" : "transparent";
                              }}
                            >
                              {/* Checkbox */}
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    handleRemoveCandidate(candidate._id);
                                  } else {
                                    setSelectedCandidates([...selectedCandidates, candidate]);
                                  }
                                }}
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  accentColor: "#8b5cf6",
                                  cursor: "pointer",
                                }}
                              />

                              {/* Avatar */}
                              <div
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "10px",
                                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >
                                {candidate.profile ? (
                                  <img
                                    src={`http://localhost:1322/${candidate.profile}`}
                                    alt={candidate.username}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  />
                                ) : (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="7" r="4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              
                              {/* Info */}
                              <div style={{ flex: 1 }}>
                                <div style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 500 }}>
                                  {candidate.name || candidate.username}
                                </div>
                                <div style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.8rem" }}>
                                  @{candidate.username}
                                </div>
                              </div>

                              {/* Selected indicator */}
                              {isSelected && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path d="M20 6L9 17l-5-5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </label>
                          );
                        })}
                    </div>

                    {/* Selected count */}
                    <div
                      style={{
                        padding: "12px 16px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        background: "rgba(255, 255, 255, 0.02)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                        {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
                      </span>
                      {selectedCandidates.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedCandidates([])}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "rgba(239, 68, 68, 0.8)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            padding: "4px 8px",
                          }}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginTop: "8px",
                  }}
                >
                  Check the candidates you want to include in this election
                </p>
              </div>

              {/* Selected Candidates List */}
              {selectedCandidates.length > 0 && (
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
                    Selected Candidates ({selectedCandidates.length})
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {selectedCandidates.map((candidate, index) => (
                      <div
                        key={candidate._id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "8px 14px",
                          background: "rgba(139, 92, 246, 0.1)",
                          border: "1px solid rgba(139, 92, 246, 0.3)",
                          borderRadius: "100px",
                        }}
                      >
                        {/* Small Avatar */}
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "rgba(139, 92, 246, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          {candidate.profile ? (
                            <img
                              src={`http://localhost:1322/${candidate.profile}`}
                              alt={candidate.username}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <span
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                color: "#8b5cf6",
                              }}
                            >
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "#ffffff",
                          }}
                        >
                          {candidate.name || candidate.username}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCandidate(candidate._id)}
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
                  disabled={isSubmitting || selectedCandidates.length === 0}
                  style={{
                    padding: "14px 40px",
                    background: isSubmitting || selectedCandidates.length === 0
                      ? "rgba(139, 92, 246, 0.3)"
                      : "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: isSubmitting || selectedCandidates.length === 0 ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isSubmitting || selectedCandidates.length === 0 ? "none" : "0 4px 20px rgba(139, 92, 246, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    opacity: selectedCandidates.length === 0 ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && selectedCandidates.length > 0) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(139, 92, 246, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isSubmitting || selectedCandidates.length === 0 ? "none" : "0 4px 20px rgba(139, 92, 246, 0.4)";
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
                {selectedCandidates.length === 0 && !isLoading && availableCandidates.length > 0 && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 193, 7, 0.8)",
                      marginTop: "12px",
                    }}
                  >
                    Select at least one candidate to create an election
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
