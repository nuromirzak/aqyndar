const express = require('express');
const router = express.Router();
const annotationController = require('../controllers/annotationController');

router.get('/', annotationController.displayAllAnnotations);

router.get('/new', annotationController.displayAddAnnotation);

router.post('/new', annotationController.addAnnotation);

module.exports = router;