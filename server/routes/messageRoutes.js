const express = require("express");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");
const catchAsync = require("../helpers/catchAsync");
const { giveMessagesByAdventure, createMessage } = require("../controllers/messageController");

const router = express.Router();

router.get("/:adventureId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(giveMessagesByAdventure))

router.post("/:adventureId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(createMessage))

module.exports = router;