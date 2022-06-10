const express = require("express");

const {
  deleteRestaurant,
  updateRestaurant,
  getAllRestaurants,
  addNewRestaurant,
  getRestaurantById,

  // updateDishes,
  // getAllDishess,
  // deleteDishes,
  // addNewDishes,
  // getDishesById,

  // updateMeniu,
  // getAllMenius,
  // deleteMeniu,
  // addNewMeniu,
  // getMeniuById,
} = require("./../controllers/restaurantController");

const router = express.Router();
router.route("/").get(getAllRestaurants);

router.route("/:id").get(getRestaurantById).post(updateRestaurant);

router.route("/:subId").post(updateRestaurant);
router.route("/:subId/delete").patch(deleteRestaurant);

router.route("/addNewRestaurant").post(addNewRestaurant);



// router.route("/").get(getAllDishess);

// router.route("/:id").get(getDishesById).post(updateDishes);

// router.route("/dishes/:subId/update").post(updateDishes);
// router.route("/dishes/:subId/delete").post(deleteDishes);

// router.route("/:id/addNewDishes").post(addNewDishes);


// router.route("/").get(getAllMenius);

// router.route("/:id").get(getMeniuById).post(updateMeniu);

// router.route("/meniu/:subId/update").post(updateMeniu);
// router.route("/meniu/:subId/delete").post(deleteMeniu);

// router.route("/:id/addNewMeniu").post(addNewMeniu);


module.exports = router;