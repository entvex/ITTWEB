var mongoose = require('mongoose');
require('../models/db');
var dataModel = mongoose.model('Workouts');

module.exports.trackWorkout = function (req, res) {
    console.log('getting data');
    mongoose.model('Workouts').find()
        .then(function (doc) {
            console.log(doc);
            res.render('trackworkout', { title: 'Track Workout',workouts: doc  });
        });
};

module.exports.postTrackworkout = function (req,res) {
    console.log(req.params.workoutName);
    console.log("editing");

    dataModel.findOneAndUpdate({workoutName: req.params.workoutName}, { finished: true }, function(err, data) {
        if (err) throw err;

        console.log(data);
        res.redirect('/trackworkout')
    });
};