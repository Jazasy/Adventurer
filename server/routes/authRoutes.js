const express = require("express");
const { registerUser, loginUser, giveNewToken, logoutUser, giveUser, giveUserById } = require("../controllers/authController");
const catchAsync = require("../helpers/catchAsync");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");
const multer = require("multer");
const { userStorage } = require("../cloudinary");
const upload = multer({ storage: userStorage });

const router = express.Router();

router.use(express.json());

router.post("/register", upload.single("pfp"), catchAsync(registerUser));

router.post('/token', catchAsync(giveNewToken));

router.post('/login', catchAsync(loginUser));

router.delete('/logout', catchAsync(logoutUser));

router.get("/user",
    hasToken,
    validateRefreshToken,
    validateAccessToken,
    catchAsync(giveUser));

router.get("/users/:userId", catchAsync(giveUserById));

module.exports = router;