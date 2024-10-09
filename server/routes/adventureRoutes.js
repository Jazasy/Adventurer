const express = require('express');
const { giveAdventures, giveAdventure, applyToAdventure, giveApplications, isApplied, createAdventure } = require('../controllers/adventureController');
const catchAsync = require("../helpers/catchAsync");
const { hasToken, validateRefreshToken, validateAccessToken} = require("../helpers/midlewares");
const multer = require("multer");
const { adventureStorage } = require("../cloudinary");
const upload = multer({ storage: adventureStorage });

const router = express.Router();

router.get("/", catchAsync(giveAdventures));

router.post("/", hasToken, validateRefreshToken, validateAccessToken, upload.single("image"), catchAsync(createAdventure));

router.get("/:adventureId", catchAsync(giveAdventure));

router.post("/:adventureId/applications", hasToken, validateRefreshToken, validateAccessToken, catchAsync(applyToAdventure));

router.get("/:adventureId/applications", catchAsync(giveApplications));

router.get("/:adventureId/applications/isApplied", catchAsync(isApplied));

module.exports = router;