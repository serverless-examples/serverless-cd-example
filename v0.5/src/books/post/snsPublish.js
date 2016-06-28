var AWS = require('aws-sdk');
var sns = new AWS.SNS();

if(process.env.IS_UNIT_TEST === 'true') {
  module.exports = function(message, topicArn, cb) {
    cb(null, {});
  };

} else {
  module.exports = function(message, topicArn, cb) {
    var params = {
      Message: JSON.stringify(message),
      TopicArn: topicArn
    };

    sns.publish(params, cb);
  };
}
