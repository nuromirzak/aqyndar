const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const helpers = require("../helpers");
const cloudinaryConfig = require("../cloudinary_config");

router.get('/', authorController.displayAllAuthors);

router.get('/new', helpers.isAuth, authorController.displayAddAuthorForm);
router.get('/edit', helpers.isAuth, authorController.displayEditAuthorForm);
router.post('/new', helpers.isAuth, cloudinaryConfig.upload.single('profilepic'), authorController.saveAuthor);

router.get('/delete', helpers.isAuth, authorController.deleteAuthor);

router.get('/:id', authorController.displayAuthor);

module.exports = router;