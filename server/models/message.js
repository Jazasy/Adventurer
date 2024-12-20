const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Adventure = require("./adventure");

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    adventure: {
        type: Schema.Types.ObjectId,
        ref: "Adventure",
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

MessageSchema.post("save", function(doc) {
    console.log("MESSAGE CREATED", doc);
})

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;