var vows          = require('vows'),
    assert        = require('assert'),
    lambdaWrapper = require('lambda-wrapper');

var booksPutHandler = require('../../src/books/put/handler.js');
var handler = lambdaWrapper.wrap(booksPutHandler);

process.env.SERVERLESS_STAGE = 'unit-test';

module.exports = function(suite) {
  suite.addBatch({
    "put book": {
      topic: function() {
        handler.run({
          http_method: 'put',
        }, this.callback);
      },
      "runs": function (err, result) {
          assert.deepEqual(result, {
            stage: process.env.SERVERLESS_STAGE,
            app_version: 1,
            method: 'put',
            message: 'success'
          });
      }
    }
  });
}
