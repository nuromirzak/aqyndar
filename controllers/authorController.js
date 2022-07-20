const Author = require("../models/author");
const Poem = require("../models/poem");
const helpers = require("../helpers");
const Annotation = require("../models/annotation");
const mongoose = require("mongoose");
const config = require("../config");

// Controller for displaying all authors
const displayAllAuthors = async (req, res) => {
    const authors = await Author.find({});

    for (let author of authors) {
        // Check if the user has access to the author
        if (req.session.user_id) {
            author.canEdit = helpers.hasAccess(author.user_id, req.session.user_id);
        }
    }

    // Sort the authors by lexicographic order
    authors.sort((a, b) => {
        if (a.fullname < b.fullname) {
            return -1;
        }
        if (a.fullname > b.fullname) {
            return 1;
        }
        return 0;
    });

    const update_info = req.flash("update_info");
    const delete_info = req.flash("delete_info");

    // Render the all authors page
    res.render("authors/all_authors", {
        title: "Бүкіл авторлар",
        authors,
        isLogged: Boolean(req.session.user_id),
        update_info: update_info[0],
        delete_info: delete_info[0],
    });
};

// Controller for displaying a form for adding a new author
const displayAddAuthorForm = async (req, res) => {
    res.render("authors/add_author", {
        title: "Жаңа автор қосу",
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller for displaying a form for editing an author
const displayEditAuthorForm = async (req, res) => {
    // Get the author id from the query
    const {id} = req.query;

    // Check if the id is present
    if (!id) {
        res.status(400).send("Міндетті торлар толтырылуы қажет");
        return;
    }

    // Find the author
    const author = await Author.findById(id);

    // Check if the author is found
    if (!author) {
        res.send("Автор табылмады");
        return;
    }

    // Check if the user has access to the author
    if (!helpers.hasAccess(author.user_id, req.session.user_id)) {
        res.send("Сіз бұл авторды өңдей алмайсыз");
        return;
    }

    // Render the edit author form
    res.render("authors/edit_author", {
        title: "Авторды өңдеу",
        author: author,
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller for adding/updating an author
const saveAuthor = async (req, res) => {
    const {id, fullname, biography} = req.body;

    // Check if required fields are present
    if (!fullname) {
        res.status(400).send("Міндетті торлар толтырылуы қажет");
        return;
    }

    let authorToUpdate;

    // If id is valid, find the author to update
    if (mongoose.isValidObjectId(id)) {
        authorToUpdate = await Author.findById(id);
    }

    // TODO: Implement if user didn't upload correct file
    const whitelist = [
        'image/png',
        'image/jpeg',
        'image/jpg',
    ];

    // Get a file from multer middleware
    const file = req.file;

    let profilePicture;

    // If uploaded image is valid, set profilePicture to the url of the image
    if (file && whitelist.includes(file.mimetype)) {
        profilePicture = {
            url: file.path,
            filename: file.filename,
        };
    } else {
        // If user didn't upload file, use default profile picture
        profilePicture = config.defaultAuthorProfilePicture;
    }

    // If the author is found, update it
    // else, create a new author
    if (authorToUpdate) {
        // Check if the user has access to the author
        if (!helpers.hasAccess(authorToUpdate.user_id, req.session.user_id)) {
            res.send("Сіз бұл авторды жаңарта алмайсыз");
            return;
        }

        authorToUpdate.fullname = fullname;

        if (profilePicture) {
            authorToUpdate.profilePicture = profilePicture;
        }
        authorToUpdate.biography = biography;

        await authorToUpdate.save();

        req.flash("update_info", "Автор сәтті жаңартылды");
    } else {
        // Create a new author
        const author = new Author({
            fullname,
            user_id: req.session.user_id,
            profilePicture,
            biography,
            likesNum: 0,
        });

        await author.save();

        req.flash("update_info", "Автор сәтті құрылды");
    }

    // Redirect to the all authors page
    res.redirect("/authors");
};

// Controller for deleting an author
const deleteAuthor = async (req, res) => {
    // Get the author id from the query
    const {id} = req.query;

    if (!id) {
        res.status(400).send("Міндетті торлар толтырылуы қажет");
        return;
    }

    // Find the author
    const author = await Author.findById(id);

    // If author is not found, return an error
    if (!author) {
        res.send("Автор табылмады");
        return;
    }

    // Check if the user has access to the author
    if (!helpers.hasAccess(author.user_id, req.session.user_id)) {
        res.send("Сіз бұл авторды жоя алмайсыз");
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

    req.flash("delete_info", "Автор сәтті жойылды");

    // Redirect to the all authors page
    res.redirect("/authors");
};

// Controller for displaying a specific author
const displayAuthor = async (req, res) => {
    // Get the author id from the query
    const {id} = req.params;

    // Check if the id is present
    if (!id) {
        res.status(400).send("Міндетті торлар толтырылуы қажет");
        return;
    }

    // Find the author
    const author = await Author.findById(id);

    // Check if the author is found
    if (!author) {
        res.send("Автор табылмады");
        return;
    }

    // Render the author page
    res.render("authors/single_author", {
        title: author.fullname,
        isLogged: Boolean(req.session.user_id),
        author,
    });
};

module.exports = {
    displayAllAuthors,
    displayAddAuthorForm,
    displayEditAuthorForm,
    saveAuthor,
    deleteAuthor,
    displayAuthor,
}