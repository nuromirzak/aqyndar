const User = require("../models/user");
const Annotation = require("../models/annotation");

const displaySignIn = (req, res) => {
    if (req.session.user) {
        res.redirect("/profile");
        return;
    }

    res.render("sign_in", {
        title: "Sign In",
        isLogged: Boolean(req.session.user),
    });
};

const signIn = async (req, res) => {
    const {username, password} = req.body;

    if (!(username && password)) {
        res.status(400).send("Missing required fields");
        return;
    }

    const user = await User.findOne({username});

    if (!user) {
        res.status(400).send("No user found with that username");
        return;
    }

    if (user.password !== password) {
        res.status(400).send("Incorrect password");
        return;
    }

    req.session.user = user;

    const userAnnotations = await Annotation.find({user_id: req.session.user._id});

    for (let i = 0; i < userAnnotations.length; i++) {
        req.session.user.annotations.push(userAnnotations[i]._id);
    }

    res.redirect("/");
};

module.exports = {
    displaySignIn,
    signIn,
}