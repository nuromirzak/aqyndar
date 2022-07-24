const MongoStore = require("connect-mongo");
const mongoURI = process.env.MONGO_DB;

const secretString = "apple_orange_lemon";

const defaultProfilePicture = {
    url: "https://res.cloudinary.com/de7j5tens/image/upload/v1658582156/aqyndar-images/jack-dong-yJozLVBxNA0-unsplash_goqmha.jpg",
    filename: "aqyndar-images/jack-dong-yJozLVBxNA0-unsplash_goqmha.jpg",
};

const defaultAuthorProfilePicture = {
    url: "https://res.cloudinary.com/de7j5tens/image/upload/v1658584534/aqyndar-images/louis-hansel-MardkT836BU-unsplash_rakjde.jpg",
    filename: "aqyndar-images/louis-hansel-MardkT836BU-unsplash_rakjde.jpg",
};

const saltRounds = 10;

const sessionConfig = {
    secret: secretString,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
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