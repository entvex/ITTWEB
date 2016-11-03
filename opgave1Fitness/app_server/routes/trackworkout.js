var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('trackworkout', { title: 'Track Workout' });
});

module.exports = router;