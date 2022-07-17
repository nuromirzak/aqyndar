// Controller that displays the main page
const displayMainPage = (req, res) => {
    // Render the main page
    res.render("home", {
        title: "Home",
        isLogged: Boolean(req.session.user_id),
    });
};

module.exports = {
    displayMainPage,
};