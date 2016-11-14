var mongoose = require('mongoose');
var dbURI    = 'mongodb://baggerfisk:baggerfisk@ds149557.mlab.com:49557/powerprogress';
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


//Load the schemas
require('./workouts');
require('./users');