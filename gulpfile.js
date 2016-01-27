var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  rimraf = require('rimraf'),
  gls = require('gulp-live-server');
run = require('gulp-run');

var paths = {
  ts: 'src/ts/**/*.ts',
  sass: 'src/scss/styles.scss',
  jade: 'src/jade/**/*.jade',

  dist: 'dist/',

  cssLibs: [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/animate.css/animate.min.css'
  ],
  cssFonts: [
    'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'
  ],

  jsLibs: [
    'bower_components/jquery/dist/jquery.min.js',

    //bootstrap
    'bower_components/bootstrap/dist/js/bootstrap.min.js',

    //angular
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js'
  ]
};

//CLEAN
gulp.task('clean', cb => rimraf(paths.dist, cb));

//LIBS
gulp.task('css:fonts', () =>
  gulp.src(paths.cssFonts)
  .pipe(gulp.dest(paths.dist + 'fonts')));

gulp.task('css:libs', ['css:fonts'], () =>
  gulp.src(paths.cssLibs)
  .pipe($.concat('libs.css'))
  .pipe(gulp.dest(paths.dist + 'css')));

gulp.task("js:libs", () =>
  gulp.src(paths.jsLibs)
  .pipe($.concat("libs.js"))
  .pipe(gulp.dest(paths.dist + "js")));

gulp.task('libs', ['css:fonts', 'css:libs', 'js:libs']);

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
  .pipe(gulp.dest(paths.dist + 'css')));

//JADE
gulp.task('jade', () =>
  gulp.src(paths.jade)
  .pipe($.jade({
    pretty: true
  }))
  .pipe(gulp.dest(paths.dist)));

//TS
gulp.task('ts', () => run('npm run tsc -s').exec());

gulp.task('serve', ['compile', 'watch'], function() {
  var server = gls.static('dist', 4000);
  server.start();

  // gulp.watch(paths.dist, function(file) {
  //   server.notify.apply(server, [file]);
  // });
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch(paths.jade, ['jade']);
});

gulp.task('compile', ['libs', 'jade', 'sass', 'ts']);
gulp.task('default', ['serve']);