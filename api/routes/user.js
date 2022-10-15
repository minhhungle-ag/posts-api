const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const appConstants = require("../../constants/appConstants");

const router = express.Router();

const currentLimit = 5;
const currentPage = 1;

router.get("/", (req, res) => {
  if (req.query.page <= 0) {
    res.status(500).json({
      message: "page must be more than 0",
    });
  }

  User.find()
    .exec()
    .then((data) => {
      if (Array.isArray(data)) {
        const page = req.query.page || currentPage;
        const limit = req.query.limit || currentLimit;
        const startIdx = ((req.query.page || page) - 1) * limit;

        const userList = [...data];
        const totalPage = Math.ceil(userList.length / limit);
        const total = userList.length;

        userList.slice(startIdx, limit);

        res.status(200).json({
          message: "get all success",
          data: userList,
          pagination: {
            page: page,
            limit: limit,
            total: total,
            total_page: totalPage,
          },
        });
      }
    });
});

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        res.status(409).json({
          message: "Mail exits",
        });

        return;
      }

      bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
          res.status(400).json({
            error: {
              message: error.message,
            },
          });

          return;
        }

        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((response) => {
            res.status(200).json({
              message: "Create user success",
              data: response,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              error: {
                message: error.message,
              },
            });
          });
      });
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user || user.length < 1) {
        res.status(404).json({
          message: "Mail not found, user does't exits",
        });

        return;
      }

      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          res.status(401).json({
            message: error.message,
          });

          return;
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            appConstants.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          res.status(200).json({
            message: "Auth successful",
            data: token,
          });
          return;
        }

        res.status(401).json({
          message: "Auth failed, password is not correct ",
        });
      });
    });
});

router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;

  User.remove({ _id: userId })
    .exec()
    .then((response) => {
      res.status(200).json({
        message: `Deleted user id: ${userId}`,
        data: response,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: {
          message: error.message,
        },
      });
    });
});

module.exports = router;
