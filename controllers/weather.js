const User = require('../models/users');
const request = require('request');
require('dotenv').config();

const APIKey = process.env.API_KEY;


exports.getWeather = function(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    } 
    console.log("Get Weather page")

    // display the user's ip address
    const user = req.session.user;
    const zipCode = user.home;
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        qs: {q: zipCode , days: '3'},
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': APIKey,
            useQueryString: true
    }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.parse(body));
        res.render('home', {
                pageTitle: 'Weather | Weather App',
                editing: false,
                user: req.session.user,
                isAuthenticated: req.session.isLoggedIn,
                body: JSON.parse(body)
            });
    });
    
}

exports.getFavorites = function(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    } 
    console.log("Get Favorites page")
    res.render('favorites', {
        pageTitle: 'Favorites | Weather App'
    });
}

exports.getPreferences = function(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    } 
    console.log("Get Preferences page")
    res.render('preferences', {
        pageTitle: 'Preferences | Weather App'
    });
}