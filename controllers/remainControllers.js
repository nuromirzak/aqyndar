const User = require("../models/user");
const Annotation = require("../models/annotation");

// Controller that displays the profile page
const displayProfile = async (req, res) => {
    // Find all annotations of the user
    const annotations = await Annotation.find({ user_id: req.session.user_id });

    const user = await User.findById(req.session.user_id);

    // Render the profile page
    res.render("auth/profile", {
        title: "Profile",
        isLogged: Boolean(req.session.user_id),
        user: user,
        annotations: annotations,
    });
};

// Controller that displays the main page
const displayMainPage = (req, res) => {
    // Render the main page
    res.render("home", {
        title: "Home",
        isLogged: Boolean(req.session.user_id),
    });
};

module.exports = {
    displayProfile,
    displayMainPage,
};