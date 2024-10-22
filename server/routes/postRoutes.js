const express = require("express");
const catchAsync = require("../helpers/catchAsync");
const { giveIsliked, giveLikeCount, like, unlike, givePostsByAdventure, givePosts, givePost, comment, giveComments, makePost, givePostsByUser, deletePost } = require("../controllers/postController");
const { hasToken, validateRefreshToken, validateAccessToken } = require("../helpers/midlewares");
const multer = require("multer");
const { postStorage } = require("../cloudinary");
const upload = multer({ storage: postStorage });

const router = express.Router();

//:id means postId, its needed to be changed to that in the future

router.post("/:id/comments", hasToken, validateRefreshToken, validateAccessToken, catchAsync(comment));

router.get("/:id/comments", catchAsync(giveComments));

router.get("/", catchAsync(givePosts));

router.post("/:adventureId", hasToken, validateRefreshToken, validateAccessToken, upload.single("image"), catchAsync(makePost));

router.get("/:adventureId", catchAsync(givePostsByAdventure));

router.get("/users/:userId", catchAsync(givePostsByUser));

router.get("/:id", catchAsync(givePost));

router.delete("/:id", hasToken, validateRefreshToken, validateAccessToken, catchAsync(deletePost));

router.get("/:id/:userId", hasToken, validateRefreshToken, validateAccessToken, catchAsync(giveIsliked));

router.get("/:id/likes", catchAsync(giveLikeCount));

router.put("/:id/likes", hasToken, validateRefreshToken, validateAccessToken, catchAsync(like));

router.delete("/:id/likes", hasToken, validateRefreshToken, validateAccessToken, catchAsync(unlike));

module.exports = router;