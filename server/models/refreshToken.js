const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        unique: true
    }
})

const refreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema);

module.exports = refreshTokenModel;