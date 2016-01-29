var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  rimraf = require('rimraf');

var paths = {
  js: [
    'src/js/app/module.js',
    'src/js/auth/module.js',
    'src/js/**/*.js'
  ],
  sass: 'src/scss/app.scss',
  jade: 'src/jade/**/*.jade',

  dist: 'dist/',
  imgs: 'src/imgs/**/*',

  cssLibs: [
    'bower_components/animate.css/animate.min.css',

    'bower_components/angular-material/angular-material.css',
    'bower_components/angular-material-data-table/dist/md-data-table.css'
  ],

  jsLibs: [
    'bower_components/jquery/dist/jquery.min.js',

    //angular
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-jwt/dist/angular-jwt.js',
    'bower_components/angular-material/angular-material.js',
    'bower_components/angular-material-data-table/dist/md-data-table.js',
    'bower_components/angular-messages/angular-messages.min.js'
  ]
};

//CLEAN
gulp.task('clean', cb => rimraf(paths.dist, cb));

//LIBS
gulp.task('css:libs', () =>
  gulp.src(paths.cssLibs)
  .pipe($.concat('libs.min.css'))
  .pipe(gulp.dest(paths.dist + 'css')));

gulp.task("js:libs", () =>
  gulp.src(paths.jsLibs)
  .pipe($.concat("libs.min.js"))
  .pipe(gulp.dest(paths.dist + "js")));

gulp.task('imgs', () =>
  gulp.src(paths.imgs)
  .pipe(gulp.dest(paths.dist + 'imgs')));

gulp.task('libs', ['css:libs', 'js:libs', 'imgs']);

//SASS
gulp.task("sass", () =>
  gulp.src(paths.sass)
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    outputStyle: "compressed",
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: ["last 2 versions", "ie >= 9"]
  }))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(paths.dist + 'css'))
  .pipe($.livereload({
    start: true
  })));

//JADE
gulp.task('jade', () =>
  gulp.src(paths.jade)
  .pipe($.jade({
    pretty: true
  }))
  .pipe(gulp.dest(paths.dist)));

//JS
gulp.task('js:hint', function() {
  return gulp.src(paths.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('js', ['js:hint'], function() {
  return gulp.src(paths.js)
    .pipe($.sourcemaps.init())
    .pipe($.concat('all.min.js'))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('watch', function() {
  $.livereload.listen();
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('compile', ['libs', 'jade', 'sass', 'js']);
gulp.task('default', ['compile', 'watch']);