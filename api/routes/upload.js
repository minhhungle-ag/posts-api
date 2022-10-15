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

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
    return;
  }

  cb(null, false);
}

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 607 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("imageUrl"), (req, res, next) => {
  console.log("filename", req.file);
  res.status(200).json({
    message: "upload success",
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

module.exports = router;
