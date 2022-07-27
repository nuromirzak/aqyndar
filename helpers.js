const Poem = require("./models/poem");
const Annotation = require("./models/annotation");
const mongoose = require("mongoose");
const compareObjectIds = (id1, id2) => {
    return JSON.stringify(id1) === JSON.stringify(id2);
}

const isAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/sign_in");
        return;
    }

    next();
};

const hasAccess = (itemId, userId) => {
    return compareObjectIds(itemId, userId);
};

const youtube_parser = (url) => {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
};

const randomObjectId = () => {
    return new mongoose.Types.ObjectId();
}

module.exports = {
    compareObjectIds,
    isAuth,
    youtube_parser,
    hasAccess,
    randomObjectId
}