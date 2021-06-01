const User = require("../models/User");
const validationResult = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { SECRET } = process.env;

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      statusCode: 200,
      message: "User gotten successfully",
      user: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal Server error!");
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid Credentials" });
    else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ statusCode: 400, message: "invalid credentials" });
      }
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          statusCode: 200,
          message: "Login Successful",
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userRole: user.userRole,
            isTutor: user.isTutor,
            isAdmin: user.isAdmin,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
