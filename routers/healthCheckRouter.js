const express = require('express');
const router = express.Router();
const healthCheckController = require('../controllers/healthCheckController');

router.get('/db', healthCheckController.checkDBHealth);
router.get('/health', healthCheckController.checkHealth);
router.get('/az', healthCheckController.knowAZOfEC2);

module.exports = router;