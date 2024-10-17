const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Post = require("./post");

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
})

LikeSchema.post("save", function (doc) {
    console.log("LIKE CREATED", doc);
})

LikeSchema.post("deleteMany", function(doc) {
    console.log("LIKES DELETED", doc);
})

const LikeModel = mongoose.model("Like", LikeSchema);

module.exports = LikeModel;