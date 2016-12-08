var mongoose = require('mongoose');
var dbURI    = 'mongodb://localhost/opgave1Fitness';
mongoose.Promise = global.Promise; // added to fix DeprecationWarning
mongoose.connect(dbURI);

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// for Heroku shutdown
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

//load the schma and models
require('./workouts');