const Poem = require("../models/poem");
const Annotation = require("../models/annotation");

// Controller for displaying all annotations
const displayAllAnnotations = async (req, res) => {
    // Get all annotations
    const annotations = await Annotation.find({});

    for (let i = 0; i < annotations.length; i++) {
        // Get the poem title for each annotation
        const poem = await Poem.findById(annotations[i].poem_id);

        annotations[i].poemName = poem.title;
    }

    // Render the all annotations page
    res.render("annotations/all_annotations", {
        title: "All Annotations",
        isLogged: Boolean(req.session.user_id),
        annotations: annotations,
    });
};

const displayPoemsForAddingAnnotation = async (req, res) => {
    // Get all poems
    const poems = await Poem.find({});

    // Render the add annotation page
    res.render("annotations/poems_for_annotations", {
        title: "Add Annotation",
        isLogged: Boolean(req.session.user_id),
        poems: poems,
    });
};

// Controller for displaying form for adding an annotation for a specific poem
const displayAddAnnotation = async (req, res) => {
    // Get the poem id from the query params
    const id = req.query.poem_id;

    // Get the poem
    const poem = await Poem.findById(id);

    // If poem doesn't exist, send message to user
    if (!poem) {
        res.send("Poem not found");
        return;
    }

    // Render the add annotation page
    res.render("annotations/add_annotation", {
        title: "Add Annotation",
        isLogged: Boolean(req.session.user_id),
        id: id,
        poemName: poem.title,
        lines: poem.poem.split("\r\n"),
    });
};

// Controller that handles adding an annotation to the database
const addAnnotation = async (req, res) => {
    const {poem_id, line_number, annotation} = req.body;

    // Check if required fields are filled out
    if (!(poem_id && line_number && annotation)) {
        res.status(400).send("Missing required fields");
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

    // Redirect to the all poems page
    res.redirect("/poems");
};

module.exports = {
    displayPoemsForAddingAnnotation,
    displayAllAnnotations,
    displayAddAnnotation,
    addAnnotation,
};

