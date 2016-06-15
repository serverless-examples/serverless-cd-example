'use strict';


module.exports.handler = function(event, context, cb) {
  var message = {
    type: 'added',
    name: event.body.name
  };

  var params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.WORKER_SNS_TOPIC_ARN
  };

  sns.publish(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return context.fail('Unexpected Error')
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
