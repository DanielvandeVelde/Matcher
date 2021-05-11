const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController.js");

router.get('/', auth.home);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

router.get('/login', auth.login);
router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);

router.get('/profile/:username', auth.profile);
router.post('/profile/:username', auth.updateProfile)

module.exports = router;