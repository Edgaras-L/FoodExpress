const Tour = require("./../models/tourModel");

// /
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours: tours,
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
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
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

// /
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// const tourExists = await Tour.exists({ _id: req.params.id });
// /:id
exports.updateTour = async (req, res) => {
  //pvz.:  req.body  { name: 'Varėna' }
  try {
    const upatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        tour: upatedTour,
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
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
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

/**
 * Darbas su subdokumentais
 **/

// "/:id/tour"
exports.addToTourPlace = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Tour.findOneAndUpdate(
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

//"/:id/tour/delete/:subID"
exports.deleteFromTourPlace = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);

  try {
    await Tour.findOneAndUpdate(
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

// "/:id/tour/update/:subID"
exports.findPlacesAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);
  console.log(req.body);

  try {
    await Tour.findOneAndUpdate(
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
