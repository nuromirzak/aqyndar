const MongoStore = require("connect-mongo");
const mongoURI = process.env.MONGO_DB;

const secretString = "apple_orange_lemon";

const defaultProfilePicture = {
    url: "https://res.cloudinary.com/de7j5tens/image/upload/v1657535099/zerdeleu-images/893_ybnxhy.png",
    filename: "zerdeleu-images/893_ybnxhy.png",
};

const defaultAuthorProfilePicture = {
    url: "https://res.cloudinary.com/de7j5tens/image/upload/v1658117471/zerdeleu-images/9717_large_letr1i.jpg",
    filename: "zerdeleu-images/9717_large_letr1i.jpg",
};

const saltRounds = 10;

const sessionConfig = {
    secret: secretString,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // 2 week
    },
    store: MongoStore.create({
        mongoUrl: mongoURI
    }),
};

module.exports = {
    mongoURI,
    secretString,
    defaultProfilePicture,
    defaultAuthorProfilePicture,
    saltRounds,
    sessionConfig,
}