const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const authorSchema = new Schema({
    user_id: ObjectId,
    fullname: String,
    profilePicture: {
        url: String,
        filename: String
    },
    biography: String,
    likesNum: Number,
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;