const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Adventure = require("./adventure");

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

PostSchema.post("deleteMany", function(doc) {
    console.log("POSTS DELETED", doc);
})

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;