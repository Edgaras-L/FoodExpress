const Restaurants = require("./../models/RestaurantModel");



exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurants.find();
    res.status(200).json({
      status: "success",
      results: restaurant.length,
      data: {
        restaurant: restaurant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getAllDishess = async (req, res) => {
    try {
      const dishes = await Restaurants.find();
      res.status(200).json({
        status: "success",
        results: dishes.length,
        data: {
            dishess: dishes,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };
  exports.getAllMenius = async (req, res) => {
    try {
      const menius = await Restaurants.find();
      res.status(200).json({
        status: "success",
        results: menius.length,
        data: {
            meniuss: menius,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  exports.addNewRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurants.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: newRestaurant
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.addNewDishes = async (req, res) => {
    console.log(req.params.id);
    console.log(req.params.subId);
    try {
      const updated = await Restaurants.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { dishes: req.body } },
        {
          new: true,
        }
      );
      console.log(req.params.id);
     console.log(req.params.subId);
      console.log(updated);
      res.status(200).json({
        status: "success",
        data: {
            dishes: updated,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  exports.addNewMeniu = async (req, res) => {
    console.log(req.params.id);
    console.log(req.params.subId);
    try {
      const updated = await Restaurants.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { meniu: req.body } },
        {
          new: true,
        }
      );
      console.log(req.params.id);
     console.log(req.params.subId);
      console.log(updated);
      res.status(200).json({
        status: "success",
        data: {
            meniu: updated,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getMeniuById = async (req, res) => {
    try {
      const meniu = await Restaurants.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
            menius: meniu,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

exports.getDishesById = async (req, res) => {
    try {
      const dishes = await Restaurants.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
            dishess: dishes,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };


exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurants.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateDishes = async (req, res) => {
    console.log( req.params.id)
    console.log( req.params.subId)
    try {
      const dishes = await Restaurants.findOneAndUpdate(
        {'dishes._id': req.params.subId},
        {
          $set: {
            "dishes.$.value": req.body.value,
          },    
      });
  
      res.status(200).json({
        status: "success",
        data: {
            dishess:dishes,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  exports.updateMeniu = async (req, res) => {
    console.log( req.params.id)
    console.log( req.params.subId)
    try {
      const meniu = await Restaurants.findOneAndUpdate(
        {'meniu._id': req.params.subId},
        {
          $set: {
            "meniu.$.value": req.body.value,
          },    
      });
  
      res.status(200).json({
        status: "success",
        data: {
            menius:meniu,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

// exports.deleteRestaurant = async (req, res) => {
//   try {
//     await Restaurants.findByIdAndRemove(req.params.id);
//     res.status(200).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurants.findOneAndUpdate(
      {'restaurant._id': req.params.subId},
      { $pull: { restaurant: { _id: req.params.subId } } }
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
exports.deleteDishes = async (req, res) => {
    try {
      await Restaurants.findOneAndUpdate(
        {'dishes._id': req.params.subId},
        { $pull: { dishes: { _id: req.params.subId } } }
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
  exports.deleteMeniu = async (req, res) => {
    try {
      await Restaurants.findOneAndUpdate(
        {'meniu._id': req.params.subId},
        { $pull: { meniu: { _id: req.params.subId } } }
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