const User = require('../models/users');


exports.getLogin = (req, res, next) => {
    console.log("Get Login page")
    res.render('auth/login', {
        pageTitle: 'Login | Weather App'
    });
};

exports.getRegister = (req, res, next) => {
    console.log("Get register page")
    res.render('auth/register', {
        pageTitle: 'Register | Weather App'
    });
};