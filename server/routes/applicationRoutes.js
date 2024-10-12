const express = require("express");
const { giveApplicationsByUser, applyToAdventure, giveApplicationsByAdventure, isApplied, acceptApplication, giveAcceptedApplicationsByUser, giveAcceptedApplicationsByAdventure } = require("../controllers/applicationController");
const catchAsync = require("../helpers/catchAsync");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");

const router = express.Router();

router.get("/own/:userId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(giveApplicationsByUser));

router.get("/own/:userId/accepted", catchAsync(giveAcceptedApplicationsByUser));

router.get("/:adventureId/isApplied", catchAsync(isApplied));

router.get("/:adventureId", catchAsync(giveApplicationsByAdventure));

router.get("/:adventureId/accepted", catchAsync(giveAcceptedApplicationsByAdventure));

router.post("/:adventureId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(applyToAdventure));

router.patch("/:applicationId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(acceptApplication));


module.exports = router;