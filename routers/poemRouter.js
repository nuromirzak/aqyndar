const express = require('express');
const poemController = require('../controllers/poemController');
const helpers = require("../helpers");
const router = express.Router();

router.get('/', poemController.displayAllPoems);

router.get('/new', helpers.isAuth, poemController.displayAddPoem);
router.get('/edit', helpers.isAuth, poemController.displayEditPoem);
router.post('/new', helpers.isAuth, poemController.savePoem);
router.get('/like', helpers.isAuth, poemController.likePoem);

router.get('/delete', helpers.isAuth, poemController.deletePoem);

router.get('/:id', poemController.displayPoem);

module.exports = router;