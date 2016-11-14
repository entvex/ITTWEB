var express = require('express');
var router = express.Router();
let jwt = require('express-jwt');
var auth = jwt({secret : "safe",userProperty : 'payload'});
var ctrlWorkout   = require('../controllers/workouts');
var ctrlAuthentication = require('../controllers/authentication');

//// Workouts
//Get all workouts
router.get('/workouts',auth,ctrlWorkout.getWorkouts);

//adds a workout
router.post('/workouts/:exerciseNumber',auth,ctrlWorkout.postWorkout);

// Updates a workout to be completed.
router.patch('/workouts/:workoutName',auth,ctrlWorkout.pathWorkout);

// Users
router.post('/newuser', ctrlAuthentication.newUser);
router.post('/login'  , ctrlAuthentication.login);

module.exports = router;