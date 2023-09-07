const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  numofrooms: {
    type: Number,
    required: true,
  },
  rooms: {
    type: [
      {
        date: Date,
        available: {
          type: Number,
          default: 10,
        },
      },
    ],
  },
});

// [object] => [{01-01-2023->20},02-01-2023->18]

module.exports = mongoose.model("Hotel", HotelSchema);
