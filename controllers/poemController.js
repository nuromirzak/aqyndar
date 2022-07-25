const Author = require("../models/author");
const Poem = require("../models/poem");
const Annotation = require("../models/annotation");

const helpers = require("../helpers");
const mongoose = require("mongoose");
const User = require("../models/user");

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
        title: "Бүкіл өлеңдер",
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
        res.send("Өлең табылмады");
        return;
    }

    const isLiked = poem.liked.get(req.session.user_id);

    poem.liked.set(req.session.user_id, !isLiked);

    await poem.save();

    const author = await Author.findById(poem.author_id);

    if (isLiked) {
        req.flash('like_info', `Сіз лайк алып тастадыңыз`);
        author.likesNum = author.likesNum - 1;
    } else {
        req.flash('like_info', `Сіз лайк қойдыңыз`);
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
        res.send("Өлең табылмады");
        return;
    }

    // Find annotations which are related to this poem
    const annotations = await Annotation.find({poem_id: poem._id});

    // Split poem into array of lines
    poem.array = poem.poem.split("\r\n");

    poem.annotations = [];

    for (let i = 0; i < poem.array.length; i++) {
        // Find all annotations which are related to this line
        const lineAnnotations = annotations.filter(annotation => annotation.line_number === i);
        poem.annotations[i] = [];

        if (lineAnnotations.length > 0) {
            // Add all annotations to poem
            for (let annotation of lineAnnotations) {
                const owner = await User.findById(annotation.user_id);
                annotation.owner = owner.username;
                poem.annotations[i].push(annotation);
            }
        } else {
            poem.annotations[i].push({
                content: "Бұл жолға әлі аннотация жоқ.",
            });
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

    const edit_info = req.flash("edit_info");

    const like_info = req.flash("like_info");

    const annotation_info = req.flash("annotation_info");

    // Render poem
    res.render("poems/single_poem", {
        title: poem.title,
        poem: poem,
        liked: liked,
        isLogged: Boolean(req.session.user_id),
        like_info: like_info[0],
        edit_info: edit_info[0],
        annotation_info: annotation_info[0],
    });
}

// Controller that displays form for creating a new poem
const displayAddPoem = async (req, res) => {
    // Find all authors
    const authors = await Author.find({});

    res.render("poems/add_poem", {
        title: "Жаңа өлең қосу",
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
        res.send("Өлең табылмады");
        return;
    }

    // Check if user can edit this poem
    if (!helpers.hasAccess(poem.user_id, req.session.user_id)) {
        res.send("Сіз бұл өлеңді өзгерете алмайсыз");
        return;
    }

    // Find all authors
    const authors = await Author.find({});

    // Render form
    res.render("poems/edit_poem", {
        title: "Өлеңді өзгерту",
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
        res.status(400).send("Міндетті торлар толтырылуы қажет");
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
            res.send("Сіз бұл өлеңді өзгерте алмайсыз");
            return;
        }

        poemToUpdate.title = title;
        poemToUpdate.poem = poem;
        poemToUpdate.author_id = author;
        poemToUpdate.yt_id = yt_id;

        // Update poem
        await poemToUpdate.save();

        req.flash("edit_info", "Өлең сәтті жаңартылды");

        res.redirect(`/poems/${id}`);
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

        req.flash("edit_info", "Өлең сәтті құрылды");

        res.redirect("/poems");
    }
};

// Controller that deletes a poem
const deletePoem = async (req, res) => {
    // Get poem id from query params
    const {id} = req.query;

    // Validate id
    if (!id) {
        res.status(400).send("Міндетті торлар толтырылуы қажет");
        return;
    }

    // Find poem
    const poem = await Poem.findById(id);

    if (!poem) {
        res.send("Өлең табылмады");
        return;
    }

    // Check if user can edit this poem
    if (!helpers.hasAccess(poem.user_id, req.session.user_id)) {
        res.send("Сіз бұл өлеңді жоя алмайсыз");
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

    req.flash("delete_info", "Өлең сәтті жойылды");

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