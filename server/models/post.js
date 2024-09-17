const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    },
    image: {
        type: String
    }
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;