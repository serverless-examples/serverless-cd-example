var vows          = require('vows'),
    assert        = require('assert'),
    lambdaWrapper = require('lambda-wrapper');

var booksDeleteHandler = require('../src/books.js');
var handler = lambdaWrapper.wrap(booksDeleteHandler);

module.exports = function(suite) {
  suite.addBatch({
    "delete book": {
      topic: function() {
        handler.run({
          http_method: 'delete',
        }, this.callback);
      },
      "runs": function (err, result) {
          assert.deepEqual(result, {
            stage: process.env.SERVERLESS_STAGE,
            app_version: 1,
            method: 'delete',
            message: 'success'
          });
      }
    }
  });
}
