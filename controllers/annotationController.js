const Poem = require("../models/poem");
const Annotation = require("../models/annotation");

const displayAllAnnotations = async (req, res) => {
    const annotations = await Annotation.find({});

    for (let i = 0; i < annotations.length; i++) {
        const poem = await Poem.findById(annotations[i].poem_id);

        annotations[i].poemName = poem.title;
    }

    res.render("annotations", {
        title: "All Annotations",
        isLogged: Boolean(req.session.user),
        annotations: annotations,
    });
};

const displayAddAnnotation = async (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to add an annotation");
        return;
    }

    const id = req.query.poem_id;

    const poem = await Poem.findById(id);

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    res.render("add_annotation", {
        title: "Add Annotation",
        isLogged: Boolean(req.session.user),
        id: id,
        poemName: poem.title,
        lines: poem.poem.split("\r\n"),
    });
};

const addAnnotation = async (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to add an annotation");
        return;
    }

    const {poem_id, line_number, annotation} = req.body;

    if (!(poem_id && line_number && annotation)) {
        res.status(400).send("Missing required fields");
        return;
    }

    const annotation2 = new Annotation({
        user_id: req.session.user._id,
        poem_id,
        line_number,
        content: annotation,
    });

    await annotation2.save();

    req.session.user.annotations.push(annotation2._id);

    res.redirect("/poems");
};

module.exports = {
    displayAllAnnotations,
    displayAddAnnotation,
    addAnnotation,
};

