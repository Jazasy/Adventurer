const express = require('express');
const { giveAdventures, giveAdventure, createAdventure, deleteAdventure, giveRandomAdventures } = require('../controllers/adventureController');
const catchAsync = require("../helpers/catchAsync");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");
const multer = require("multer");
const { adventureStorage } = require("../cloudinary");
const upload = multer({ storage: adventureStorage });

const router = express.Router();

router.get("/", catchAsync(giveAdventures));

router.get("/randoms", catchAsync(giveRandomAdventures));

router.post("/", hasToken, validateRefreshToken, validateAccessToken, upload.single("image"), catchAsync(createAdventure));

router.get("/:adventureId", catchAsync(giveAdventure));

router.delete("/:adventureId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(deleteAdventure));

module.exports = router;