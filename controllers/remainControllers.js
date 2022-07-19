// Controller that displays the main page
const displayMainPage = (req, res) => {
    // Render the main page
    res.render("home", {
        title: "Home",
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller that displays the about page
const displayAboutPage = (req, res) => {
    // Render the about page
    res.render("about", {
        title: "About",
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller that displays the FAQ page
const displayFAQPage = (req, res) => {
    // Render the FAQ page
    res.render("faq", {
        title: "FAQ",
        isLogged: Boolean(req.session.user_id),
    });
};

module.exports = {
    displayMainPage,
    displayAboutPage,
    displayFAQPage,
};