import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { serverLink, isFaceRecognitionEnable } from "../Data/Variables";
import { ObjectGroupBy } from "../Data/Methods";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  
  const getContextFromQuery = (search) => {
    const params = new URLSearchParams(search);
    const election_id = params.get("election_id");
    const candidate_id = params.get("candidate_id");
    const candidate_username = params.get("candidate_username") || "";
    if (!election_id || !candidate_id) return null;
    return { election_id, candidate_id, candidate_username };
  };

  const [voteContext, setVoteContext] = useState(() => {
    const raw = sessionStorage.getItem("voteContext");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      sessionStorage.removeItem("voteContext");
      return null;
    }
  });

  const [manualContext, setManualContext] = useState({
    election_id: "",
    candidate_id: "",
    candidate_username: "",
  });
  const [usernameValue, setUsernameValue] = useState("");
  const [elections, setElections] = useState([]);
  const [candidateMap, setCandidateMap] = useState({});
  const [selectedElectionId, setSelectedElectionId] = useState("");
  const [selectedCandidateUsername, setSelectedCandidateUsername] = useState("");
  const [loading, setLoading] = useState(false);
  
  const fromState = location.state?.info;
  const fromQuery = useMemo(() => getContextFromQuery(location.search), [location.search]);
  const effectiveContext = useMemo(() => fromState || fromQuery || voteContext, [fromState, fromQuery, voteContext]);
  const selectedElection = elections.find((e) => e._id === selectedElectionId);
  
  const { connectWallet, sendTransaction, getAllTransactions } = useContext(TransactionContext);
  const [election, setElection] = useState({});
  const [faceStatus, setFaceStatus] = useState("idle");
  const [verifiedUser, setVerifiedUser] = useState("");

  useEffect(() => {
    if (fromState) {
      setVoteContext(fromState);
      sessionStorage.setItem("voteContext", JSON.stringify(fromState));
      return;
    }
    if (fromQuery) {
      setVoteContext(fromQuery);
      sessionStorage.setItem("voteContext", JSON.stringify(fromQuery));
    }
  }, [fromQuery, fromState]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [electionsRes, candidatesRes] = await Promise.all([
          axios.get(`${serverLink}voting/elections`),
          axios.get(`${serverLink}candidates`),
        ]);
        const list = Array.isArray(electionsRes.data) ? electionsRes.data : [];
        const candidates = Array.isArray(candidatesRes.data) ? candidatesRes.data : [];
        const map = {};
        candidates.forEach((c) => {
          if (c?.username) {
            map[c.username] = c;
          }
        });
        setElections(list);
        setCandidateMap(map);
      } catch (error) {
        console.error("Error fetching elections/candidates:", error);
      }
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    if (!effectiveContext) return;

    async function getData() {
      let link = `${serverLink}election/${effectiveContext.election_id}`;
      try {
        let res = await axios.get(link);
        let election = res.data;
        setElection(election);
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    }
    getData();
  }, [effectiveContext]);

  const checkDuplicateVote = async (user_id, election_id) => {
    try {
      let transactions = await getAllTransactions();
      if (!transactions || transactions.length === 0) return false;
      var electionGroup = ObjectGroupBy(transactions, "election_id");
      if (!electionGroup[election_id]) return false;
      var candidate = ObjectGroupBy(electionGroup[election_id], "user_id");
      if (candidate[user_id] && candidate[user_id].length > 0) {
        alert("You already voted");
        window.location.href = "/";
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking duplicate vote:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!effectiveContext?.election_id || !effectiveContext?.candidate_id) {
      alert("Missing voting context. Please start from the election page.");
      return;
    }
    
    setLoading(true);
    const password = e.target.password.value;
    const username = e.target.username.value;
    
    if (isFaceRecognitionEnable) {
      const verified = faceStatus === "verified" && verifiedUser && verifiedUser.toLowerCase() === username.toLowerCase();
      if (!verified) {
        const ok = await verifyFace(username);
        if (!ok) {
          setLoading(false);
          return;
        }
      }
    }

    const tmp = { username, password };

    try {
      let check = await axios.post(`${serverLink}login`, tmp);
      if (check.status === 202) {
        alert(check.data);
        setLoading(false);
      } else if (check.status === 201) {
        await connectWallet();
        const isDuplicate = await checkDuplicateVote(check.data._id, effectiveContext.election_id);
        if (isDuplicate) {
          setLoading(false);
          return;
        }
        
        let trans = await sendTransaction(effectiveContext.election_id, effectiveContext.candidate_id, check.data._id);

        if (trans.valid) {
          sessionStorage.removeItem("voteContext");
          sessionStorage.setItem("voteSuccess", JSON.stringify({
            election_id: effectiveContext.election_id,
            candidate_id: effectiveContext.candidate_id,
            candidate_username: effectiveContext.candidate_username,
            txHash: trans.hash,
          }));
          try {
            await axios.post(`${serverLink}votingEmail`, { id: check.data._id });
          } catch (mailErr) {
            console.warn("Voting email failed:", mailErr);
          }
          window.location.href = "/vote-success";
        } else {
          alert(trans.mess);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred during the voting process. Please try again.");
      setLoading(false);
    }
  };

  const handleCameraTest = async () => {
    try {
      const res = await axios.post(`${serverLink}camera/test`);
      alert(res.data);
    } catch (err) {
      alert(err.response?.data || "Camera test failed");
    }
  };

  const verifyFace = async (username) => {
    if (!username) {
      alert("Please enter username first.");
      return false;
    }
    setFaceStatus("verifying");
    try {
      const faceRes = await axios.post(`${serverLink}op`);
      const detectedUser = String(faceRes.data || "").trim();
      if (!detectedUser || detectedUser.toLowerCase() !== username.toLowerCase()) {
        setFaceStatus("failed");
        alert("Face does not match the logged-in user.");
        return false;
      }
      setFaceStatus("verified");
      setVerifiedUser(username);
      return true;
    } catch (err) {
      setFaceStatus("failed");
      alert(err.response?.data || "Face recognition failed");
      return false;
    }
  };

  const handleManualContextSubmit = (e) => {
    e.preventDefault();
    if (!manualContext.election_id || !manualContext.candidate_id) {
      alert("Please enter Election ID and Candidate ID.");
      return;
    }
    setVoteContext(manualContext);
    sessionStorage.setItem("voteContext", JSON.stringify(manualContext));
  };

  const handleSelectContext = (e) => {
    e.preventDefault();
    if (!selectedElectionId || !selectedCandidateUsername) {
      alert("Please select Election and Candidate.");
      return;
    }
    const candidate = candidateMap[selectedCandidateUsername];
    if (!candidate?._id) {
      alert("Candidate not found. Please try again.");
      return;
    }
    const ctx = {
      election_id: selectedElectionId,
      candidate_id: candidate._id,
      candidate_username: selectedCandidateUsername,
    };
    setVoteContext(ctx);
    sessionStorage.setItem("voteContext", JSON.stringify(ctx));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030014",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
      }}
    >
      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 0, 20, 0.95)",
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
              width: "70px",
              height: "70px",
              border: "3px solid rgba(255, 255, 255, 0.1)",
              borderTopColor: "#00d4ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
              Processing Vote
            </div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" }}>
              Recording on blockchain...
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255, 0, 110, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(0, 255, 136, 0.06), transparent)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Grid Pattern */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {/* No Context State */}
        {!effectiveContext && (
          <div
            style={{
              padding: "48px 40px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "32px",
              animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Warning Icon */}
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "rgba(255, 193, 7, 0.1)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", textAlign: "center", marginBottom: "12px" }}>
              Missing Voting Context
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.5)", textAlign: "center", marginBottom: "32px" }}>
              Please start from the election page to select a candidate.
            </p>

            <Link
              to="/election"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "16px 24px",
                background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
                border: "none",
                borderRadius: "14px",
                color: "#030014",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                marginBottom: "32px",
                transition: "all 0.3s ease",
              }}
            >
              Go to Elections
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
              <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Or select here</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
            </div>

            {/* Quick Select Form */}
            <form onSubmit={handleSelectContext}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Election
                </label>
                <select
                  value={selectedElectionId}
                  onChange={(e) => {
                    setSelectedElectionId(e.target.value);
                    setSelectedCandidateUsername("");
                  }}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" style={{ background: "#0a0a1a" }}>Select election...</option>
                  {elections.map((item) => (
                    <option key={item._id} value={item._id} style={{ background: "#0a0a1a" }}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Candidate
                </label>
                <select
                  value={selectedCandidateUsername}
                  onChange={(e) => setSelectedCandidateUsername(e.target.value)}
                  disabled={!selectedElectionId}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    cursor: selectedElectionId ? "pointer" : "not-allowed",
                    opacity: selectedElectionId ? 1 : 0.5,
                  }}
                >
                  <option value="" style={{ background: "#0a0a1a" }}>
                    {selectedElectionId ? "Select candidate..." : "Select election first"}
                  </option>
                  {selectedElection?.candidates?.map((name) => (
                    <option key={name} value={name} style={{ background: "#0a0a1a" }}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "transparent",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Continue to Login
              </button>
            </form>
          </div>
        )}

        {/* Login Form */}
        {effectiveContext && (
          <div
            style={{
              padding: "48px 40px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "32px",
              animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  background: "linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 255, 136, 0.1) 100%)",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
                Authenticate to Vote
              </h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" }}>
                Enter your credentials to cast your vote
              </p>
            </div>

            {/* Vote Summary Card */}
            <div
              style={{
                padding: "20px",
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                borderRadius: "16px",
                marginBottom: "32px",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                Voting For
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#00d4ff", marginBottom: "4px" }}>
                {effectiveContext.candidate_username || "Selected Candidate"}
              </div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)" }}>
                in {election.name || "Election"}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={usernameValue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00d4ff";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00d4ff";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Action Buttons */}
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "16px 24px",
                  background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#030014",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0, 212, 255, 0.4)",
                  marginBottom: "16px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M12 3L4 7V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V7L12 3Z" stroke="#030014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cast Vote
              </button>

              {/* Face Recognition Buttons */}
              {isFaceRecognitionEnable && (
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={handleCameraTest}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Test Camera
                  </button>
                  <button
                    type="button"
                    onClick={() => verifyFace(usernameValue)}
                    disabled={faceStatus === "verifying"}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: faceStatus === "verified" ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${faceStatus === "verified" ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                      borderRadius: "10px",
                      color: faceStatus === "verified" ? "#00ff88" : "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.85rem",
                      cursor: faceStatus === "verifying" ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {faceStatus === "verifying" ? "Verifying..." : faceStatus === "verified" ? "Face Verified" : "Verify Face"}
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
