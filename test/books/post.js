var vows          = require('vows'),
    assert        = require('assert'),
    lambdaWrapper = require('lambda-wrapper');

var booksPostHandler = require('../../src/books/post/handler.js');
var handler = lambdaWrapper.wrap(booksPostHandler);

process.env.SERVERLESS_STAGE = 'unit-test';

module.exports = function(suite) {
  suite.addBatch({
    "post book": {
      topic: function() {
        handler.run({
          http_method: 'post',
        }, this.callback);
      },
      "runs": function (err, result) {
          assert.deepEqual(result, {
            stage: process.env.SERVERLESS_STAGE,
            app_version: 1,
            method: 'post',
            message: 'success'
          });
      }
    }
  });
}
