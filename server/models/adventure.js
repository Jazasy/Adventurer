const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const { cloudinary } = require("../cloudinary");

const AdventureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

AdventureSchema.post("save", function (doc) {
    console.log("ADVENTURE CREATED", doc);
})

AdventureSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        console.log("*************AdventureSchema.post('findOneAndDelete')*************");

        const Post = require("./post");
        const Like = require("./like");
        const Comment = require("./comment");

        const foundPosts = await Post.find({ adventure: doc._id });

        for (let post of foundPosts) {
            console.log("");
            await Like.deleteMany({ post: post._id });
            await Comment.deleteMany({ post: post._id });
            console.log("");
        }

        for (let post of foundPosts) {
            const imageName = (post.image.split("/").pop().split("."))[0];
            await cloudinary.api
                .delete_resources([`Adventurer/posts/${imageName}`],
                    { type: 'upload', resource_type: 'image' })
                .then(result => console.log("Cloudinary delete result:", result))
                .catch(error => console.error("Cloudinary delete error:", error));
        }

        await Post.deleteMany({ adventure: doc._id });

        const Application = require("./application");
        
        await Application.deleteMany({ adventure: doc._id });

        for (let image of doc.images) {
            const imageName = (image.split("/").pop().split("."))[0];
            await cloudinary.api
                .delete_resources([`Adventurer/adventures/${imageName}`],
                    { type: 'upload', resource_type: 'image' })
                .then(result => console.log("Cloudinary delete result:", result))
                .catch(error => console.error("Cloudinary delete error:", error));
        }

        console.log("ADVENTURE DELETED", doc);

        console.log("********************************************************************");
    }
})

const AdventureModel = mongoose.model("Adventure", AdventureSchema);

module.exports = AdventureModel;