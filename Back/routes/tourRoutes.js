const express = require("express");

const {
  updateTour,
  getAllTours,
  deleteTour,
  addNewTour,
  getTourById,
} = require("./../controllers/tourController");

const router = express.Router();
router.route("/").get(getAllTours);

router.route("/:id").get(getTourById).patch(updateTour);

router.route("/tour/:subId/update").patch(updateTour);
router.route("/tour/:subId/delete").patch(deleteTour);

router.route("/:id/addNewTour").patch(addNewTour);

module.exports = router;