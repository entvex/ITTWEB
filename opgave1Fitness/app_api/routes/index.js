var express = require('express');
var router = express.Router();
var ctrlWorkout = require('../controllers/workouts');

router.get('/workout', ctrlWorkout.workout);

module.exports = router;