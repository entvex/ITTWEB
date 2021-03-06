var express = require('express');
var router = express.Router();

var ctrlAddWorkout   = require('../controllers/addworkout');
var ctrltrackWorkout = require('../controllers/trackworkout');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addworkout',ctrlAddWorkout.addWorkout);
router.get('/addworkout/:exerciseNumber',ctrlAddWorkout.addWorkoutWithParam);

router.post('/addworkout/post/:exerciseNumber',ctrlAddWorkout.postWorkout);

router.get('/trackworkout',ctrltrackWorkout.trackWorkout);
router.post('/trackworkout/post/:workoutName',ctrltrackWorkout.postTrackworkout);

module.exports = router;
