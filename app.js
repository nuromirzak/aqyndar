const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
const morgan = require('morgan');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const config = require("./config");
const signUpRouter = require("./routers/signUpRouter");
const signInRouter = require("./routers/signInRouter");
const authorRouter = require("./routers/authorRouter");
const poemRouter = require("./routers/poemRouter");
const remainControllers = require("./controllers/remainControllers");
const signOutController = require("./controllers/signOutController");
const annotationRouter = require("./routers/annotationRouter");
const profileRouter = require("./routers/profileRouter");
const helpers = require("./helpers");

app.use("/static", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log(`Connected to MongoDB ${result.connection.host}`))
    .catch((err) => console.log(err));

app.use(session(config.sessionConfig));

app.use(morgan('dev'));
app.use(flash());

app.get("/", remainControllers.displayMainPage);

app.get("/sign_out", helpers.isAuth, signOutController.signOut);

app.use('/profile', profileRouter);

app.use("/sign_up", signUpRouter);

app.use("/sign_in", signInRouter);

app.use("/authors", authorRouter);

app.use("/poems", poemRouter);

app.use("/annotations", annotationRouter);

// Only for development
app.get("/error", (req, res) => {
    console.log("Divide by zero error");

    const object = {};

    object.fly();

    console.log("No errors here");

    throw new Error("Custom error");
});

// Only for development
app.get('/yt', (req, res) => {
    res.render('yt-player');
});

// Error handling
app.use((err, req, res, next) => {
    console.log(err);

    const {status = 500, message = "Unknown error"} = err;

    res.status(status).render('error', {
        title: 'Қате',
        isLogged: Boolean(req.session.user_id),
        errorMessage: message,
        statusCode: status,
    });
});