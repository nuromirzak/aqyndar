const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_DB;

const secretString = "apple_orange_lemon";

const defaultProfilePicture = {
    url: "https://res.cloudinary.com/de7j5tens/image/upload/v1657535099/zerdeleu-images/893_ybnxhy.png",
    filename: "zerdeleu-images/893_ybnxhy.png",
};

module.exports = {
    mongoURI,
    secretString,
    defaultProfilePicture,
}