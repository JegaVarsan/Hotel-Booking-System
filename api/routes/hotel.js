const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Hotel = require("../models/hotel");
const { checkadmin } = require("./authentication.js");

const router = express.Router();

router.get("/viewallhotels", async (req, res, next) => {
  try {
    const datas = await Hotel.find({});
    res.status(201).json(datas);
  } catch (err) {
    res.status(200).json({
      error: err,
      message: "Error in handling get req localhost:4000/hotel/viewallhotels",
    });
  }
});

router.post("/addhotel", checkadmin, async (req, res, next) => {
  //   console.log(req.body);

  var newhotel = {
    name: req.body.name,
    location: req.body.location,
    price: req.body.price,
    image: req.body.image,
    distance: req.body.distance,
    description: req.body.description,
    rating: req.body.rating,
    numofrooms: req.body.numofrooms,
    rooms: [
      {
        date: new Date(),
        available: req.body.numofrooms,
      },
    ],
  };

  const datas = new Hotel(newhotel);
  datas
    .save()
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((err) => {
      res.status(200).json({
        error: err,
        message: "Error in handling post req localhost:4000/hotel/addhotel",
      });
    });
});

router.get("/gethotel/:getname", checkadmin, async (req, res, next) => {
  try {
    var { getname } = req.params;
    const datas = await Hotel.findOne({ name: getname });
    res.status(200).json(datas);
  } catch (err) {
    res.status(404).json({
      error: err,
      message:
        "Error in handling get req localhost:4000/hotel/gethotel/getname",
    });
  }
});

router.put("/update/:id", checkadmin, async (req, res, next) => {
  try {
    var { id } = req.params;
    // console.log(id);
    const updatedvalue = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedvalue);
  } catch (err) {
    res.status(404).json({
      error: err,
      message: "Error in handling put req localhost:4000/hotel/update/:id",
    });
  }
});

router.delete("/delete/:id", checkadmin, async (req, res, next) => {
  try {
    var { id } = req.params;
    const datas = await Hotel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Hotel deleted successfully!!",
    });
  } catch (err) {
    res.status(404).json({
      error: err,
      message: "Error in handling delete req localhost:4000/hotel/delete/:id",
    });
  }
});

module.exports = router;
