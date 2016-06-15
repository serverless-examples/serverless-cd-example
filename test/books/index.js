var vows = require('vows');

var suite = vows.describe('Books Get')

process.env.IS_UNIT_TEST = true;
process.env.SERVERLESS_STAGE = 'unit-test';

require('./get')(suite);
require('./post')(suite);
require('./put')(suite);
require('./delete')(suite);

module.exports.books = suite;
