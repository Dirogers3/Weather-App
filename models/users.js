const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    home: {
        type: String,
        required: true
    },
    favorites: {
        type: [{zipcode: String, cityName: String}],
    }

    });

    //Register the User
    usersSchema.methods.createUser = function(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.home = user.home;
        this.password = user.password;

        return this.save();
    };

    usersSchema.methods.addFavorite = function(zipcode, cityName) {
        this.favorites.push({'zipcode': zipcode, 'cityName': cityName});
        return this.save();
    }


module.exports = mongoose.model('User', usersSchema);