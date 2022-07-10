const express = require('express');
const router = express.Router();
const annotationController = require('../controllers/annotationController');
const helpers = require('../helpers');

router.get('/', annotationController.displayAllAnnotations);

router.get('/new', helpers.isAuth, annotationController.displayAddAnnotation);

router.post('/new', helpers.isAuth, annotationController.addAnnotation);

module.exports = router;