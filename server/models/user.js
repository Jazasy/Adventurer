const mongoose = require("mongoose");
const { Schema } = mongoose;
const Post = require("./post");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    pfp: String, 
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String, 
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;