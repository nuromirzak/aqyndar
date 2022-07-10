const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const poemSchema = new Schema({
    author_id: ObjectId,
    user_id: ObjectId,
    poem: String,
    title: String,
});

const Poem = mongoose.model("Poem", poemSchema);

module.exports = Poem;