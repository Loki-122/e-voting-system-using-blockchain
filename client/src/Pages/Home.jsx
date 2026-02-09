import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 128px)",
            gap: 16,
          }}
        >
          <img
            style={{ width: "50vw" }}
            src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/10/16044143/M187_Digital-voting-header.png"
            alt="random"
          />
          <Button
            component={Link}
            to="/admin"
            variant="contained"
            color="primary"
          >
            Admin Login
          </Button>
        </Box>
      </main>
    </ThemeProvider>
  );
}
