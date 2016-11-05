var mongoose = require('mongoose');

var workOutSchema = new mongoose.Schema({
    exerciseName: {type: String, require: true},
    exerciseDescription: String,
    sets: {type: Number,"default":1, min: 1,max: 10},
    reps: {type: Number,"default":1, min: 1,max: 60},
    repType: String
});

mongoose.model('Workouts', workOutSchema);