'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./client.prod.js');
} else {
  module.exports = require('./client.dev.js');
}
