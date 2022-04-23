const express = require("express");
const {
  createUser,
  editUser,
  restoreUser,
  removeUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

// add url
router.get("/getUser", getUser);
router.post("/createUser", createUser);
router.put("/editUser/:id", editUser);
router.put("/restoreUser/:id", restoreUser);
router.delete("/deleteUser/:id", removeUser);
module.exports = router;
