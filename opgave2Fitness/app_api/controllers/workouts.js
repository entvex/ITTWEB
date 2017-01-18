var mongoose = require('mongoose');
var jsonHelper = require('../util/jsonHelper');
require('../models/db');
var dataModel = mongoose.model('Workouts');

module.exports.getWorkouts = function (req, res) {
    console.log('Getting data from web api');
    console.log(req.params.email);

    if( req.params.email )
    {
        dataModel.find( {email: req.params.email} ).exec(function (err, data) {
            if (err) {
                jsonHelper.sendJsonResponse(res, 400, err);
            }
            else {
                // 200 OK Standard response for successful HTTP requests
                jsonHelper.sendJsonResponse(res,200,data);
            }
        });
    }
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
                // 204 No Content The server successfully processed the request and is not returning any content.
                jsonHelper.sendJsonResponse(res,204,"");
            }
        });
    }
};

module.exports.postWorkout = function (req,res) {
    console.log("posting data");

    if ( (!isNaN(parseFloat(req.params.exerciseNumber)) && isFinite(req.params.exerciseNumber))  && req.body.workoutName && req.body.email)
    {
        var exercisesArray = [];

        for (var i = 0; i < Number(req.params.exerciseNumber);i++ )
        {
            var exerciseItem = {
                exerciseName: req.body['ExerciseName' + i],
                exerciseDescription: req.body['Description' + i],
                sets: req.body['numberOfSets' + i],
                reps: req.body['numberOfReps' + i],
                repType: req.body['repType' + i]
            };
            exercisesArray.push(exerciseItem);
        }
        console.log(exercisesArray);

        var workoutItem = {
            email: req.body.email,
            workoutName: req.body.workoutName,
            exercises: exercisesArray
        };

        var data = dataModel(workoutItem);
        data.save(function (err) {
            if (err)
            {
                jsonHelper.sendJsonResponse(res, 400, err);
            } else {
                // HTTP 201 Created The request has been fulfilled, resulting in the creation of a new resource.
                jsonHelper.sendJsonResponse(res, 201, "");
            }
        });
    }
    else
    {
        jsonHelper.sendJsonResponse(res, 400, {message : "Some of the posted data is missing"});
    }
};