const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: String,
    password: String,
    profilePicture: {
        url: String,
        filename: String
    },
    email: String,
    role: {
        type: String,
        enum: ["admin", "moderator", "user"],
    },
    iqNumber: Number,
    registrationDate: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;