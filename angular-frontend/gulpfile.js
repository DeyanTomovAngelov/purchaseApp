// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    os = require('os'),
    connect = require('gulp-connect'),
    del = require('del'),
    minify = require('gulp-minify'),
    Server = require('karma').Server;


// Test task. Run test once and exit.
gulp.task('run-tests', function (done) {
    new Server({
        configFile:  __dirname +  '/karma.conf.js',
        singleRun: true
    }, done).start();
});


// Watch for file changes and re-run tests on each change.
gulp.task('tdd', function (done) {
    new Server({
        configFile:  __dirname +  '/karma.conf.js'
    }, done).start();
});


// Minify task
gulp.task('compress', function() {
  gulp.src('app/**/*.js')
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});


// Create a server
gulp.task('run', function() {
    gulp.src('app/index.html');
    connect.server();
});

connect.server({
    port: 8000
});

// Run the app in the browser
var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));


gulp.task('run-app', function(){
    gulp.src('app/index.html')
        .pipe(open({uri: 'http://localhost:8000/app/#/home/index'}));
});

// Styles
gulp.task('styles', function() {
    gulp.src('app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/controllers', 'dist/module', 'dist/services', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'watch');
});

// jshint task
gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/**/*.js', ['scripts']);

  // Watch .js files for jshint
  gulp.watch('app/**/*.js', ['jshint']);

  // Watch image files
  //gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen('localhost:8000');

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});
