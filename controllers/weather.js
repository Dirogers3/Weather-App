exports.getWeather = function(req, res) {
    console.log("Get Weather page")
    res.render('home', {
        pageTitle: 'Weather | Weather App'
    });
}