const express = require("express");
const Post = require("../models/post");
const Like = require("../models/like");
const User = require("../models/user");
const catchAsync = require("../helpers/catchAsync");


const router = express.Router();

router.get("/", (req, res) => {
    res.send("adventures");
});

router.get("/:id/likes", async (req, res) => {
    const { id } = req.params;
    const likes = await Post.findById(id);
    res.json(likes.length);
})

router.put("/:id/likes", async (req, res) => {
    const { id } = req.params;
    const newLike = new Like({ user: req.body.userId, post: id });
    await newLike.save();
    res.status(201).send();
})

module.exports = router;