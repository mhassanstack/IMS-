const express = require("express");
const {
  loginController,
  registerController,
} = require("./../controllers/userController");

const router = express.Router();
// router
// Method - get
router.post("/login", loginController);

// Method - Post
router.post("/register", registerController);

module.exports = router;
