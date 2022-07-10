const User = require("../models/user");
const Annotation = require("../models/annotation");

const displayProfile = async (req, res) => {
    if (!req.session.user) {
        res.redirect("/sign_in");
        return;
    }

    let annotations = [];

    for (let i = 0; i < req.session.user.annotations.length; i++) {
        let annotation = await Annotation.findById(req.session.user.annotations[i]);
        annotations.push(annotation.content);
    }

    res.render("profile", {
        title: "Profile",
        user: req.session.user,
        isLogged: Boolean(req.session.user),
        annotations,
    });
};

const displayMainPage = (req, res) => {
    res.render("home", {
        title: "Home",
        isLogged: Boolean(req.session.user),
    });
};

module.exports = {
    displayProfile,
    displayMainPage,
};