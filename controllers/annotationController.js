const Poem = require("../models/poem");
const Annotation = require("../models/annotation");
const mongoose = require("mongoose");
const AppError = require("../AppError");

// Controller for displaying all annotations
const displayAllAnnotations = async (req, res, next) => {
    let {page = "1"} = req.query;

    page = Number(page);

    if (page < 1 || Object.is(page, NaN)) {
        page = 1;
    }

    const limit = 20;

    // Paginate annotations
    const annotations = await Annotation.find({}, null, {
        skip: (page - 1) * limit,
        limit: limit,
    });

    for (let i = 0; i < annotations.length; i++) {
        // Get the poem title for each annotation
        const poem = await Poem.findById(annotations[i].poem_id);

        annotations[i].poemName = poem.title;
    }

    const count = await Annotation.countDocuments();

    // Render the all annotations page
    res.render("annotations/all_annotations", {
        title: "All Annotations",
        isLogged: Boolean(req.session.user_id),
        annotations: annotations,
        start: (page - 1) * limit + 1,
        page: page,
        numberOfPages: Math.ceil(count / limit),
    });
};

const displayPoemsForAddingAnnotation = async (req, res, next) => {
    let {page = "1"} = req.query;

    page = Number(page);

    if (page < 1 || Object.is(page, NaN)) {
        page = 1;
    }

    const limit = 20;

    // Paginate poems
    const poems = await Poem.find({}, null, {
        skip: (page - 1) * limit,
        limit: limit,
    });

    const count = await Poem.countDocuments();

    // Render the add annotation page
    res.render("annotations/poems_for_annotations", {
        title: "Аннотация қосу",
        isLogged: Boolean(req.session.user_id),
        poems: poems,
        start: (page - 1) * limit + 1,
        page: page,
        numberOfPages: Math.ceil(count / limit),
    });
};

// Controller for displaying form for adding an annotation for a specific poem
const displayAddAnnotation = async (req, res, next) => {
    // Get the poem id from the query params
    const id = req.query.poem_id;

    // Get the line number
    const line_number = req.query.line_number;

    let poem;
        // Get the poem
    if (mongoose.isValidObjectId(id)) {
        poem = await Poem.findById(id);
    }

    // If poem doesn't exist, send message to user
    if (!poem) {
        next(new AppError("Өлең табылмады", 404));
        return;
    }

    const lines = poem.poem.split("\r\n");

    const annotation_info = req.flash("annotation_info");

    // Render the add annotation page
    res.render("annotations/add_annotation", {
        title: "Аннотация қосу",
        isLogged: Boolean(req.session.user_id),
        id: id,
        poemName: poem.title,
        line_number: parseInt(line_number),
        lines: lines,
        annotation_info: annotation_info[0],
    });
};

// Controller that handles adding an annotation to the database
const addAnnotation = async (req, res, next) => {
    const {poem_id, line_number, annotation, from_collapse} = req.body;

    // Check if required fields are filled out
    if (!(poem_id && line_number && annotation)) {
        next(new AppError("Міндетті торлар толтырылуы қажет", 400));
        return;
    }

    // Create the annotation
    const annotation2 = new Annotation({
        user_id: req.session.user_id,
        poem_id,
        line_number,
        content: annotation,
    });

    // Save the annotation
    await annotation2.save();

    req.flash("annotation_info", "Аннотация сәтті қосылды");

    res.redirect(`/annotations/new?poem_id=${poem_id}&line_number=${line_number}`);
};

module.exports = {
    displayPoemsForAddingAnnotation,
    displayAllAnnotations,
    displayAddAnnotation,
    addAnnotation,
};

