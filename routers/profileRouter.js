const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const cloudinaryConfig = require("../cloudinary_config");
const helpers = require("../helpers");

router.get('/', helpers.isAuth, profileController.displayProfile);
router.get('/edit', helpers.isAuth, profileController.displayProfileEdit);

router.post('/edit', helpers.isAuth, cloudinaryConfig.upload.single("profilepic"), profileController.profileEdit);
router.post('/edit_password', helpers.isAuth, profileController.passwordChange);

router.get('/id/:id', profileController.displayOthersProfile);

module.exports = router;