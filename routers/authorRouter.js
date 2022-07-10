const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.displayAllAuthors);

router.get('/new', authorController.displayAddAuthorForm);
router.post('/new', authorController.addAuthor);

router.get('/delete', authorController.deleteAuthor);

module.exports = router;