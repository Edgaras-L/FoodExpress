const mongoose = require("mongoose");

// DB schema
const Date = {
  timestamps: { currentTime: () => new Date() },
};
const DishesSchema = mongoose.Schema(
    {
      value: { type: String },
      amount: { type: Number },
    },
    { timestamps: true }
  );
  const MeniuSchema = mongoose.Schema(
    {
      value: { type: String },
      dishes: [DishesSchema]
    },
    { timestamps: true }
  );
const restaurantSchema = mongoose.Schema(
  {
    value: { type: String, },
    date: { type: Date },
    meniu:[MeniuSchema]
  },
  { timestamps: true }
);


// Modelis DB lentelės pavadinimas
const RestaurantModel = new mongoose.model("Restaurant", restaurantSchema);



module.exports = RestaurantModel;