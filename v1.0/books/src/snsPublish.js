var AWS = require('./awsFactory').getAWS();

var sns = new AWS.SNS();

module.exports = function(message, topicArn, cb) {
  var params = {
    Message: JSON.stringify(message),
    TopicArn: topicArn
  };

  sns.publish(params, cb);
};
