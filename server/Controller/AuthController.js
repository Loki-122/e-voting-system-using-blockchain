import { PythonShell } from "python-shell";
import multer from "multer";
import fs from "fs";
import path from "path";
import User from "../Models/User.js";
import Election from "../Models/Election.js";
import Candidate from "../Models/Candidate.js";
import nodemailer from "nodemailer";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Faces");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.username + "." + file.originalname.split(".").pop());
  },
});
var upload = multer({ storage: storage }).single("profile");
export const register = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      try {
        const avatar = req.file?.filename;
        const newUser = await User.create({
          ...req.body,
          ...(avatar ? { avatar } : {}),
        });

        const mailContent = "Thank You For Joining the Voting System";

        const mailSubject = "Welcome Mail";

        const findUser = newUser || (await User.findOne({ email: req.body.email }));
        //Try to use newUser

        if (await sendMail(mailContent, mailSubject, findUser)) {
          return res.status(201).send("Email Sent");
        } else {
          return res.status(301).send("Email Sending Failed");
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send("Registeration Failed");
      }
    });
  },
};

export const login = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    try {
      const findUser = await User.findOne({
        username: req.body.username,
      });

      if (!findUser) {
        return res.status(202).send("Invalid Username");
      }

      if (findUser.password !== req.body.password) {
        return res.status(202).send("Invalid Password");
      }

      return res.status(201).send(findUser);
    } catch (e) {
      return res.status(500).send("Server Error");
    }
  },
};

export const users = {
  deleteUserProfile: async (user) => {
    if (!user || !user.avatar) {
      return true;
    }
    if (user.avatar.startsWith("http")) {
      return true;
    }
    const filePath = path.join("Faces", user.avatar);
    try {
      await fs.promises.unlink(filePath);
      return true;
    } catch (err) {
      if (err.code === "ENOENT") {
        return true;
      }
      console.log(err);
      return false;
    }
  },
  getUsers: async (req, res) => {
    try {
      const tmp = await User.find();
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  getUser: async (req, res) => {
    try {
      const tmp = await User.findById(req.params.id);
      return res.status(201).send(tmp);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },
  getUserByName: async (req, res) => {
    try {
      const tmp = await User.find({ username: req.params.id });
      return res.status(201).send(tmp);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },
  delete: async (req, res) => {
    try {
      const tmp = await User.findByIdAndDelete(req.params.id);
      const isPhotoDeleted = await users.deleteUserProfile(tmp);
      if (isPhotoDeleted) {
        return res
          .status(201)
          .send("Election and photo file deleted successfully");
      } else {
        return res.status(500).send("Error deleting photo file");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error!");
    }
  },

  edit: async (req, res) => {
    const tmp = await User.findById(req.params.id);
    const isPhotoDeleted = await users.deleteUserProfile(tmp);
    if (!isPhotoDeleted) {
      return res.status(500).send("Error updating User");
    }
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      try {
        const user = {
          username: req.body.username,
          email: req.body.email,
          mobile: req.body.mobile,
          fname: req.body.fname,
          lname: req.body.lname,
          ...(req.file?.filename ? { avatar: req.file.filename } : {}),
        };
        const tmp = await User.findByIdAndUpdate(req.params.id, user);
        return res.status(201).send("User Updated Successfully");
      } catch (e) {
        console.log(e);
        return res.status(500).send("error");
      }
    });
  },
};

//Candidate
export const candidateRegister = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    const candidate = await Candidate.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      qualification: req.body.qualification,
      join: req.body.join,
      location: req.body.location,
      description: req.body.description,
    });
    return res.status(201).send("Candidate Added");
  },
};

