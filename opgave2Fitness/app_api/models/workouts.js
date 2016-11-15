var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    exerciseName: {type: String, require: true},
    exerciseDescription: String,
    sets: {type: Number,"default":1, min: 1,max: 10},
    reps: {type: Number,"default":1, min: 1,max: 60},
    repType: String
});

var workOutSchema = new mongoose.Schema({
    email: {type: String, require: true},
    workoutName: String,
    exercises: [exerciseSchema],
    finished: {type: Boolean,"default":false}
});

var dataModel = mongoose.model('Workouts', workOutSchema);