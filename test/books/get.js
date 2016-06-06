var vows          = require('vows'),
    assert        = require('assert'),
    lambdaWrapper = require('lambda-wrapper');

var booksGetHandler = require('../../src/books/get/handler.js');
var handler = lambdaWrapper.wrap(booksGetHandler);

module.exports = vows.describe('The Good Things').addBatch({
  "get book": {
    topic: function() {
      handler.run({}, this.callback);
    },
    "runs": function (err, result) {
        assert.deepEqual(result, {
          message: 'success'
        });
    }
  }
})
