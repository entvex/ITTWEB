var express = require('express');
var router = express.Router();
var ctrlWorkout   = require('../controllers/workouts');
var ctrlAuthentication = require('../controllers/authentication');



//// Workouts
//Get all workouts
router.get('/workouts',ctrlWorkout.getWorkouts);

//adds a workout
router.post('/addworkout/:exerciseNumber',ctrlWorkout.postWorkout);

// Updates a workout to be completed.
router.patch('/workouts/:workoutName',ctrlWorkout.pathWorkout);

// Users
router.post('/newuser', ctrlAuthentication.newUser);
router.post('/login'  , ctrlAuthentication.login);

module.exports = router;