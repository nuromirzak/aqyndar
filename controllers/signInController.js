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

    res.render("auth/sign_in", {
        title: "Sign In",
        isLogged: Boolean(req.session.user_id),
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

    // Check if the user exists
    const user = await User.findOne({username});

    // If the user does not exist, return an error
    if (!user) {
        res.status(400).send("No user found with that username");
        return;
    }

    // Check if the password is correct
    const isCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!isCorrect) {
        res.status(400).send("Incorrect password");
        return;
    }

    // Assign the user to the session
    req.session.user_id = user._id;

    // Redirect to the profile page
    res.redirect("/profile");
};

module.exports = {
    displaySignIn,
    signIn,
}