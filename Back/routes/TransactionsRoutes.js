const express = require("express");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

const {
  getAllUsers,
  createNewUser,
} = require("../controllers/TransactionsController");

const { signup, signin, signout } = require("../controllers/auth.controller")

const router = express.Router();

//User
router.route("/newUsers/create").patch(createNewUser);
router.route("/").get(getAllUsers);

router.route('/auth/signup').post([
  verifySignUp.checkDuplicateUsernameOrEmail,
  verifySignUp.checkRolesExisted
],
  controller.signup)

router.route("/auth/signin").post(controller.signin);

module.exports = router;
