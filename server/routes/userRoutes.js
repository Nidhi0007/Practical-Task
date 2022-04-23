const express = require("express");
const {
  createUser,
  editUser,
  restoreUser,
  removeUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

// get user data
router.get("/getUser", getUser);
// create user
router.post("/createUser", createUser);
// edit user
router.put("/editUser/:id", editUser);
// restore user
router.put("/restoreUser/:id", restoreUser);
// delete user
router.delete("/deleteUser/:id", removeUser);
module.exports = router;
