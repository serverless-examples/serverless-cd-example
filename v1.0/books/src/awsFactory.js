
var AWS = null;
var mockAWS = null;

module.exports.getAWS = function() {
  console.log('Checking is unit test: ', process.env.IS_UNIT_TEST)
  if(process.env.IS_UNIT_TEST) {
    if(!mockAWS) mockAWS = require('mock-aws');

    console.log('Returning mock AWS SDK');
    mockAWS.mock('SNS', 'publish', {});
    return mockAWS;
  }

  if(!AWS) AWS = require('aws-sdk');

  return AWS;
}
