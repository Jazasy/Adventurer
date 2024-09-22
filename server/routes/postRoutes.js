const express = require("express");
const catchAsync = require("../helpers/catchAsync");
const { giveIsliked, giveLikeCount, like, unlike, givePostsByAdventure, givePosts, givePost, comment, giveComments } = require("../controllers/postController");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");


const router = express.Router();

router.post("/:id/comments",hasToken, validateRefreshToken, validateAccessToken, catchAsync(comment));

router.get("/:id/comments", catchAsync(giveComments));

router.get("/", catchAsync(givePosts));

router.get("/:adventureId", catchAsync(givePostsByAdventure));

router.get("/:id", catchAsync(givePost));

router.get("/:id/:userId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(giveIsliked));

router.get("/:id/likes", catchAsync(giveLikeCount));

router.put("/:id/likes", hasToken, validateRefreshToken, validateAccessToken, catchAsync(like));

router.delete("/:id/likes", hasToken, validateRefreshToken, validateAccessToken, catchAsync(unlike));

module.exports = router;