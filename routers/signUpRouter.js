const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');
const multer = require("multer");
const storage = require("../cloudinary_config").storage;
const upload = multer({storage: storage});

router.get('/', signUpController.displaySignUp);

router.post('/', upload.single("profilepic"), signUpController.signUp);

module.exports = router;