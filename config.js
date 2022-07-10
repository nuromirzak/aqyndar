require('dotenv').config()

const mongoURI = process.env.MONGO_DB;

const secretString = "apple_orange_lemon";

module.exports = {
    mongoURI,
    secretString
}