exports.getWeather = function(req, res) {
    console.log("Get Weather page")
    res.render('home', {
        pageTitle: 'Weather | Weather App'
    });
}

exports.getFavorites = function(req, res) {
    console.log("Get Favorites page")
    res.render('favorites', {
        pageTitle: 'Favorites | Weather App'
    });
}