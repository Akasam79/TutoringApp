const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");

const usersContoroller = require("../controllers/usersController");
router.post(
  "/api/auth/login/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("Password", "A valid Password is required").exists(),
  ],
  usersContoroller.loginUser
);
router.get("/api/auth", auth, usersContoroller.getLoggedInUser);
module.exports = router;
