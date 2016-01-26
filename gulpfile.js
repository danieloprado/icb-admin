var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  gls = require('gulp-live-server');

var files = {
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

    //jquery validate
    'bower_components/jquery-validation/dist/jquery.validate.min.js',
    'bower_components/jquery-validation/dist/additional-methods.min.js',
    'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js',

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
gulp.task('clean:js', cb => rimraf(paths.dist + 'js/**/*.js', cb));
gulp.task('clean:css', cb => rimraf(paths.dist + 'css/app.css', cb));
gulp.task('clean', ['clean:js', 'clean:css']);

//CSS
gulp.task('css:fonts', () =>
  gulp.src(paths.cssFonts)
  .pipe(gulp.dest(paths.dist + 'fonts')));

gulp.task('css:libs', ['css:fonts'], () =>
  gulp.src(paths.cssLibs)
  .pipe($.concat('libs.css'))
  .pipe(gulp.dest(paths.dist + 'css')));

gulp.task('css', ['css:fonts', 'css:libs']);

//SASS
gulp.task("sass", ['css'], () =>
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

//JS
gulp.task("js:libs", () =>
  gulp.src(paths.jsLibs)
  .pipe($.concat("libs.js"))
  .pipe(gulp.dest(paths.webrootJs)));

gulp.task('jade', () =>
  gulp.src(files.views)
  .pipe($.jade({
    pretty: true
  }))
  .pipe(gulp.dest(files.distFolder)));

gulp.task('serve', ['compile', 'watch'], function() {
  var server = gls.static('dist', 4000);
  server.start();

  // gulp.watch(files.dist, function(file) {
  //   server.notify.apply(server, [file]);
  // });
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch(files.jade, ['jade']);
});

gulp.task('default', ['serve']);