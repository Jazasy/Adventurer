const express = require("express");
const catchAsync = require("../helpers/catchAsync");
const { giveIsliked, giveLikeCount, like, unlike } = require("../controllers/postController");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");


const router = express.Router();

router.get("/", (req, res) => {
    res.send("adventures");
});

router.get("/:id/:userId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(giveIsliked))

router.get("/:id/likes", catchAsync(giveLikeCount))

router.put("/:id/likes", hasToken, validateRefreshToken, validateAccessToken, catchAsync(like))

router.delete("/:id/likes", hasToken, validateRefreshToken, validateAccessToken, catchAsync(unlike))

module.exports = router;