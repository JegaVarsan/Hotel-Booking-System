const express = require("express");
const morgan = require("morgan");
var bodyparser = require("body-parser");
const user = require("./routes/user");
const hotel = require("./routes/hotel");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// bodyparser used to convert incoming req.body() to convenient formal which will be ec to access

const app = express();

app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://jegavarsan:jegavarsan@cluster0.mhjt0io.mongodb.net/Hotel?retryWrites=true&w=majority"
  )
  .then((val) => {
    console.log("Hotel Database connected!!");
    console.log("User Database connected!!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database Not Connected");
  });

const userdatabase = mongoose.createConnection(
  "mongodb+srv://jegavarsan:jegavarsan@cluster0.mhjt0io.mongodb.net/User?retryWrites=true&w=majority"
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-COntrol-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.get("/setcookie", (req, res) => {
//   res.cookie("tok", "23y92849").json("cookie set successfully");
// });

app.use("/hotel", hotel);
app.use("/user", user);
// app.use() is a middleware

app.use((req, res, next) => {
  const error = new Error("Page Not Found!!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
