const Author = require("../models/author");
const Poem = require("../models/poem");
const Annotation = require("../models/annotation");

const helpers = require("../helpers");
const {compareObjectIds} = require("../helpers");
const mongoose = require("mongoose");

const displayAllPoems = async (req, res) => {
    const poems = await Poem.find({});

    for (let poem of poems) {
        const annotations = await Annotation.find({poem_id: poem._id});

        poem.array = poem.poem.split("\r\n");

        poem.annotations = [];

        for (let i = 0; i < poem.array.length; i++) {
            const foundAnnotation = annotations.find(annotation => annotation.line_number === i);

            if (foundAnnotation) {
                poem.annotations.push(foundAnnotation.content);
            } else {
                poem.annotations.push("Бүл жолға әлі аннотация жоқ");
            }
        }

        let author = await Author.findById(poem.author_id);
        poem.authorName = author.fullname;

        if (req.session.user) {
            poem.canEdit = helpers.compareObjectIds(poem.user_id, req.session.user._id);
        }
    }

    res.render("poems", {
        title: "All poems",
        poems,
        isLogged: Boolean(req.session.user),
    });
};

const displayPoem = async (req, res) => {
    const {id} = req.params;

    const poem = await Poem.findById(id);

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    const annotations = await Annotation.find({poem_id: poem._id});

    poem.array = poem.poem.split("\r\n");

    poem.annotations = [];

    for (let i = 0; i < poem.array.length; i++) {
        const foundAnnotation = annotations.find(annotation => annotation.line_number === i);

        if (foundAnnotation) {
            poem.annotations.push(foundAnnotation.content);
        } else {
            poem.annotations.push("Бүл жолға әлі аннотация жоқ");
        }
    }

    let author = await Author.findById(poem.author_id);
    poem.authorName = author.fullname;

    if (req.session.user) {
        poem.canEdit = helpers.compareObjectIds(poem.user_id, req.session.user._id);
    }

    res.render("poems", {
        title: poem.title,
        poems: [poem],
        isLogged: Boolean(req.session.user),
    });
}

const displayAddPoem = async (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to add an annotation");
        return;
    }

    const id = req.query.id;

    const poem = await Poem.findById(id);

    const authors = await Author.find({});

    res.render("add_poem", {
        title: "Add Poem",
        id,
        poem,
        compareObjectIds,
        authors,
        isLogged: Boolean(req.session.user),
    });
};

const savePoem = async (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to add an annotation");
        return;
    }

    const {id, title, poem, author} = req.body;

    if (!(title && poem && author)) {
        res.status(400).send("Missing required fields");
        return;
    }

    let poemToUpdate;

    if (mongoose.isValidObjectId(req.body.id)) {
        poemToUpdate = await Poem.findById(id);
    }

    if (poemToUpdate) {
        if (!helpers.compareObjectIds(poemToUpdate.user_id, req.session.user._id)) {
            res.send("You can't update this poem");
            return;
        }

        poemToUpdate.title = title;
        poemToUpdate.poem = poem;
        poemToUpdate.author_id = author;

        await poemToUpdate.save();
    } else {
        const poem2 = new Poem({
            author_id: author,
            user_id: req.session.user._id,
            title,
            poem,
        });

        await poem2.save();
    }

    res.redirect("/poems");
};

const deletePoem = async (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to delete a poem");
        return;
    }

    const {id} = req.query;

    if (!id) {
        res.status(400).send("Missing required fields");
        return;
    }

    const poem = await Poem.findById(id);

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    if (!helpers.compareObjectIds(poem.user_id, req.session.user._id)) {
        res.send("You can't delete this poem");
        return;
    }

    const annotations = await Annotation.find({poem_id: poem._id});

    for (let annotation of annotations) {
        await Annotation.deleteOne({_id: annotation._id});
    }

    for (let annotation of req.session.user.annotations) {
        if (helpers.compareObjectIds(annotation, poem._id)) {
            req.session.user.annotations.splice(req.session.user.annotations.indexOf(annotation), 1);
        }
    }

    await Poem.deleteOne({_id: poem._id});

    res.redirect("/poems");
};

module.exports = {
    displayAllPoems,
    displayPoem,
    displayAddPoem,
    savePoem,
    deletePoem,
};