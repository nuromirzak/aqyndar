const Author = require("../models/author");
const Poem = require("../models/poem");
const helpers = require("../helpers");
const Annotation = require("../models/annotation");
const mongoose = require("mongoose");

// Controller for displaying all authors
const displayAllAuthors = async (req, res) => {
    const authors = await Author.find({});

    for (let author of authors) {
        // Check if the user has access to the author
        if (req.session.user_id) {
            author.canEdit = helpers.hasAccess(author.user_id, req.session.user_id);
        }
    }

    // Render the all authors page
    res.render("authors/all_authors", {
        title: "All authors",
        authors,
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller for displaying a form for adding a new author
const displayAddAuthorForm = async (req, res) => {
    res.render("authors/add_author", {
        title: "Add Author",
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller for displaying a form for editing an author
const displayEditAuthorForm = async (req, res) => {
    // Get the author id from the query
    const {id} = req.query;

    // Check if the id is present
    if (!id) {
        res.status(400).send("Missing required fields");
        return;
    }

    // Find the author
    const author = await Author.findById(id);

    // Check if the author is found
    if (!author) {
        res.send("Author not found");
        return;
    }

    // Check if the user has access to the author
    if (!helpers.hasAccess(author.user_id, req.session.user_id)) {
        res.send("You can't edit this author");
        return;
    }

    // Render the edit author form
    res.render("authors/edit_author", {
        title: "Edit Author",
        author: author,
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller for adding/updating an author
const saveAuthor = async (req, res) => {
    const {id, fullname} = req.body;

    // Check if required fields are present
    if (!fullname) {
        res.status(400).send("Bad request");
        return;
    }

    let authorToUpdate;

    // If id is valid, find the author to update
    if (mongoose.isValidObjectId(id)) {
        authorToUpdate = await Author.findById(id);
    }

    // If the author is found, update it
    // else, create a new author
    if (authorToUpdate) {
        // Check if the user has access to the author
        if (!helpers.hasAccess(authorToUpdate.user_id, req.session.user_id)) {
            res.send("You can't update this author");
            return;
        }

        authorToUpdate.fullname = fullname;
        await authorToUpdate.save();
    } else {
        // Create a new author
        const author = new Author({
            fullname,
            user_id: req.session.user_id,
        });

        await author.save();
    }

    // Redirect to the all authors page
    res.redirect("/authors");
};

// Controller for deleting an author
const deleteAuthor = async (req, res) => {
    // Get the author id from the query
    const {id} = req.query;

    if (!id) {
        res.status(400).send("Missing required fields");
        return;
    }

    // Find the author
    const author = await Author.findById(id);

    // If author is not found, return an error
    if (!author) {
        res.send("Author not found");
        return;
    }

    // Check if the user has access to the author
    if (!helpers.hasAccess(author.user_id, req.session.user_id)) {
        res.send("You can't delete this author");
        return;
    }

    // Find all the poems of the author
    const poems = await Poem.find({author_id: id});

    for (let poem of poems) {
        // Find all the annotations of the poem
        const annotations = await Annotation.find({poem_id: poem._id});

        // Delete all the annotations of the poem
        for (let annotation of annotations) {
            await Annotation.deleteOne({_id: annotation._id});
        }

        // Delete the poem
        await Poem.deleteOne({_id: poem._id});
    }

    // Finally, delete the author
    await Author.deleteOne({_id: author._id});

    // Redirect to the all authors page
    res.redirect("/authors");
};

module.exports = {
    displayAllAuthors,
    displayAddAuthorForm,
    displayEditAuthorForm,
    saveAuthor,
    deleteAuthor,
}