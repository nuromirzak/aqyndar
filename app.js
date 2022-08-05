const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
const morgan = require('morgan');
const flash = require('connect-flash');
const cors = require('cors');

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
const AppError = require("./AppError");
const User = require("./models/user");
const Annotation = require("./models/annotation");
const Poem = require("./models/poem");
const Author = require("./models/author");

// Enabled to fetch requests /api/statistics
// But involves some security issues ???
app.use(cors({
    origin: [`http://localhost:${port}`, `http://aqyndar.herokuapp.com`],
}));

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

app.get("/about", remainControllers.displayAboutPage);

app.get('/faq', remainControllers.displayFAQPage);

app.get("/sign_out", helpers.isAuth, signOutController.signOut);

app.use('/profile', profileRouter);

app.use("/sign_up", signUpRouter);

app.use("/sign_in", signInRouter);

app.use("/authors", authorRouter);

app.use("/poems", poemRouter);

app.use("/annotations", annotationRouter);

app.get('/api/statistics', async (req, res, next) => {
    const authorsNum = await Author.countDocuments();
    const poems = await Poem.find({});

    let linesNum = 0;

    poems.forEach(poem => {
        const lines = poem.poem.split("\r\n");
        linesNum += lines.length;
    });

    const annotationsNum = await Annotation.countDocuments();
    const usersNum = await User.countDocuments();

    const statistics = {
        authorsNum: authorsNum,
        poemsNum: poems.length,
        linesNum: linesNum,
        annotationsNum: annotationsNum,
        usersNum: usersNum
    };

    // get the response as json

    res.json(statistics);
});

app.get('/favicon.ico', (req, res, next) => res.status(204));

// Only for development
app.get("/error", (req, res, next) => {
    console.log("Starting /error route");

    const object = {};

    object.fly();

    console.log('Ending /error route');

    res.send("No errors here");
});

// Not found handler
app.use((req, res, next) => {
    const err = new AppError(`Бұл веб-парақша ескірген, яғни жойылған немесе мүлдем болмаған.`, 404);

    next(err);
});

// Error handling
app.use((err, req, res, next) => {
    if (!err instanceof AppError) {
        console.log(err);
    }

    const {status = 500, message = "Күтпеген қате. 211393@astanait.edu.kz-ге хабарласыңыз."} = err;

    res.status(status).render('error', {
        title: 'Қате',
        isLogged: Boolean(req.session.user_id),
        errorMessage: message,
        statusCode: status,
    });
});