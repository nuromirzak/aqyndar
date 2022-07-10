const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const session = require('express-session');

const ejsMate = require('ejs-mate');

const app = express();
const port = process.env.PORT || 3000;

const {mongoURI, secretString} = require("./config");
const signUpRouter = require("./routers/signUpRouter");
const signInRouter = require("./routers/signInRouter");
const authorRouter = require("./routers/authorRouter");
const poemRouter = require("./routers/poemRouter");
const remainControllers = require("./controllers/remainControllers");
const signOutController = require("./controllers/signOutController");
const annotationRouter = require("./routers/annotationRouter");

app.use("/static", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log(`Connected to MongoDB ${result.connection.host}`))
    .catch((err) => console.log(err));

app.use(session({
    secret: secretString,
    resave: 'false',
    saveUninitialized: 'false',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // 2 week
    },
    store: MongoStore.create({
        mongoUrl: mongoURI
    }),
}));

app.get("/", remainControllers.displayMainPage);

app.get("/profile", remainControllers.displayProfile);

app.get("/sign_out", signOutController.signOut);

app.use("/sign_up", signUpRouter);

app.use("/sign_in", signInRouter);

app.use("/authors", authorRouter);

app.use("/poems", poemRouter);

app.use("/annotations", annotationRouter);