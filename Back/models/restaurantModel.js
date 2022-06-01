const mongoose = require("mongoose");

const placesToVisitSchema = new mongoose.Schema(
  {
    places: {
      type: String,
      trim: true,
      maxlength: [
        40,
        "A place name must have less or equal then 40 characters",
      ],
      minlength: [2, "A place name must have more or equal then 2 characters"],
    },
    duration: Number,
  },
  {
    timestamps: true,
  }
);

// DB schema
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requared: [true, "A Restaurant name must have a name."],
      trim: true,
      maxlength: [
        40,
        "A Restaurant name must have less or equal then 40 characters.",
      ],
      minlength: [2, "A Restaurant name must have more or equal then 2 characters."],
    },
    price: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "({VALUE}) - price must be greater than 0",
      },
    },
    difficulty: {
      type: String,
      required: [true, "A Restaurant must have a difficulty."],
      enum: {
        values: ["easy", "medium", "difficult"],
        message:
          "({VALUE}) is not supported. Difficulty is either: easy, medium, difficult.",
      },
    },
    placesToVisit: [placesToVisitSchema],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

// Modelis
const Restaurant = new mongoose.model("Restaurant", restaurantSchema);


module.exports = Restaurant;