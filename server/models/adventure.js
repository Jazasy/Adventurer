const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const AdventureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
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
    }
});

const AdventureModel = mongoose.model("Adventure", AdventureSchema);

module.exports = AdventureModel;