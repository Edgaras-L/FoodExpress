const express = require("express");
const { protect } = require("../controllers/RestaurantController");

const {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  findPlaces,
  findPlacesAndUpdate,
  addToRestaurantPlace,
  deleteFromRestaurantPlace,
} = require("../controllers/restaurantController");

const router = express.Router();

// apsaugotas routas
// router.route("/").get(protect, getAllRestaurants).post(createRestaurant);

router.route("/:id/restaurant/delete/:subID").patch(deleteFromRestaurantPlace);

router.route("/:id/restaurant/update/:subID").patch(findPlacesAndUpdate);

router.route("/:id/restaurant").patch(addToRestaurantPlace);

router.route("/:id").get(getRestaurantById).patch(updateRestaurant).delete(deleteRestaurant);

router.route("/:id/:subId").patch(findPlacesAndUpdate);

module.exports = router;