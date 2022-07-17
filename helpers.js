const Poem = require("./models/poem");
const Annotation = require("./models/annotation");
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
}

module.exports = {
    compareObjectIds,
    isAuth,
    hasAccess
}