export const serverLink =
  process.env.REACT_APP_SERVER_URL || "http://localhost:5000/api/auth/";
export const clientLink = "http://localhost:3000/";
export const phases = ["init", "voting", "result"];
export const isFaceRecognitionEnable =
  (process.env.REACT_APP_FACE_RECOGNITION || "").toLowerCase() === "true";
//false: No camera access
//true: Camera access
