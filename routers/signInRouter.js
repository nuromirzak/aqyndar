const express = require('express');
const router = express.Router();
const signInController = require("../controllers/signInController");

router.get('/', signInController.displaySignIn);

router.post('/', signInController.signIn);

module.exports = router;