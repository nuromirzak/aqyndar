const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');
const multer = require("multer");
const storage = require("../cloudinary_config").storage;

router.get('/', signUpController.displaySignUp);

const upload = multer({storage: storage});
router.post('/', upload.single("profilepic"), signUpController.signUp);

module.exports = router;