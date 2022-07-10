const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const annotationSchema = new Schema({
    user_id: ObjectId,
    poem_id: ObjectId,
    line_number: Number,
    content: String,
});

const Annotation = mongoose.model("Annotation", annotationSchema);

module.exports = Annotation;