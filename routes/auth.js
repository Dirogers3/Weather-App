const express = require('express');

const router = express.Router();

const authController = require('../controllers/users');

router.get('/register', authController.getRegister);

router.get('/', authController.getLogin);


module.exports = router;