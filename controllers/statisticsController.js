const Author = require("../models/author");
const Poem = require("../models/poem");
const Annotation = require("../models/annotation");
const User = require("../models/user");
const getStatistics = async (req, res, next) => {
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
};

module.exports = {
    getStatistics
}