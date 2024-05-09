const express = require('express');
const {getUserById,updateUserProfileImage} = require("../controller/Authenticated")
const {authenticateToken} = require("../utils/authMiddleware")
const upload = require("../utils/multerMiddleware")


const router = express.Router();

router.get("/user", authenticateToken,getUserById)
router.patch("/user/profileImage", authenticateToken,  upload.single('profileImage'), updateUserProfileImage)

module.exports = router
