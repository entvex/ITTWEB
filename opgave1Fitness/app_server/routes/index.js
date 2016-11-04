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
router.get('/trackworkout',ctrltrackWorkout.trackWorkout);

module.exports = router;
