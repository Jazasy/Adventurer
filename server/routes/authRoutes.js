const express = require("express");
const { registerUser, loginUser, giveNewToken, logoutUser, giveUser } = require("../controllers/authController");
const catchAsync = require("../helpers/catchAsync");
const { hasToken } = require("../helpers/midlewares");

const router = express.Router();

router.post("/register", catchAsync(registerUser));

router.post('/token', catchAsync(giveNewToken));

router.post('/login', catchAsync(loginUser));

router.delete('/logout', catchAsync(logoutUser));

router.get("/user", hasToken, catchAsync(giveUser))

module.exports = router;