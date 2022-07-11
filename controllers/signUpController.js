const User = require("../models/user");
const {defaultProfilePicture} = require("../config");

const displaySignUp = (req, res) => {
    if (req.session.user) {
        res.redirect("/profile");
        return;
    }

    res.render('sign_up', {
        title: 'Sign Up',
        isLogged: Boolean(req.session.user),
    });
};

const signUp = (req, res) => {
    const {username, password, email, role} = req.body;

    if (!(username && password && email && role)) {
        res.status(400).send("Missing required fields");
        return;
    }

    const file = req.file;

    let profilePicture;

    if (file) {
        profilePicture = {
            url: file.path,
            filename: file.filename,
        };
    } else {
        profilePicture = defaultProfilePicture;
    }

    const user = new User({
        username,
        password,
        email,
        role,
        iqNumber: 0,
        registrationDate: Date.now(),
        annotations: [],
        profilePicture,
    });

    user.save()
        .then((result) => {
            console.log(result);
            res.redirect("/sign_in");
        }).catch((err) => {
            console.log(err);
            res.redirect("/sign_up");
        }
    );
};

module.exports = {
    displaySignUp,
    signUp,
};