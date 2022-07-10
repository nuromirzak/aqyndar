const express = require('express');
const poemController = require('../controllers/poemController');
const router = express.Router();

router.get('/', poemController.displayAllPoems);
router.get('/:id', poemController.displayPoem);

router.get('/new', poemController.displayAddPoem);
router.post('/new', poemController.savePoem);

router.get('/delete', poemController.deletePoem);

module.exports = router;