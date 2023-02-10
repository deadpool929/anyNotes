const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = "Animeshisagoodb$oy";
const { JWT_SECRET } = require("../config/keys");
const JWT_SECRET = require("../config/keys");
const fetchuser = require("../middleware/fetchuser");
//Create a user
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        let success = false;
        return res.status(400).json({
          success,
          errors: "Sorry a user with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      securedPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      let success = true;

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Authenticate a user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        let success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      let Uname = user.name;
      let success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ Uname, success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Get loggedin user details
router.post("/getuser", fetchuser, async (req, res) => {
  userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
