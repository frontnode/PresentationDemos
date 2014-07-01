var gulp = require('gulp');
var pkg = require('./package.json');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var spawn = require('child_process').spawn;

var scriptFiles = './src/**/*.js';

gulp.task('compile', function(){
  // concat all scripts, uglify, and output
  gulp.src(scriptFiles)
    .pipe(concat({fileName: pkg.name+".js"})
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('test', function(){
  // lint our scripts
  gulp.src(scriptFiles).pipe(jshint());

  // run our tests
  spawn('npm', ['test'], {stdio: 'inherit'});
});

gulp.task('default', function(){
  gulp.run('test', 'compile');
  gulp.watch(scriptFiles, function(){
    gulp.run('test', 'compile');
  });
});
