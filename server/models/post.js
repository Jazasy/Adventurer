const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Adventure = require("./adventure");
const { cloudinary } = require("../cloudinary");

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    adventure: {
        type: Schema.Types.ObjectId,
        ref: "Adventure"
    },
    content: {
        type: String
    },
    image: {
        type: String
    }
});

PostSchema.post("save", function (doc) {
    console.log("POST CREATED", doc);
})

PostSchema.post("deleteMany", function (doc) {
    console.log("POSTS DELETED", doc);
})

PostSchema.post("findOneAndDelete", async function (doc) {
    console.log("*************PostSchema.post('findOneAndDelete')*************");

    const Like = require("./like");
    await Like.deleteMany({ post: doc._id });

    const Comment = require("./comment");
    await Comment.deleteMany({ post: doc._id });

    const imageName = (doc.image.split("/").pop().split("."))[0];
    await cloudinary.api
        .delete_resources([`Adventurer/posts/${imageName}`],
            { type: 'upload', resource_type: 'image' })
        .then(result => console.log("Cloudinary delete result:", result))
        .catch(error => console.error("Cloudinary delete error:", error));

    console.log("POST DELETED", doc);

    console.log("*************************************************************");
})

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;