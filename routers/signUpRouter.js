const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');

router.get('/', signUpController.displaySignUp);

router.post('/', signUpController.signUp);

module.exports = router;