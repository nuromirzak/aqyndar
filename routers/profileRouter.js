const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const multer = require("multer");
const storage = require("../cloudinary_config").storage;
const upload = multer({storage: storage});

router.get('/', profileController.displayProfile);
router.get('/edit', profileController.displayProfileEdit);

router.post('/edit', upload.single("profilepic"), profileController.profileEdit);

module.exports = router;