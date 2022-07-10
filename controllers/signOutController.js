const signOut = (req, res) => {
    if (!req.session.user) {
        res.send("You must be logged in to sign out");
        return;
    }

    req.session.destroy();
    res.redirect("/");
};

module.exports = {
    signOut,
};