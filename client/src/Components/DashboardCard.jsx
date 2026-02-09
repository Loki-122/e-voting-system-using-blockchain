import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  return (
    <div>
      <div className="content" style={{ paddingBottom: "20px" }}>
        <Card sx={{ display: "flex", padding: "15px" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h4">
                <div style={{ justifyContent: "center" }}>{props.title}</div>
              </Typography>
            </CardContent>
            <CardContent>
              <Typography component="div" variant="h6">
                <div style={{ justifyContent: "center" }}>{props.data}</div>
              </Typography>
            </CardContent>
            {props.link && (
              <CardContent>
                <Button
                  component={Link}
                  to={props.link}
                  variant="outlined"
                  size="small"
                >
                  Open
                </Button>
              </CardContent>
            )}
          </Box>
          <Box>
            <GroupIcon sx={{ display: "flex", pt: "20px", fontSize: "35px" }} />
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCard;
