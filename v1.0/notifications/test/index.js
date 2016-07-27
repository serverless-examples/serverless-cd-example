var vows          = require('vows'),
    assert        = require('assert'),
    lambdaWrapper = require('lambda-wrapper');

var booksHandler = require('../src/books.js');
var handler = lambdaWrapper.wrap(booksHandler);

var suite = vows.describe('Notifications')

suite.addBatch({
  "on notification": {
    topic: function() {
      handler.run({}, this.callback);
    },
    "runs": function (err, result) {
      assert.deepEqual(result, {
        message: 'success'
      });
    }
  }
});

module.exports.books = suite;
