const express = require("express");
const { registerUser, loginUser, giveNewToken, logoutUser, giveUser } = require("../controllers/authController");
const catchAsync = require("../helpers/catchAsync");
const { hasToken, validateRefreshToken, validateAccessToken, refreshAccessToken } = require("../helpers/midlewares");
const multer = require("multer");
const { profileStorage } = require("../cloudinary");
const upload = multer({ storage: profileStorage });

const router = express.Router();

router.post("/register", catchAsync(registerUser));

router.post('/token', catchAsync(giveNewToken));

router.post('/login', upload.single("image"), catchAsync(loginUser));

router.delete('/logout', catchAsync(logoutUser));

router.get("/user",
    hasToken,
    validateRefreshToken,
    validateAccessToken,
    catchAsync(giveUser));

module.exports = router;