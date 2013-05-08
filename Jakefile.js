/**
 * Jake is a JavaScript build tool for Node.js
 * http://howtonode.org/intro-to-jake
 * https://github.com/mde/jake
 *
 * To find out the available tasks for Jake run:
 * jake -T
 *
 * To run a task do:
 * jake db:reset
 *
 * To run a task with params do:
 * jake db:populate[20]
 */
var assetBuilder = require('./scripts/assetBuilder')
    , colors = require('colors')
    , log = console.log
    , ENV = process.env.NODE_ENV || 'development'
    , JK = {}

namespace('app', function() {

  desc('Compress JS & CSS and make 1 JS && 1 CSS file. Run this before deploying to production.');
  task('build', [], function(done) {
    assetBuilder(function() {
      log('- packed up JS & CSS files'.yellow);
      complete();
    });
  }, { async: true });

});
