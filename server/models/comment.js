const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Post = require("./post");

const CommentSchema = new Schema({
    author : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
})

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
