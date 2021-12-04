const express = require('express');

const router = express.Router();

const authController = require('../controllers/users');

router.get('/register', authController.getRegister);

router.post('/postRegistration', authController.postRegistration);

router.get('/login', authController.getLogin);

router.post('/postLogin', authController.postLogin);

router.post('/logout', authController.postLogout);


module.exports = router;