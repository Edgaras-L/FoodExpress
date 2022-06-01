const Restaurant = require("./../models/restaurantModel");

// /
exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      status: "success",
      results: restaurants.length,
      data: {
        restaurants: restaurants,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// /:id
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        restaurants: restaurant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// /
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: newRestaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const upatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: upatedRestaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// /:id
exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.addToRestaurantPlace = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Restaurant.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { placesToVisit: req.body } },
      {
        new: true,
      }
    );
    console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        Restaurant: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.deleteFromRestaurantPlace = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);

  try {
    await Restaurant.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { placesToVisit: { _id: req.params.subID } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.findPlacesAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);
  console.log(req.body);

  try {
    await Restaurant.findOneAndUpdate(
      { _id: req.params.id, "placesToVisit._id": req.params.subID },
      {
        $set: {
          "placesToVisit.$.places": req.body.places,
          "placesToVisit.$.duration": req.body.duration,
        },
      },
      (err, doc) => {
        if (err) console.log(err);
        console.log(doc);
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        message: "Places is updated.",
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
