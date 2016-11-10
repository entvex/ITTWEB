var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err)
            {
                return done(err);
            }

            //Check if the user name exists
            if (!user) {
                return done(null, false, {message: 'Wrong username.'});
            }

            //Checks the user for a valid password
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Wrong username.'});
            }

            return done(null, user);
        });
    }
));