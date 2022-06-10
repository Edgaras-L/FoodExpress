
const e = require("express");
const Transactions = require("../models/TransactionsModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Transactions.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        transactions: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.createNewUser = async (req, res) => {
  console.log(req.body)
  try {
    const newUsers = await Transactions.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        transactions: newUsers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

