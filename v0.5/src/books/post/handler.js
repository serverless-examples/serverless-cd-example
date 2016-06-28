'use strict';

var publishToSns = require('./snsPublish');

module.exports.handler = function(event, context, cb) {
  var message = {
    type: 'added',
    name: event.body.name
  };

  publishToSns(message, process.env.WORKER_SNS_TOPIC_ARN, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return cb('Unexpected Error')
    } else {
      return cb(null, {
        stage: process.env.SERVERLESS_STAGE,
        app_version: 1,
        method: event.http_method,
        message: 'success'
      });
    }
  });
};
