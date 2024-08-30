const express = require("express");
const { registerUser, loginUser, giveNewToken, logoutUser } = require("../controllers/authController");
const catchAsync = require("../helpers/catchAsync");

const router = express.Router();

router.post("/register", catchAsync( registerUser ));

router.post('/token',giveNewToken);

router.post('/login',  catchAsync( loginUser ));

router.delete('/logout', logoutUser);

module.exports = router;