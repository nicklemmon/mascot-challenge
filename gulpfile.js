'use strict';

//////////////////////////
//== Requiring things ==//
//////////////////////////

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    imageMin = require('gulp-imagemin'),
    svgo = require('gulp-svgo'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concatJS = require('gulp-concat'),
    reload = browserSync.reload;

//== Variables
// Base paths
var base = {
  src: './src/',
  dist: './dist/',
  assets: 'assets/'
}

// Sub paths
var path = {
  styles: 'styles/',
  markup: 'markup/',
  js: 'scripts/',
  images: 'images/'
}

// Delete the output directory
gulp.task('clean', function() {
  return gulp.src('./dist/') // delete the output dir
    .pipe(clean());
});

// Sass task
gulp.task('styles', function() {
  return gulp.src('./src/assets/styles/styles.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe(gulp.dest(base.dist + path.styles))
});

// Minify images
gulp.task('images', function() {
  return gulp.src('./src/assets/images/*/')
    .pipe(imageMin())
    .pipe(svgo())
    .pipe(gulp.dest('./dist/images/'))
})

// Copy HTML to dist
gulp.task('fonts', function() {
  return gulp.src('./src/assets/fonts/*')
    .pipe(gulp.dest('./dist/fonts/'))
})

// Concat and uglify the scripts
gulp.task('scripts', function() {
  return gulp.src([
    './src/assets/scripts/1-vendor/*.js',
    './src/assets/scripts/2-base/*.js',
    './src/assets/scripts/3-modules/*.js',
    './src/assets/scripts/4-init/*.js'
  ])
    .pipe(concatJS('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'))
})

// Build some pages and such
gulp.task('markup', function() {
  return gulp.src([
    base.src + path.markup + '**/!(_)*.pug' // all pug files are compiled, except those beginning with an '_'
  ])
    .pipe(pug())
    .pipe(gulp.dest(base.dist))
})

// BrowerSync stuff for a local server and cross-browser refreshing
gulp.task('browser-sync', function() {
  browserSync({
    server: base.dist,
    port: 1986
  })
})

//== Run These!
gulp.task('default', ['clean'], function() {
  return runSequence('markup', 'styles', 'images', 'fonts', 'scripts', 'browser-sync', 'watch');
});

gulp.task('watch', function(){
  gulp.watch('./src/assets/styles/**/*.scss', ['styles', browserSync.reload]);
  gulp.watch('./src/assets/scripts/**/*.js', ['scripts', browserSync.reload]);
  gulp.watch('./src/layouts/**/*.pug', ['pug', browserSync.reload]);
  gulp.watch('./src/markup/**/*.pug', ['markup', browserSync.reload]);
});
