const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');
const cloudinaryConfig = require("../cloudinary_config");

router.get('/', signUpController.displaySignUp);

router.post('/', cloudinaryConfig.upload.single("profilepic"), signUpController.signUp);

module.exports = router;