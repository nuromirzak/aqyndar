const express = require('express');
const poemController = require('../controllers/poemController');
const helpers = require("../helpers");
const router = express.Router();

router.get('/', poemController.displayAllPoems);

router.get('/new', helpers.isAuth, poemController.displayAddPoem);
router.post('/new', helpers.isAuth, poemController.savePoem);

router.get('/delete', helpers.isAuth, poemController.deletePoem);

router.get('/:id', poemController.displayPoem);

module.exports = router;