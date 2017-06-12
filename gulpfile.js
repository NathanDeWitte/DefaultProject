'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  scripts: 'js/**/*.js',
  sass: 'sass/**/*.scss'
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/min'));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
