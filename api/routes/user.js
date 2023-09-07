const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//jwt is used to encrypt the important details of the user and it can be stored in the cookie

const router = express.Router();

router.post("/signup", (req, res, next) => {
  User.find({ gmail: req.body.gmail }).then((val) => {
    if (val.length >= 1) {
      res.status(200).json({
        message: "Email Address Already Exits.Please use Other Email",
      });
    } else {
      var myPlaintextPassword = req.body.password;
      var saltRounds = 10;
      bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        const data = new User({
          name: req.body.name,
          gmail: req.body.gmail,
          password: hash,
          isadmin: req.body.isadmin,
        });

        data
          .save()
          .then((val) => {
            res.status(200).json({
              message: "Siginup success",
            });
          })
          .catch((err) => {
            res.status(404).json({
              error: err,
              message:
                "Error in handling post req in localhost:4000/user/signup",
            });
          });
      });
    }
  });
});

router.post("/login", async (req, res, next) => {
  try {
    const plainPassword = req.body.password;
    var hashpassword = "";

    const data = await User.find({ gmail: req.body.gmail });
    if (data.length < 1) {
      res.status(200).json({
        message: "No Gmail Found!!",
      });
    } else {
      hashpassword = data[0].password;

      bcrypt.compare(plainPassword, hashpassword, (err, result) => {
        if (err) {
          res.status(200).json({
            error: err,
            message: "Error in decrypting!!",
          });
        } else if (result) {
          const token = jwt.sign(
            {
              name: data[0].name,
              id: data[0]._id,
              gmail: data[0].gmail,
              password: data[0].password,
              isadmin: data[0].isadmin,
            },
            process.env.JWT_SECRET
          );
          console.log("token:");
          console.log(token);

          res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            sameSite: "None",
          });

          res.status(200).json({
            message: "Authentication success",
          });
        } else {
          res.status(200).json({
            message: "Authentication failed",
          });
        }
      });
    }
  } catch (err) {
    res.status(200).json({
      error: err,
      message: "Error in handling post req in localhost:4000/user/login",
    });
  }
});

router.get("/hello", (req, res, next) => {
  res.status(200).json("hello everyone");
});

module.exports = router;
