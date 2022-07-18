const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppError = require("../AppError");
const config = require("../config");
const Schema = mongoose.Schema;

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

userSchema.statics.findAndValidate = async function (username, password) {
    const user = await this.findOne({username});

    const isCorrect = user ? await bcrypt.compare(password, user.password) : false;

    return isCorrect ? user : false;
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, config.saltRounds);
    }

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;