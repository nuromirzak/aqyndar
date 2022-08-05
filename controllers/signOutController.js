// Controller that handles the sign-out process
const signOut = (req, res, next) => {
    // Remove the user from the session
    req.session.destroy();
    res.redirect("/");
};

module.exports = {
    signOut,
};