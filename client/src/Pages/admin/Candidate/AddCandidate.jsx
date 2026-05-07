import * as React from "react";
import { useState, useEffect } from "react";
import ContentHeader from "../../../Components/ContentHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCandidate() {
  const today = new Date();
  const maxDate =
    today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
  const navigate = useNavigate();
  const [join, setJoin] = useState(2000);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const username = e.target.username.value;
    const firstName = e.target.fname.value;
    const lastName = e.target.lname.value;
    const dob = e.target.dob.value;
    const qualification = e.target.qualification.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const data = {
      username,
      firstName,
      lastName,
      dob,
      qualification,
      join,
      location,
      description,
    };

    try {
      const res = await axios.post("http://localhost:1322/api/auth/candidate/register", data);
      if (res.status === 201) {
        navigate("/admin/candidate");
      }
    } catch (error) {
      console.log("Error adding candidate:", error);
      alert("Failed to add candidate. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="7" r="4" stroke="#00ff88" strokeWidth="2"/>
                  <path d="M20 8v6M17 11h6" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                Add New Candidate
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                Register a candidate for elections
              </p>
            </div>

            {/* Form Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Username */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Username</label>
                <input
                  name="username"
                  required
                  placeholder="Enter candidate username"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* First Name */}
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  name="fname"
                  required
                  placeholder="Enter first name"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Last Name */}
              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  name="lname"
                  required
                  placeholder="Enter last name"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  required
                  max={maxDate}
                  style={{
                    ...inputStyle,
                    colorScheme: "dark",
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Politics Join Year */}
              <div>
                <label style={labelStyle}>Politics Join From (Year)</label>
                <input
                  type="number"
                  value={join}
                  onChange={(e) => setJoin(e.target.value)}
                  min={1900}
                  max={2099}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Qualification */}
              <div>
                <label style={labelStyle}>Qualification</label>
                <input
                  name="qualification"
                  required
                  placeholder="Enter qualification"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Location */}
              <div>
                <label style={labelStyle}>Location</label>
                <input
                  name="location"
                  required
                  placeholder="Enter location"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Description */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Enter candidate description and background"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: "32px", textAlign: "center" }}>
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
                    Adding Candidate...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Candidate
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
          input::placeholder, textarea::placeholder {
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
}
