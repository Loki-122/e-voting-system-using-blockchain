import React from "react";
import { Button, Typography, Box, Grid, Paper } from "@mui/material";
import InputField from "../../../Components/Form/InputField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";

const AddUser = () => {
  const navigate = useNavigate();
  const [locationData, setLocation] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const password = e.target.password.value;
    const location = locationData.country_name;
    const profile = e.target.profile.files[0];
    const sendData = new FormData();
    sendData.append("username", username);
    sendData.append("fname", fname);
    sendData.append("lname", lname);
    sendData.append("email", email);
    sendData.append("mobile", mobile);
    sendData.append("password", password);
    sendData.append("location", location);
    sendData.append("profile", profile);
    sendData.append("avatar", username + "." + profile.name.split(".").pop());

    axios.post(serverLink + "register", sendData).then((res) => {
      if (res.status === 201) {
        navigate("/admin/user");
      }
    });
  };

  useEffect(() => {
    setIsVisible(true);
    async function getData() {
      await axios
        .get("https://geolocation-db.com/json/")
        .then((res) => {
          setLocation(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);

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
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              Add New User
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.5)",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              Create a new user account for the voting system
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Username</label>
                <input
                  name="username"
                  placeholder="Enter username"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  name="fname"
                  placeholder="Enter first name"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  name="lname"
                  placeholder="Enter last name"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Mobile Number</label>
                <input
                  name="mobile"
                  placeholder="Enter mobile number"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm password"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.target.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Profile Image</label>
                <div
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    name="profile"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>Choose a file or drag it here</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "14px 40px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(139, 92, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(139, 92, 246, 0.4)";
                }}
              >
                Add User
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
        `}
      </style>
    </div>
  );
};

export default AddUser;
