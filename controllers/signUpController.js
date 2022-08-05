const bcrypt = require('bcrypt');
const User = require("../models/user");
const config = require("../config");
const AppError = require("../AppError");

// Controller that displays the sign-up page
const displaySignUp = (req, res, next) => {
    // If user is already logged in, redirect to profile page
    if (req.session.user_id) {
        res.redirect("/profile");
        return;
    }

    res.render('auth/sign_up', {
        title: 'Регистрация',
        isLogged: Boolean(req.session.user_id),
    });
};

// Controller that handles the sign-up process
const signUp = async (req, res, next) => {
    const {username, password, email, role = "user"} = req.body;

    if (!(username && password && role)) {
        next(new AppError("Міндетті торлар толтырылмаған", 400));
        return;
    }

    const isFoundUser = await User.findOne({username: username});

    if (isFoundUser) {
        next(new AppError("Бұл пайдаланущы аты бос емес", 400));
        return;
    }

    // TODO: Implement if user didn't upload correct file
    const whitelist = [
        'image/png',
        'image/jpeg',
        'image/jpg',
    ];

    // Get a file from multer middleware
    const file = req.file;

    let profilePicture;

    // If uploaded image is valid, set profilePicture to the url of the image
    if (file && whitelist.includes(file.mimetype)) {
        profilePicture = {
            url: file.path,
            filename: file.filename,
        };
    } else {
        // If user didn't upload file, use default profile picture
        profilePicture = config.defaultProfilePicture;
    }

    // Create a new user
    const user = new User({
        username: username,
        password: password,
        profilePicture: profilePicture,
        email: email,
        role: role,
        iqNumber: 0,
        registrationDate: Date.now(),
    });

    await user.save();
    console.log('Пайдаланушы сәтті құрылды');
    req.flash("create_info", "Пайдаланушы сәтті құрылды");

    // Redirect to the sign-in page
    res.redirect("/sign_in");
};

module.exports = {
    displaySignUp,
    signUp,
};