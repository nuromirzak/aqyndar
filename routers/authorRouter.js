const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const helpers = require("../helpers");

router.get('/', authorController.displayAllAuthors);

router.get('/new', helpers.isAuth, authorController.displayAddAuthorForm);
router.get('/edit', helpers.isAuth, authorController.displayEditAuthorForm);
router.post('/new', helpers.isAuth, authorController.saveAuthor);

router.get('/delete', helpers.isAuth, authorController.deleteAuthor);

module.exports = router;