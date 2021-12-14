const User = require('../models/users');
const bcrypt = require('bcrypt');

exports.getRegister = (req, res, next) => {
    console.log("Get register page")
    res.render('auth/register', {
        pageTitle: 'Register | Weather App',
         errorMessage: req.flash('error')
    });
};

exports.postRegistration = (req, res, next) => {
    console.log("Post registration page")
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const home = req.body.home;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
    .then(user => {
        if (user) {
            console.log("User already exists");
            req.flash('error', 'User already exists');
            return res.redirect('/auth/register');
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
        const user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            home: home,
            password: hashedPassword
        });
        return user.save();
        })
        .then(
            res.redirect('/auth/login')
        )
        .catch(err => {console.log(err)});
    })
    .catch(err => {console.log(err)});
};

    
exports.getLogin = (req, res, next) => {
    console.log("Get Login page")
    message = '';
    res.render('auth/login', {
        pageTitle: 'Login | Weather App',
    });
};


exports.postLogin = (req, res, next) => {
    console.log("Post Login page")
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log("User not found");
            const message ='User not found';
            return res.redirect('/auth/login');
        }
        return bcrypt
        .compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/weather/home');
                });
            }
            console.log("Password incorrect");
            req.flash('error', 'Password incorrect');
            return res.render('/auth/login', {
            });
        })
        .catch(err => {console.log(err)});
    })
    .catch(err => {console.log(err)});
}

exports.postLogout = (req, res, next) => {
    console.log("Post Logout page")
    message = "Logged out";
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/auth/login', {
            message: message
        });
    });
}

exports.editUser = (req, res, next) => {
    console.log("Edit user page")
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const id = req.body.id;


    User.findByIdAndUpdate(id, {
        firstname: firstname,
        lastname: lastname,
        email: email
    })

    .then(() => {
        console.log("user updated");
        const message = "User updated";
        User.findById(id)
            .then(user1 => {
            return res.render('preferences', {
                pageTitle: 'preferences | Weather App',
                user: user1,
                message: message
                });
            })
    })
    .catch(err => {console.log(err)});
     
}

exports.editPass  = (req, res, next) => {
    console.log("Update password page")
    const password = req.body.newPassword;
    const id = req.body.id;

    bcrypt
    .hash(password, 10)
    .then(hashedPassword => {
        User.findByIdAndUpdate(id, {
            password: hashedPassword
        })
        .then(() => {
            console.log("password updated");
            const message = "Password updated";

            return res.render('auth/login', {
            pageTitle: 'Login | Weather App',
            });

        })
        .catch(err => {console.log(err)});
    })
    .catch(err => {console.log(err)});
}