var passport = require('passport');
var jsonHelper = require('../util/jsonHelper');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.newUser = function (req,res) {
    if (!req.body.email || !req.body.passwrod ) {
        jsonHelper.sendJsonResponse(res,400, "You need a username and a password" );
        return;
    }

    var user = new User();

    user.name     = req.body.name;
    user.setPassword(req.body.password); // hash & salt

    user.save(function (err) {
        var token;
        if (err)
        {
            jsonHelper.sendJSONresponse(res, 404, err);
        } else {
            user = user.generateJwt();
            jsonHelper.sendJsonResponse(res, 200, {"token" : token});
        }
    });
}

module.exports.login = function (req,res) {
    if (!req.body.email || !req.body.passwrod ) {
        jsonHelper.sendJsonResponse(res,400, "You need a username and a password" );
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;

        if (err) {
            jsonHelper.sendJsonResponse(res, 404, err);
            return;
        }

        if(user){
            token = user.generateJwt();
            jsonHelper.sendJsonResponse(res, 200, {"token" : token});
        } else {
            jsonHelper.sendJsonResponse(res, 401, info);
        }

    })(req, res);
};
