const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const helpers = require("../helpers");

router.get('/', authorController.displayAllAuthors);

router.get('/new', helpers.isAuth, authorController.displayAddAuthorForm);
router.post('/new', helpers.isAuth, authorController.addAuthor);

router.get('/delete', helpers.isAuth, authorController.deleteAuthor);

module.exports = router;