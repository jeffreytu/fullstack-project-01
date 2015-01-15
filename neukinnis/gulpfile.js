/* global casper */

var gulp = require('gulp');
var casperJs = require('gulp-casperjs');
var run = require ('gulp-run');
var server = require('gulp-develop-server');
var gulpSequence = require('gulp-sequence');
//var jasmine = require('gulp-jasmine');


// Starts server for tasks that require a server
gulp.task('server:start', function(cb){
  server.listen({path: '.', delay: 3000}, cb);
});

// Stops server after tasks have run
gulp.task('server:stop', function(cb){
  server.kill();
});


// Runs integration tests with casperjs and phantomjs
gulp.task('test:integration', function (cb) {
  console.log('running integration tests');

  var integrationTestGlob = './spec/integration/**';

  gulp.src(integrationTestGlob)
    .pipe(casperJs({command:'test'}))
    .on('data', function(){})
    .on('end', cb)
    .on('error', cb);

});

// Runs api tests with frisbyjs and jasmine-node
gulp.task('test:api', function (cb) {
  console.log('running api tests');

  var apiTestDir = 'spec/api/';

  gulp.src(apiTestDir)
    .pipe(run('jasmine-node ' + apiTestDir))
      .on('data', function(){})
      .on('end', cb)
      .on('error', cb);

});

gulp.task('test:all',
  gulpSequence('server:start', 'test:api', 'test:integration', 'server:stop'));

