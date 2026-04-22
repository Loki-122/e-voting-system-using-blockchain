import {
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../Components/Form/InputField";
import { ErrorMessage } from "../Components/Form/ErrorMessage";
import { TransactionContext } from "../context/TransactionContext";
import { serverLink, isFaceRecognitionEnable } from "../Data/Variables";
import { ObjectGroupBy } from "../Data/Methods";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
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
  const [selectedCandidateUsername, setSelectedCandidateUsername] =
    useState("");
  const fromState = location.state?.info;
  const fromQuery = useMemo(
    () => getContextFromQuery(location.search),
    [location.search]
  );
  const effectiveContext = useMemo(
    () => fromState || fromQuery || voteContext,
    [fromState, fromQuery, voteContext]
  );
  const selectedElection = elections.find((e) => e._id === selectedElectionId);
  const { connectWallet, sendTransaction, getAllTransactions } =
    useContext(TransactionContext);
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
        const candidates = Array.isArray(candidatesRes.data)
          ? candidatesRes.data
          : [];
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
    if (!effectiveContext) {
      return;
    }

    async function getData() {
      console.log(effectiveContext);
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

      if (!transactions || transactions.length === 0) {
        return false;
      }

      var electionGroup = ObjectGroupBy(transactions, "election_id");

      if (!electionGroup[election_id]) {
        return false;
      }

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
    const password = e.target.password.value;
    const username = e.target.username.value;
    if (isFaceRecognitionEnable) {
      const verified =
        faceStatus === "verified" &&
        verifiedUser &&
        verifiedUser.toLowerCase() === username.toLowerCase();
      if (!verified) {
        const ok = await verifyFace(username);
        if (!ok) {
          return;
        }
      }
    }
    const tmp = {
      username,
      password,
    };

    try {
      let check = await axios.post(`${serverLink}login`, tmp);
      if (check.status === 202) {
        alert(check.data);
      } else if (check.status === 201) {
        await connectWallet();

        let trans = false;
        const isDuplicate = await checkDuplicateVote(
          check.data._id,
          effectiveContext.election_id
        );
        if (isDuplicate) {
          return;
        }
        trans = await sendTransaction(
          effectiveContext.election_id,
          effectiveContext.candidate_id,
          check.data._id
        );

        if (trans.valid) {
          sessionStorage.removeItem("voteContext");
          sessionStorage.setItem(
            "voteSuccess",
            JSON.stringify({
              election_id: effectiveContext.election_id,
              candidate_id: effectiveContext.candidate_id,
              candidate_username: effectiveContext.candidate_username,
              txHash: trans.hash,
            })
          );
          try {
            await axios.post(`${serverLink}votingEmail`, { id: check.data._id });
          } catch (mailErr) {
            console.warn("Voting email failed:", mailErr);
          }
          window.location.href = "/vote-success";
        } else {
          alert(trans.mess);
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred during the voting process. Please try again.");
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
      if (
        !detectedUser ||
        detectedUser.toLowerCase() !== username.toLowerCase()
      ) {
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
    <>
      <div className="content">
        {!effectiveContext && (
          <Paper elevation={3}>
            <Box px={3} py={2}>
              <Typography variant="h6" align="center" margin="dense">
                Missing voting context. Please start from the election page.
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  component={Link}
                  to="/election"
                  variant="contained"
                  color="primary"
                >
                  Go to Elections
                </Button>
              </Box>
              <Box mt={3}>
                <Typography variant="body2" align="center">
                  Or select the election and candidate here:
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSelectContext}
                  mt={2}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Election"
                        fullWidth
                        select
                        value={selectedElectionId}
                        onChange={(e) => {
                          setSelectedElectionId(e.target.value);
                          setSelectedCandidateUsername("");
                        }}
                      >
                        {elections.length === 0 && (
                          <MenuItem value="" disabled>
                            No elections in voting phase
                          </MenuItem>
                        )}
                        {elections.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Candidate"
                        fullWidth
                        select
                        disabled={!selectedElectionId}
                        value={selectedCandidateUsername}
                        onChange={(e) =>
                          setSelectedCandidateUsername(e.target.value)
                        }
                      >
                        {!selectedElectionId && (
                          <MenuItem value="" disabled>
                            Select an election first
                          </MenuItem>
                        )}
                        {selectedElection?.candidates?.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button type="submit" variant="outlined">
                      Continue to Login
                    </Button>
                  </Box>
                </Box>
                <Box mt={3}>
                  <Typography variant="body2" align="center">
                    Or paste the IDs manually to continue:
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleManualContextSubmit}
                    mt={2}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Election ID"
                          fullWidth
                          value={manualContext.election_id}
                          onChange={(e) =>
                            setManualContext((prev) => ({
                              ...prev,
                              election_id: e.target.value.trim(),
                            }))
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Candidate ID"
                          fullWidth
                          value={manualContext.candidate_id}
                          onChange={(e) =>
                            setManualContext((prev) => ({
                              ...prev,
                              candidate_id: e.target.value.trim(),
                            }))
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Candidate Username (optional)"
                          fullWidth
                          value={manualContext.candidate_username}
                          onChange={(e) =>
                            setManualContext((prev) => ({
                              ...prev,
                              candidate_username: e.target.value,
                            }))
                          }
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2} display="flex" justifyContent="center">
                      <Button type="submit" variant="outlined">
                        Continue to Login
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        )}
        {effectiveContext && (
          <form onSubmit={handleSubmit} method="POST">
            <Paper elevation={3}>
              <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                  Enter Credentials
                </Typography>
                <Grid container pt={3} spacing={3}>
                  <Grid item xs={12} sm={12}>
                  <InputField
                    label="username"
                    name="username"
                    fullWidth={true}
                    id="username"
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                  />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="Election Id"
                      name="election_id"
                      fullWidth={true}
                      type="password"
                      value={effectiveContext.election_id}
                      id="outlined-disabled"
                      disabled
                    />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="Candidate Name"
                      name="candidate_name"
                      fullWidth={true}
                      value={effectiveContext.candidate_username}
                      id="outlined-disabled"
                      disabled
                    />
                    <ErrorMessage />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      label="Password"
                      name="password"
                      fullWidth={true}
                      type="password"
                      id="password"
                    />
                    <ErrorMessage />
                  </Grid>
                </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Vote
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{ ml: 2 }}
                  onClick={handleCameraTest}
                  disabled={!isFaceRecognitionEnable}
                >
                  Test Camera
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{ ml: 2 }}
                  onClick={() => verifyFace(usernameValue)}
                  disabled={!isFaceRecognitionEnable || faceStatus === "verifying"}
                >
                  {faceStatus === "verifying"
                    ? "Verifying..."
                    : faceStatus === "verified"
                    ? "Face Verified"
                    : "Verify Face"}
                </Button>
              </Box>
              </Box>
            </Paper>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
