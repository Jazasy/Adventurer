const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Post = require("./post");

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
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

const AdventureModel = mongoose.model("Adventure", AdventureSchema);

module.exports = AdventureModel;