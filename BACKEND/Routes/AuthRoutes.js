const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

router.route("/login").post(authController.loginUser);
// router.route("/reset-pass/:email").get(authController.sendTokenVerify);
// router.route("/reset-pass/otp").post(authController.otpVerify);
// router.route("/reset-pass").post(authController.resetPassword);
// router.route("/logout").get(authController.logout);

module.exports = router;
