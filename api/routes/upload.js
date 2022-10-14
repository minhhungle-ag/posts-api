const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("imageUrl"), (req, res, next) => {
  console.log("filename", req.file);
  res.status(200).json({
    message: "upload success",
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

module.exports = router;
