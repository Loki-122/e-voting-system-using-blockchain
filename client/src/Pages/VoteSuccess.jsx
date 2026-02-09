import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const VoteSuccess = () => {
  const [info] = useState(() => {
    const raw = sessionStorage.getItem("voteSuccess");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 128px)",
        px: 2,
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 720, width: "100%", p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Vote Casted Successfully
        </Typography>
        {info ? (
          <>
            <Typography variant="body1" align="center">
              Your vote has been recorded on the blockchain.
            </Typography>
            <Box mt={2}>
              {info.candidate_username && (
                <Typography variant="body2">
                  Candidate: {info.candidate_username}
                </Typography>
              )}
              {info.election_id && (
                <Typography variant="body2">
                  Election ID: {info.election_id}
                </Typography>
              )}
              {info.txHash && (
                <Typography variant="body2">
                  Transaction Hash: {info.txHash}
                </Typography>
              )}
            </Box>
          </>
        ) : (
          <Typography variant="body1" align="center">
            Your vote has been recorded.
          </Typography>
        )}
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button component={Link} to="/" variant="contained">
            Go Home
          </Button>
          <Button component={Link} to="/result" variant="outlined">
            View Results
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default VoteSuccess;
