const User = require('../models/users');
const request = require('request');
require('dotenv').config();



const APIKey = process.env.API_KEY;


exports.getWeather = function (req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    


    const user = req.session.user;
    const zipCode = user.home;


    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        qs: {
            q: zipCode,
            days: '3'
        },
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': APIKey,
            useQueryString: true
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        User.findById(req.session.user._id)
        .then(user => {
            res.render('home', {
                pageTitle: 'Weather | Weather App',
                editing: false,
                user: user,
                isAuthenticated: req.session.isLoggedIn,
                body: JSON.parse(body)
            });
        })
    });

}

exports.getFavorites = function (req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    const favorites = req.session.user.favorites;
    User.findById(req.session.user._id)
        .then(user => {
            res.render('favorites', {
                pageTitle: 'Favorites | Weather App',
                editing: false,
                user: req.session.user,
                isAuthenticated: req.session.isLoggedIn,
                favorites: user.favorites
            });
        })
        .catch(err => console.log(err));
}

exports.getPreferences = function (req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    
    console.log("Get Preferences page")
    const message = "";
    User.findById(req.session.user._id)
        .then(user => {
            res.render('preferences', {
            pageTitle: 'Preferences | Weather App',
            user: user,
            message: message
            });
        })
}

exports.addZipCode = function (req, res) {
    console.log("posting zip code");
    const user = req.session.user;
    const zipcode = req.body.zipcode;
    //console log the users id that is in the newObjectid

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        qs: {
            q: zipcode,
            days: '3'
        },
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': APIKey,
            useQueryString: true
        }
    };
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            res.redirect('/weather/favorite');
        }
        console.log(JSON.parse(body));
        var cityName = JSON.parse(body).location.name;

        User.findById(user._id)
            .then(user => {
                console.log(user)
                user.addFavorite(zipcode, cityName);
                res.render('favorites', {
                    pageTitle: 'Favorites | Weather App',
                    editing: false,
                    user: req.session.user,
                    isAuthenticated: req.session.isLoggedIn,
                    favorites: user.favorites
                });
            })
            .catch(err => console.log(err));
    });
}

exports.getDetails = function (req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    const zipcode = req.params.zipcode;
    const user = req.session.user;
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        qs: {
            q: zipcode,
            days: '3'
        },
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': APIKey,
            useQueryString: true
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.parse(body));

        res.render('details', {
            pageTitle: 'Details | Weather App',
            editing: false,
            user: req.session.user,
            isAuthenticated: req.session.isLoggedIn,
            body: JSON.parse(body)
        });
    });
}