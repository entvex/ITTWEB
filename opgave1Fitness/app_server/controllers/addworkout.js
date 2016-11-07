var mongoose = require('mongoose');
var dataModel = mongoose.model('Workouts');

module.exports.addWorkout = function (req,res) {
    res.render('addworkout', { title: 'Add Workout' });
};

module.exports.addWorkoutWithParam = function (req,res) {
    var exercisesArray = new Array(Number(req.params.exerciseNumber));

    for (var i = 0; i < Number(req.params.exerciseNumber);i++ )
    {
        exercisesArray[i] = i;
    }
    res.render('addworkout', { title: 'Add Workout',exercises: exercisesArray });
};

module.exports.postWorkout = function (req,res) {
    console.log("posting data");
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
    data.save();

    res.redirect("/");
};