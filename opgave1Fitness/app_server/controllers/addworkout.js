module.exports.addWorkout = function (req,res) {
    res.render('addworkout', { title: 'Add Workout' });
};

module.exports.addWorkoutWithParam = function (req,res) {
    var exercisesArray = new Array(Number(req.params.exerciseNumber));
    res.render('addworkout', { title: 'Add Workout',exercises: exercisesArray });
};