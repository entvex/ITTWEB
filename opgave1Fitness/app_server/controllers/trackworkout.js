var mongoose = require('mongoose');
require('../models/db');
var dataModel = mongoose.model('Workouts');

module.exports.trackWorkout = function (req, res) {
    console.log('getting data');
    dataModel.find()
        .then(function (doc) {
            res.render('trackworkout', { title: 'Track Workout',workouts: doc  });
        });
};