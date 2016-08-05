var vows = require('vows');

var suite = vows.describe('Books Get')

require('./get')(suite);
require('./post')(suite);
require('./put')(suite);
require('./delete')(suite);

module.exports.books = suite;
