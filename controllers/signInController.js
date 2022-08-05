const bcrypt = require("bcrypt");
const User = require("../models/user");
const Annotation = require("../models/annotation");
const AppError = require("../AppError");

// Controller that displays the sign-in page
const displaySignIn = (req, res, next) => {
    // If the user is already signed in, redirect to the profile page
    if (req.session.user_id) {
        res.redirect("/profile");
        return;
    }

    const create_info = req.flash("create_info");

    res.render("auth/sign_in", {
        title: "Кіру",
        isLogged: Boolean(req.session.user_id),
        create_info: create_info[0],
    });
};

// Controller that handles the sign-in process
const signIn = async (req, res, next) => {
    const {username, password} = req.body;

    // Check if required fields are filled
    if (!(username && password)) {
        next(new AppError("Міндетті торлар толтырылмаған", 400));
        return;
    }

    // Check and validate the user
    const user = await User.findAndValidate(username, password);

    if (user) {
        req.session.user_id = user._id;
    } else {
        return res.redirect("/sign_in");
    }

    req.flash("sign_in", "Сіз жүйеге сәтті кірдіңіз");

    // Redirect to the profile page
    res.redirect("/profile");
};

module.exports = {
    displaySignIn,
    signIn,
}