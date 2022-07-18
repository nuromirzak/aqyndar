const bcrypt = require("bcrypt");
const User = require("../models/user");
const Annotation = require("../models/annotation");

// Controller that displays the sign-in page
const displaySignIn = (req, res) => {
    // If the user is already signed in, redirect to the profile page
    if (req.session.user_id) {
        res.redirect("/profile");
        return;
    }

    const create_info = req.flash("create_info");

    res.render("auth/sign_in", {
        title: "Sign In",
        isLogged: Boolean(req.session.user_id),
        create_info: create_info[0],
    });
};

// Controller that handles the sign-in process
const signIn = async (req, res) => {
    const {username, password} = req.body;

    // Check if required fields are filled
    if (!(username && password)) {
        res.status(400).send("Missing required fields");
        return;
    }

    // Check and validate the user
    const user = await User.findAndValidate(username, password);

    if (user) {
        req.session.user_id = user._id;
    } else {
        return res.redirect("/sign_in");
    }

    req.flash("sign_in", "You have successfully signed in");

    // Redirect to the profile page
    res.redirect("/profile");
};

module.exports = {
    displaySignIn,
    signIn,
}