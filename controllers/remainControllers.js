const User = require("../models/user");
const Annotation = require("../models/annotation");
const {defaultProfilePicture} = require("../config");

const displayProfile = async (req, res) => {
    console.log(req.session.user);

    let annotations = [];

    for (let i = 0; i < req.session.user.annotations.length; i++) {
        let annotation = await Annotation.findById(req.session.user.annotations[i]);

        // TODO: Implement deleting annotation from session
        if (annotation)
            annotations.push(annotation.content);
    }

    let url = defaultProfilePicture.url;

    if (req.session.user.profilePicture?.url) {
        url = req.session.user.profilePicture.url;
    }

    res.render("profile", {
        title: "Profile",
        user: req.session.user,
        isLogged: Boolean(req.session.user),
        url,
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