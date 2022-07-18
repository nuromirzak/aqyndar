const Author = require("../models/author");
const Poem = require("../models/poem");
const Annotation = require("../models/annotation");

const helpers = require("../helpers");
const mongoose = require("mongoose");

// Controller that displays all poems
const displayAllPoems = async (req, res) => {
    // Find all poems
    const poems = await Poem.find({});

    for (let poem of poems) {
        // Find author of this poem
        let author = await Author.findById(poem.author_id);
        // Set author name
        poem.authorName = author.fullname;

        let likes = 0;

        const likedObject = poem.liked.toJSON();

        for (let key in likedObject) {
            if (likedObject[key]) {
                likes++;
            }
        }

        poem.likes = likes;
    }

    // Sort poems by likes
    poems.sort((a, b) => b.likes - a.likes);

    const edit_info = req.flash("edit_info");

    const delete_info = req.flash("delete_info");

    // Render all poems
    res.render("poems/all_poems", {
        title: "All poems",
        isLogged: Boolean(req.session.user_id),
        poems: poems,
        edit_info: edit_info[0],
        delete_info: delete_info[0],
    });
};

// Controller that handles liking a poem
const likePoem = async (req, res) => {
    const {id} = req.query;

    let poem;

    // Validate id
    if (mongoose.isValidObjectId(id)) {
        poem = await Poem.findById(id);
    }

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    const isLiked = poem.liked.get(req.session.user_id);

    poem.liked.set(req.session.user_id, !isLiked);

    await poem.save();

    const author = await Author.findById(poem.author_id);

    if (isLiked) {
        req.flash('like_info', `You unliked ${author.fullname}'s poem`);
        author.likesNum = author.likesNum - 1;
    } else {
        req.flash('like_info', `You liked ${author.fullname}'s poem`);
        author.likesNum = author.likesNum + 1;
    }

    await author.save();

    res.redirect(`/poems/${id}`);
}

// Controller that displays a single poem
const displayPoem = async (req, res) => {
    // Get poem id from url
    const {id} = req.params;

    let poem;

    // Validate id
    if (mongoose.isValidObjectId(id)) {
        poem = await Poem.findById(id);
    }

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    // Find annotations which are related to this poem
    const annotations = await Annotation.find({poem_id: poem._id});

    // Split poem into array of lines
    poem.array = poem.poem.split("\r\n");

    poem.annotations = [];

    for (let i = 0; i < poem.array.length; i++) {
        // Find annotation which is related to this line
        const foundAnnotation = annotations.find(annotation => annotation.line_number === i);

        if (foundAnnotation) {
            poem.annotations.push(foundAnnotation.content);
        } else {
            poem.annotations.push("Бүл жолға әлі аннотация жоқ");
        }
    }

    // Find author of this poem
    let author = await Author.findById(poem.author_id);
    // Set author name
    poem.authorName = author.fullname;

    // Check if user can edit this poem
    if (req.session.user_id) {
        poem.canEdit = helpers.hasAccess(poem.user_id, req.session.user_id);
    }

    const liked = poem.liked.get(req.session.user_id);

    const like_info = req.flash("like_info");

    // Render poem
    res.render("poems/single_poem", {
        title: poem.title,
        poem: poem,
        liked: liked,
        isLogged: Boolean(req.session.user_id),
        like_info: like_info[0],
    });
}

// Controller that displays form for creating a new poem
const displayAddPoem = async (req, res) => {
    // Find all authors
    const authors = await Author.find({});

    res.render("poems/add_poem", {
        title: "Add Poem",
        isLogged: Boolean(req.session.user_id),
        compareObjectIds: helpers.compareObjectIds(),
        authors: authors,
    });
};

// Controller that displays form for editing a poem
const displayEditPoem = async (req, res) => {
    // Get poem id from url
    const {id} = req.query;

    let poem;

    // Validate id
    if (mongoose.isValidObjectId(id)) {
        poem = await Poem.findById(id);
    }

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    // Check if user can edit this poem
    if (!helpers.hasAccess(poem.user_id, req.session.user_id)) {
        res.send("You can't edit this poem");
        return;
    }

    // Find all authors
    const authors = await Author.find({});

    // Render form
    res.render("poems/edit_poem", {
        title: "Edit Poem",
        isLogged: Boolean(req.session.user_id),
        poem: poem,
        compareObjectIds: helpers.compareObjectIds,
        authors: authors,
    });
}

// Controller that saves/updates a poem
const savePoem = async (req, res) => {
    const {id, title, poem, author} = req.body;
    let {yt_id} = req.body;

    // Validate required fields
    if (!(title && poem && author)) {
        res.status(400).send("Missing required fields");
        return;
    }

    let poemToUpdate;

    // Validate id
    if (mongoose.isValidObjectId(req.body.id)) {
        poemToUpdate = await Poem.findById(id);
    }

    // Parse youtube id
    if (yt_id) {
        yt_id = helpers.youtube_parser(yt_id);
    }

    // If poemToUpdate is undefined, then this is a new poem
    // else this is an update of an existing poem
    if (poemToUpdate) {
        // Check if user can edit this poem
        if (!helpers.hasAccess(poemToUpdate.user_id, req.session.user_id)) {
            res.send("You can't update this poem");
            return;
        }

        poemToUpdate.title = title;
        poemToUpdate.poem = poem;
        poemToUpdate.author_id = author;
        poemToUpdate.yt_id = yt_id;

        // Update poem
        await poemToUpdate.save();

        req.flash("edit_info", "Poem updated successfully");
    } else {
        // Create new poem
        const poem2 = new Poem({
            author_id: author,
            user_id: req.session.user_id,
            title,
            poem,
            liked: {},
            yt_id,
        });

        // Save poem
        await poem2.save();

        req.flash("edit_info", "Poem created successfully");
    }

    // Redirect to all poems page
    res.redirect("/poems");
};

// Controller that deletes a poem
const deletePoem = async (req, res) => {
    // Get poem id from query params
    const {id} = req.query;

    // Validate id
    if (!id) {
        res.status(400).send("Missing required fields");
        return;
    }

    // Find poem
    const poem = await Poem.findById(id);

    if (!poem) {
        res.send("Poem not found");
        return;
    }

    // Check if user can edit this poem
    if (!helpers.hasAccess(poem.user_id, req.session.user_id)) {
        res.send("You can't delete this poem");
        return;
    }

    // Find all annotations which are related to this poem
    const annotations = await Annotation.find({poem_id: poem._id});

    // Delete all annotations
    for (let annotation of annotations) {
        await Annotation.deleteOne({_id: annotation._id});
    }

    // Delete poem
    await Poem.deleteOne({_id: poem._id});

    req.flash("delete_info", "Poem deleted successfully");

    // Redirect to all poems page
    res.redirect("/poems");
};

module.exports = {
    displayAllPoems,
    displayPoem,
    displayAddPoem,
    displayEditPoem,
    savePoem,
    deletePoem,
    likePoem,
};