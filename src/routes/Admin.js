const express = require('express');
const {getAllUsers,editUser,deleteUser,addUser} = require("../controller/Admin")

const router = express.Router();

router.get("/users", getAllUsers)
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);
router.post("/users", addUser);

module.exports = router
