'use strict';

var publishToSns = require('./snsPublish');

function success(event, cb) {
  return cb(null, {
    stage: process.env.SERVERLESS_STAGE,
    app_version: 1,
    method: event.http_method,
    message: 'success'
  });
}

module.exports.get = function(event, context, cb) {
  return success(event, cb);
};

module.exports.put = function(event, context, cb) {
  return success(event, cb);
};

module.exports.post = function(event, context, cb) {
  var message = {
    type: 'added',
    name: event.body.name
  };

  publishToSns(message, process.env.WORKER_SNS_TOPIC_ARN, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return cb('Unexpected Error')
    } else {
      return success(event, cb);
    }
  });
};

module.exports.delete = function(event, context, cb) {
  return success(event, cb);
};
