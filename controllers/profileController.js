const Annotation = require("../models/annotation");
const User = require("../models/user");
const moment = require("moment");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Poem = require("../models/poem");
const AppError = require("../AppError");

moment.locale('kk');

// Controller that displays the profile page
const displayProfile = async (req, res, next) => {
    let {page = "1"} = req.query;

    page = Number(page);

    if (page < 1 || Object.is(page, NaN)) {
        page = 1;
    }

    const limit = 5;

    // Paginate poems
    const poems = await Poem.find({}, null, {
        skip: (page - 1) * limit,
        limit: limit,
    });

    // Paginate annotations of the user
    const annotations = await Annotation.find({user_id: req.session.user_id}, null, {
        skip: (page - 1) * limit,
        limit: limit,
    });

    const annotationToTitle = new Map();

    // Add the author of each annotation to the annotation
    for (let i = 0; i < annotations.length; i++) {
        const annotation = annotations[i];

        let title;

        if (annotationToTitle.has(annotation.poem_id)) {
            title = annotationToTitle.get(annotation.poem_id);
        } else {
            const poem = await Poem.findById(annotation.poem_id);
            annotationToTitle.set(annotation.poem_id, poem.title);
            title = annotationToTitle.get(annotation.poem_id);
        }

        annotation.title = title;
    }

    let user = await User.findById(req.session.user_id);

    const formattedDate = moment(user.registrationDate).format("LLL");
    // change registrationDate to a formatted date
    user = {...user.toObject(), registrationDate: formattedDate};

    const update_info = req.flash("update_info");
    const sign_in = req.flash("sign_in");

    const count = await Annotation.countDocuments({user_id: req.session.user_id});

    // Render the profile page
    res.render("auth/profile", {
        title: "Жеке профиль",
        isLogged: Boolean(req.session.user_id),
        user: user,
        annotations: annotations,
        start: (page - 1) * limit + 1,
        page: page,
        numberOfPages: Math.ceil(count / limit),
        update_info: update_info[0],
        sign_in: sign_in[0],
    });
};

// Controller that displays the profile edit
const displayProfileEdit = async (req, res, next) => {
    // Find the user
    const user = await User.findById(req.session.user_id);

    // Render the profile edit page
    res.render("auth/profile_edit", {
        title: "Профильді өзгерту",
        isLogged: Boolean(req.session.user_id),
        user: user,
    });
};

// Controller that handles the profile edit process
const profileEdit = async (req, res, next) => {
    const {username, email} = req.body;

    if (!(username && email)) {
        next(new AppError("Міндетті торлар толтырылмаған", 400));
        return;
    }

    // Find the user
    const user = await User.findById(req.session.user_id);

    // Update the user
    user.username = username;
    user.email = email;

    // TODO: Implement if user didn't upload correct file
    const whitelist = [
        'image/png',
        'image/jpeg',
        'image/jpg',
    ];

    // Get a file from multer middleware
    const file = req.file;

    // If uploaded image is valid, set profilePicture to the url of the image
    if (file && whitelist.includes(file.mimetype)) {
        user.profilePicture = {
            url: file.path,
            filename: file.filename,
        };
    }

    // Save the user
    await user.save();
    req.flash("update_info", "Пайдаланушы сәтті өзгертілді");

    // Redirect to the profile page
    res.redirect("/profile");
};

// Controller that handles the password change process
const passwordChange = async (req, res, next) => {
    const {old_password, new_password_1, new_password_2} = req.body;

    if (!(old_password && new_password_1 && new_password_2)) {
        next(new AppError("Міндетті торлар толтырылмаған", 400));
        return;
    }

    // Find the user
    const user = await User.findById(req.session.user_id);

    // Check if old password is correct
    const isCorrect = await bcrypt.compare(old_password, user.password);

    // If the old password is incorrect, return an error
    if (!isCorrect) {
        next(new AppError("Пароль дұрыс емес", 400));
        return;
    }

    // Check if the new passwords match
    if (new_password_1 !== new_password_2) {
        next(new AppError("Жаңа парольдер сәйкес келмейді", 400));
        return;
    }

    // Update the user
    user.password = new_password_1;

    // Save the user
    user.save()
        .then((result) => {
            console.log('Пайдаланушы сәтті өзгертілді');
        }).catch((err) => {
            console.log(err);
        }
    );

    // Redirect to the profile page
    res.redirect("/profile");
};

// View another user's profile
const displayOthersProfile = async (req, res, next) => {
    const id = req.params.id;

    if (id === req.session.user_id) {
        res.redirect("/profile");
        return;
    }

    if (!mongoose.isValidObjectId(id)) {
        next(new AppError("Қате форматтағы id", 400));
        return;
    }

    // Find the user
    let user = await User.findById(id);

    const formattedDate = moment(user.registrationDate).format("LLL");
    // change registrationDate to a formatted date
    user = {...user.toObject(), registrationDate: formattedDate};

    res.render("auth/profile_others", {
        title: user.username,
        isLogged: Boolean(req.session.user_id),
        user: user,
    })
};

module.exports = {
    displayProfile,
    displayProfileEdit,
    profileEdit,
    passwordChange,
    displayOthersProfile,
};