const express = require('express');
const { giveAdventures, giveAdventure } = require('../controllers/adventureController');
const catchAsync = require("../helpers/catchAsync");

const router = express.Router();

router.get("/", catchAsync(giveAdventures));

router.get("/:id", catchAsync(giveAdventure));

module.exports = router;