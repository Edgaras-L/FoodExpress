const Tours = require("./../models/TourModel");



exports.getAllTours = async (req, res) => {
  try {
    const tour = await tours.find();
    res.status(200).json({
      status: "success",
      results: tour.length,
      data: {
        tours: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.addNewTour = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Tours.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { tour: req.body } },
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
        tour: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tours.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tours: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  console.log( req.params.id)
  console.log( req.params.subId)
  try {
    const tour = await Tours.findOneAndUpdate(
      {'tour._id': req.params.subId},
      {
        $set: {
          "tour.$.value": req.body.value,
        },    
    });

    res.status(200).json({
      status: "success",
      data: {
        tours: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tours.findOneAndUpdate(
      {'tour._id': req.params.subId},
      { $pull: { tour: { _id: req.params.subId } } }
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