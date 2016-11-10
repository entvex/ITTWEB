var mongoose = require('mongoose');
var jsonHelper = require('../util/jsonHelper');
require('../models/db');
var dataModel = mongoose.model('Workouts');

module.exports.getWorkouts = function (req, res) {
    console.log('Getting data from web api');
    mongoose.model('Workouts').find().exec(function (err, data) {
        if (err) {
            jsonHelper.sendJsonResponse(res, 400, err);
        }
        else {
            jsonHelper.sendJsonResponse(res,200,data);
        }
    })
};

module.exports.pathWorkout = function (req,res) {
    console.log(req.params.workoutName);
    console.log("patching workout");

    if (req.params.workoutName) {
        dataModel.findOneAndUpdate({workoutName: req.params.workoutName}, { finished: true }, function(err, data) {
            if (err) {
                jsonHelper.sendJsonResponse(res, 400, err);
            }
            else {
                jsonHelper.sendJsonResponse(res,200,"");
            }
        });
    }
};

module.exports.postWorkout = function (req,res) {
    console.log("posting data");

    if (  req.params.exerciseNumber)
    {
        var exercisesArray = []

        for (var i = 0; i < Number(req.params.exerciseNumber);i++ )
        {
            var exerciseItem = {
                exerciseName: req.body['ExerciseName' + i],
                exerciseDescription: req.body['Description' + i],
                sets: req.body['numberOfSets' + i],
                reps: req.body['numberOfReps' + i],
                repType: req.body['repType' + i]
            }
            exercisesArray.push(exerciseItem);
        }
        console.log(exercisesArray);

        var workoutItem = {
            workoutName: req.body.workoutName,
            exercises: exercisesArray
        };

        var data = dataModel(workoutItem);
        dataModel.save(function () {
            if (err)
            {
                jsonHelper.sendJsonResponse(res, 404, err);
            } else {
                jsonHelper.sendJsonResponse(res, 200, "");
            }
        });
    }
};