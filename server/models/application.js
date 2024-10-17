const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Adventure = require("./adventure");

const ApplicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    adventure: {
        type: Schema.Types.ObjectId,
        ref: "Adventure"
    },
    accepted: {
        type: Boolean,
        default: false
    }
})

ApplicationSchema.post("save", function (doc) {
    console.log("APPLICATION CREATED", doc);
})

ApplicationSchema.post("deleteMany", function(doc) {
    console.log("APPLICATIONS DELETED", doc);
})

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

module.exports = ApplicationModel;