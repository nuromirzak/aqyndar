const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const multer = require("multer");
const storage = require("../cloudinary_config").storage;
const upload = multer({storage: storage});
const helpers = require("../helpers");

router.get('/', helpers.isAuth, profileController.displayProfile);
router.get('/edit', helpers.isAuth, profileController.displayProfileEdit);

router.post('/edit', helpers.isAuth, upload.single("profilepic"), profileController.profileEdit);
router.post('/edit_password', helpers.isAuth, profileController.passwordChange);

module.exports = router;