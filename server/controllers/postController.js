const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');

const givePosts = async (req, res) => {
    const foundPosts = await Post.find();
    res.json(foundPosts);
}

const givePostsByAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundPosts = await Post.find({ adventure: adventureId });
    res.json(foundPosts);
}

const givePost = async (req, res) => {
    const { id } = req.params;
    const foundPost = await Post.findById(id).populate("author");
    res.json(foundPost);
}

const giveIsliked = async (req, res) => {
    const { id, userId } = req.params;
    if (await Like.findOne({ user: userId, post: id })) {
        res.json(true);
    } else {
        res.json(false);
    }
}

const giveLikeCount = async (req, res) => {
    const { id } = req.params;
    const likes = await Post.findById(id);
    res.json(likes.length);
}

const like = async (req, res) => {
    const { id } = req.params;
    const newLike = new Like({ user: req.body.userId, post: id });
    await newLike.save();
    res.status(201).send();
}

const unlike = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
    await Like.findOneAndDelete({ user: userId, post: id });
    res.status(204).send();
}

const comment = async (req, res) => {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const newComment = new Comment({ author: userId, content: comment, post: id });
    newComment.save();
    res.status(201).send();
}

module.exports = {
    givePosts,
    givePostsByAdventure,
    givePost,
    giveIsliked,
    giveLikeCount,
    like,
    unlike,
    comment,
}