export const candidates = {
  getCandidates: async (req, res) => {
    const data = await Candidate.find();
    return res.status(201).send(data);
  },
  register: async (req, res) => {
    const candidate = await Candidate.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      qualification: req.body.qualification,
      join: req.body.join,
      location: req.body.location,
      description: req.body.description,
    });
    return res.status(201).send("Candidate Added");
  },
  getCandidate: async (req, res) => {
    const data = await Candidate.findOne({ username: req.params.username });
    if (data == null) {
      return res.status(500).send("Candidate Not Found");
    }
    return res.status(201).send(data);
  },
  delete: async (req, res) => {
    try {
      const data = await Candidate.findByIdAndDelete(req.params.id);
      return res.status(201).send("Candidate Deleted Successfully");
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
};

export const phase = {
  controller: async (req, res) => {
    const data = await Election.findByIdAndUpdate(req.params.id, {
      currentPhase: req.body.currentPhase,
    });
    // console.log(data);
    return res.status(201).send(data);
  },
};

//Election

export const elections = {
  controller: async (req, res) => {
    try {
      const tmp = await Election.find();
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  register: async (req, res) => {
    try {
      const newElection = await Election.create({
        name: req.body.name,
        candidates: req.body.candidates,
      });
      return res.status(201).send("Election Successfully Added");
    } catch (e) {
      return res.status(500).send("Internal Error" + e);
    }
  },
  getElection: async (req, res) => {
    try {
      const data = await Election.findById(req.params.id);
      return res.status(201).send(data);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  voting: async (req, res) => {
    try {
      const tmp = await Election.find({ currentPhase: "voting" });
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  result: async (req, res) => {
    try {
      const tmp = await Election.find({ currentPhase: "result" });
      return res.status(201).send(tmp);
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
  delete: async (req, res) => {
    try {
      const tmp = await Election.findByIdAndDelete(req.params.id);
      return res.status(201).send("Election Deleted Successfully");
    } catch (e) {
      return res.status(500).send("Error");
    }
  },
};

const sendMail = async (mailContent, mailSubject, user) => {
  if (!user || !user.email) {
    return false;
  }
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: mailSubject,
    text: mailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

const parseFaceResult = (result) => {
  const lines = Array.isArray(result) ? result : [String(result)];
  for (const line of lines) {
    if (/camera not accessible|failed to capture image/i.test(line)) {
      return { error: line.trim() };
    }
  }

  let detected = null;
  for (const line of lines) {
    const match = line.match(/Most common detected face:\s*(.+)$/i);
    if (match) {
      detected = match[1].trim();
    }
  }
  if (detected) {
    if (detected.toLowerCase() === "no face detected") {
      return { error: "No face detected from camera" };
    }
    return { user: detected };
  }

  for (const line of lines) {
    const match = line.match(/Detected:\s*(.+)$/i);
    if (match) {
      detected = match[1].trim();
    }
  }
  if (detected) {
    return { user: detected };
  }

  return { error: "No face detected from camera" };
};

export const a = {
  sc: async (req, res) => {
    const filePath = path.resolve(process.cwd(), "Controller", "fr.py");
    const pythonPath = path.resolve(
      process.cwd(),
      "..",
      "venv",
      "Scripts",
      "python.exe"
    );
    PythonShell.run(filePath, { pythonPath }, function (err, result) {
      // console.log(result);
      // console.log("Error : ");
      // console.log(err);
      // console.log("Python script finished");
      if (err) {
        console.error("Python error:", err);
        return res
          .status(500)
          .send(err?.message || err?.toString() || "Error While Running Python");
      }

      if (result) {
        const parsed = parseFaceResult(result);
        if (parsed.error) {
          return res.status(400).send(parsed.error);
        }
        if (
          !parsed.user ||
          parsed.user.toLowerCase() === "no face detected"
        ) {
          return res.status(404).send("No face Match Found");
        }
        return res.status(201).send(parsed.user);
      } else {
        return res.status(500).send("No face Match Found");
      }
    });
  },
};

export const camera = {
  test: async (req, res) => {
    const filePath = path.resolve(
      process.cwd(),
      "Controller",
      "camera_test.py"
    );
    const pythonPath = path.resolve(
      process.cwd(),
      "..",
      "venv",
      "Scripts",
      "python.exe"
    );
    PythonShell.run(filePath, { pythonPath }, function (err, result) {
      if (err) {
        console.error("Camera test error:", err);
        return res
          .status(500)
          .send(err?.message || err?.toString() || "Camera test failed");
      }
      const output = Array.isArray(result) ? result.join("\n") : String(result);
      if (/camera not accessible/i.test(output)) {
        return res.status(400).send("Camera not accessible");
      }
      if (/camera ok/i.test(output)) {
        return res.status(200).send("Camera OK");
      }
      return res.status(200).send(output || "Camera test finished");
    });
  },
};

//Voting Mail

export const votingMail = {
  send: async (req, res) => {
    const mailContent =
      "Thank You For The Voting but if it's not you contact admin@votingsystem.com";

    const mailSubject = "Voting Success";

    const findUser = await User.findOne({ _id: req.body.id });

    if (await sendMail(mailContent, mailSubject, findUser)) {
      return res.status(201).send("Email Sent");
    } else {
      return res.status(301).send("Email Sending Failed");
    }
  },
};
