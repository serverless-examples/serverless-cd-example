'use strict';

module.exports.handler = function(event, context, cb) {
  return cb(null, {
    stage: process.env.SERVERLESS_STAGE,
    app_version: 1,
    method: event.http_method,
    message: 'success'
  });
};
