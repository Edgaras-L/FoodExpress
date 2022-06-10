const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};

const tourSchema = mongoose.Schema(
  {
    value: { type: String, },
    date: { type: Date },
  },
  { timestamps: true }
);

const ToursSchema = new mongoose.Schema(
{
    tour: [tourSchema]
}
);

// Modelis DB lentelės pavadinimas
const TourModel = new mongoose.model("Tours", ToursSchema);



module.exports = TourModel;