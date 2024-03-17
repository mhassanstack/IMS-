const express = require("express");
const {
  getItemController,
  addItemController,
  editItemsController,
  deleteItemsController,
} = require("./../controllers/itemController");

const router = express.Router();
// router
// Method - get
router.get("/get-item", getItemController);

// Method - Post
router.post("/add-item", addItemController);

// method - PUT
router.put("/edit-item", editItemsController);

// method - DELETE
router.post("/delete-item", deleteItemsController);

module.exports = router;
