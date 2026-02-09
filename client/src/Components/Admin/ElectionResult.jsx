import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../../Data/Variables";

export default function CardLayout(props) {
  const image = "https://picsum.photos/200/300?random=" + props.index;
  const link = "" + props.link;
  const [publishing, setPublishing] = React.useState(false);
  const isPublished = String(props.currentPhase || "").toLowerCase() === "result";

  const handlePublish = async () => {
    if (!props.electionId) {
      alert("Election ID not found.");
      return;
    }
    setPublishing(true);
    try {
      const payload = { name: props.title, currentPhase: "result" };
      const res = await axios.post(
        `${serverLink}phase/edit/${props.electionId}`,
        payload
      );
      if (res.status === 201) {
        alert("Result published for users.");
      } else {
        alert("Failed to publish result.");
      }
    } catch (err) {
      alert(err.response?.data || "Failed to publish result.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          <strong>Candidates :</strong>
          {props.candidates.slice(0, 2).map((item, index) => {
            return (
              <Typography key={index}>
                {index + 1}. {item}
                {index === 1 && props.candidates.length > 2 && " ..."}
              </Typography>
            );
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={link} state={{ info: props.info }}>
          <Button size="small">View Details</Button>
        </Link>
        <Button
          size="small"
          onClick={handlePublish}
          disabled={publishing || isPublished}
        >
          {isPublished ? "Published" : publishing ? "Publishing..." : "Publish Result"}
        </Button>
      </CardActions>
    </Card>
  );
}
