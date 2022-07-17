const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');

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

app.get("/", remainControllers.displayMainPage);

app.get("/profile", helpers.isAuth, remainControllers.displayProfile);

app.get("/sign_out", helpers.isAuth, signOutController.signOut);

app.use("/sign_up", signUpRouter);

app.use("/sign_in", signInRouter);

app.use("/authors", authorRouter);

app.use("/poems", poemRouter);

app.use("/annotations", annotationRouter);