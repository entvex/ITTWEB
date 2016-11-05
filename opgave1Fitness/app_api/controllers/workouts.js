var mongoose = require('mongoose');

//sendes a JSON response
var sendJSONresponse = function (res,status,content) {
    res.status(status);
    res.json(content);
}

module.exports.workout = function (req,res) {
    sendJSONresponse(res, 200, {"message": "I am alive!"});
}