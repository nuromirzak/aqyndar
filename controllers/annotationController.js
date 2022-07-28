const Poem = require("../models/poem");
const Annotation = require("../models/annotation");
const mongoose = require("mongoose");

// Controller for displaying all annotations
const displayAllAnnotations = async (req, res) => {
    let {page = "1"} = req.query;

    page = Number(page);
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

const displayPoemsForAddingAnnotation = async (req, res) => {
    let {page = "1"} = req.query;

    page = Number(page);
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
const displayAddAnnotation = async (req, res) => {
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
        res.send("Өлең табылмады");
        return;
    }

    const lines = poem.poem.split("\r\n");

    // Render the add annotation page
    res.render("annotations/add_annotation", {
        title: "Аннотация қосу",
        isLogged: Boolean(req.session.user_id),
        id: id,
        poemName: poem.title,
        line_number: parseInt(line_number),
        lines: lines,
    });
};

// Controller that handles adding an annotation to the database
const addAnnotation = async (req, res) => {
    const {poem_id, line_number, annotation} = req.body;

    // Check if required fields are filled out
    if (!(poem_id && line_number && annotation)) {
        res.status(400).send("Міндетті торлар толтырылуы қажет");
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

    // Redirect to the all poems page
    res.redirect(`/poems/${poem_id}`);
};

module.exports = {
    displayPoemsForAddingAnnotation,
    displayAllAnnotations,
    displayAddAnnotation,
    addAnnotation,
};

