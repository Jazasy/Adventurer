const express = require('express');
const { giveAdventures, giveAdventure, applyToAdventure, giveApplications } = require('../controllers/adventureController');
const catchAsync = require("../helpers/catchAsync");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");

const router = express.Router();

router.get("/", catchAsync(giveAdventures));

router.get("/:adventureId", catchAsync(giveAdventure));

router.post("/:adventureId/applications", hasToken, validateRefreshToken, validateAccessToken, catchAsync(applyToAdventure));

router.get("/:adventureId/applications", catchAsync(giveApplications));

module.exports = router;