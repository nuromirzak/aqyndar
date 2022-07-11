const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUpController');
const multer = require("multer");
const {storageConfig} = require("../config");

router.get('/', signUpController.displaySignUp);

const upload = multer({storage: storageConfig});
router.post('/', upload.single("profilepic"), signUpController.signUp);

module.exports = router;