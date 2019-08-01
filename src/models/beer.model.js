const mongoose = require("mongoose");

const BeerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true
    },
    rating: Number,
    avatar: String
  },
  { timestamps: true }
);

const Beer = mongoose.model("beer", BeerSchema);

module.exports = Beer;
