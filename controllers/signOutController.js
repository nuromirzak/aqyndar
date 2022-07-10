const signOut = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

module.exports = {
    signOut,
};