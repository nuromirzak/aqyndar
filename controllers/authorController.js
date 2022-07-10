const Author = require("../models/author");
const Poem = require("../models/poem");
const helpers = require("../helpers");
const Annotation = require("../models/annotation");
const mongoose = require("mongoose");

const displayAllAuthors = async (req, res) => {
    const authors = await Author.find({});

    for (let author of authors) {
        if (req.session.user) {
            author.canEdit = helpers.compareObjectIds(author.user_id, req.session.user._id);
        }
    }

    res.render("authors", {
        title: "All authors",
        authors,
        isLogged: Boolean(req.session.user),
    });
};

const displayAddAuthorForm = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/sign_in");
        return;
    }

    const id = req.query.id;

    const author = await Author.findById(id);

    res.render("add_author", {
        title: "Add Author",
        fullname: author ? author.fullname : "",
        id,
        isLogged: Boolean(req.session.user),
    });
};

const addAuthor = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/sign_in");
        return;
    }

    const {fullname} = req.body;

    if (!fullname) {
        res.status(400).send("Bad request");
        return;
    }

    let authorToUpdate;

    if (mongoose.isValidObjectId(req.body.id)) {
        authorToUpdate = await Author.findById(req.body.id);
    }

    if (authorToUpdate) {
        if (!helpers.compareObjectIds(authorToUpdate.user_id, req.session.user._id)) {
            res.send("You can't update this author");
            return;
        }

        authorToUpdate.fullname = fullname;
        await authorToUpdate.save();
    } else {
        const author = new Author({
            fullname,
            user_id: req.session.user._id,
        });

        await author.save();
    }

    res.redirect("/authors");
};

const deleteAuthor = async (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to delete a poem");
        return;
    }

    const {id} = req.query;

    if (!id) {
        res.status(400).send("Missing required fields");
        return;
    }

    const author = await Author.findById(id);

    if (!author) {
        res.send("Author not found");
        return;
    }

    if (!helpers.compareObjectIds(author.user_id, req.session.user._id)) {
        res.send("You can't delete this author");
        return;
    }

    const poems = await Poem.find({author_id: id});

    for (let poem of poems) {
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
    }

    await Author.deleteOne({_id: author._id});

    res.redirect("/authors");
};

module.exports = {
    displayAllAuthors,
    displayAddAuthorForm,
    addAuthor,
    deleteAuthor,
}