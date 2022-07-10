const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        enum: ["admin", "moderator", "user"],
    },
    iqNumber: Number,
    registrationDate: Date,
    annotations: [{
        type: ObjectId,
        ref: "Annotation",
    }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;