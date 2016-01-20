var gulp         = require('gulp'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rimraf       = require('gulp-rimraf'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gls          = require('gulp-live-server'),
    csso         = require('gulp-csso'),
    jade         = require('gulp-jade');

var jsFiles = [
  'src/js/**/*.js',
  'src/js/app.js'
];

var sassFiles = [
  'src/scss/**/*.scss'
];

var jadeFiles = [
  'src/jade/**/*.jade'
];

var distFiles = [
  'dist/**/*.*',
  'dist/'
];

var libsJsFiles = [
  'bower_components/angular/angular.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-aria/angular-aria.js',
  'bower_components/angular-jwt/dist/angular-jwt.js',
  'bower_components/angular-material/angular-material.js',
  'bower_components/angular-material-data-table/dist/md-data-table.js'
];

var libsCssFiles = [
  'bower_components/angular-material/angular-material.css',
  'bower_components/angular-material-data-table/dist/md-data-table.css'
];

gulp.task('clean', function() {
  gulp.src(['dist/'], {read: false})
    .pipe(rimraf());
});

gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('libs', function() {
  gulp.src(libsJsFiles)
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));

  gulp.src(libsCssFiles)
    .pipe(concat('libs.css'))
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify', ['lint'], function() {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('styles.css'))
      .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      }))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jade', function() {
  return gulp.src(jadeFiles)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['compile', 'watch'], function() {
  var server = gls.static('dist', 4000);
  server.start();

  gulp.watch(distFiles, function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('watch', ['compile'], function() {
  gulp.watch(jsFiles, ['minify']);
  gulp.watch(sassFiles, ['sass']);
  gulp.watch(jadeFiles, ['jade']);
});

// Default Task
gulp.task('compile', ['libs', 'minify', 'sass', 'jade']);
gulp.task('default', ['serve']);
