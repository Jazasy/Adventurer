const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
const Application = require("../models/application")

const givePosts = async (req, res) => {
    const foundPosts = await Post.find();
    res.json(foundPosts);
}

const givePostsByAdventure = async (req, res) => {
    const { adventureId } = req.params;
    const foundPosts = await Post.find({ adventure: adventureId }).populate({path: "author", select: "username pfp"});
    res.json(foundPosts.reverse());
}

const givePostsByUser = async (req, res) => {
    const {userId} = req.params;
    const foundPosts = await Post.find({author: userId}).populate({path: "author", select: "username pfp"});
    res.json(foundPosts.reverse());
}

const givePost = async (req, res) => {
    const { id } = req.params;
    const foundPost = await Post.findById(id).populate({path: "author", select: "username pfp"});
    res.json(foundPost);
}

const makePost = async (req, res) => {
    const { adventureId } = req.params;
    const { content } = req.body;
    const foundApplication = await Application.findOne({ user: req.userId, adventure: adventureId });
    if ((foundApplication && foundApplication.accepted === true) || req.role === "admin") {
        if (!content) return res.status(400).json({ message: "Content can not be empty" });
        if (!req.file) return res.status(400).json({ message: "You need to upload an image" });
        const newPost = new Post({ author: req.userId, adventure: adventureId, content: content, image: req.file.path });
        await newPost.save();
        res.status(201).send();
    } else {
        return res.status(403).json({ message: "You do not have permission to post in this adventure" });
    }
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
    const newLike = new Like({ user: req.userId, post: id });
    await newLike.save();
    res.status(201).send();
}

const unlike = async (req, res) => {
    const { id } = req.params;
    await Like.findOneAndDelete({ user: req.userId, post: id });
    res.status(204).send();
}

const comment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ message: "Comment can not be empty" });
    const newComment = new Comment({ author: req.userId, content: comment, post: id });
    newComment.save();
    res.status(201).send();
}

const giveComments = async (req, res) => {
    const { id } = req.params;
    const foundComments = await Comment.find({ post: id }).populate({path: "author", select: "username pfp"});
    res.json(foundComments);
}

module.exports = {
    givePosts,
    givePostsByAdventure,
    givePostsByUser,
    givePost,
    giveIsliked,
    giveLikeCount,
    like,
    unlike,
    comment,
    giveComments,
    makePost
}