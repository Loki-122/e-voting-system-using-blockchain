import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      try {
        const link = serverLink + "user/" + id;
        const res = await axios.get(link);
        setData(res.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const username = e.target.username.value;
    const email = e.target.email.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const mobile = e.target.mobile.value;
    const profile = e.target.profile.files[0];
    const sendData = new FormData();
    sendData.append("username", username);
    sendData.append("fname", fname);
    sendData.append("lname", lname);
    sendData.append("email", email);
    sendData.append("mobile", mobile);
    
    if (profile) {
      sendData.append("profile", profile);
      sendData.append("avatar", username + "." + profile.name.split(".").pop());
    }

    try {
      const link = serverLink + "user/edit/" + data._id;
      const res = await axios.post(link, sendData);
      if (res.status === 201) {
        navigate("/admin/user");
      }
    } catch (error) {
      console.log("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
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
              {/* Profile Image Preview */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: previewImage 
                    ? `url(${previewImage}) center/cover`
                    : "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%)",
                  border: "2px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  overflow: "hidden",
                }}
              >
                {!previewImage && (
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#8b5cf6",
                    }}
                  >
                    {data.username ? data.username.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "8px",
                }}
              >
                Edit User
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                Update user information
              </p>
            </div>

            {/* Form Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {/* Username */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Username</label>
                <input
                  name="username"
                  required
                  defaultValue={data.username}
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
                  defaultValue={data.fname}
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
                  defaultValue={data.lname}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Email */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={data.email}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Mobile */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Mobile Number</label>
                <input
                  name="mobile"
                  required
                  defaultValue={data.mobile}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Profile Image */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Profile Image</label>
                <div
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                    padding: "16px",
                  }}
                >
                  <input
                    type="file"
                    name="profile"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                      left: 0,
                      top: 0,
                    }}
                  />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    {previewImage ? "Image selected - Click to change" : "Choose a new profile image (optional)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div
              style={{
                maxWidth: "800px",
                margin: "24px auto 0",
                padding: "16px 20px",
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: 0,
                }}
              >
                Leave the profile image empty to keep the current image. Only upload a new image if you want to change it.
              </p>
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
                    : "linear-gradient(135deg, #8b5cf6 0%, #00d4ff 100%)",
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
                    Updating User...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Update User
                  </>
                )}
              </button>
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

export default EditUser;
