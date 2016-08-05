'use strict';

module.exports.handler = function(event, context, cb) {
  console.log('Received sns message', event);

  return cb(null, { message: 'success' });
};
