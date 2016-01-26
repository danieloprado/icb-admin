var gulp = require('gulp'),
  $ = require("gulp-load-plugins")(),
  gls = require('gulp-live-server');

var files = {
  js: [
    'src/js/app/module.js',
    'src/js/auth/module.js',
    'src/js/**/*.js'
  ],

  sass: 'src/scss/styles.scss',
  sassAll: 'src/scss/**/*.scss',

  views: 'src/jade/**/*.jade',

  dist: 'dist/**/*',
  distFolder: 'dist/',

  jsLibs: [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-jwt/dist/angular-jwt.js',
    'bower_components/angular-material/angular-material.js',
    'bower_components/angular-material-data-table/dist/md-data-table.js'
  ],

  cssLibs: [
    'bower_components/angular-material/angular-material.css',
    'bower_components/angular-material-data-table/dist/md-data-table.css'
  ]
};

gulp.task('clean', function() {
  gulp.src([files.distFolder], {
      read: false
    })
    .pipe($.rimraf());
});

gulp.task('lint', function() {
  return gulp.src(files.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('libs', function() {
  gulp.src(files.jsLibs)
    .pipe($.concat('libs.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(files.distFolder + 'js'));

  gulp.src(files.cssLibs)
    .pipe($.concat('libs.css'))
    .pipe($.csso())
    .pipe(gulp.dest(files.distFolder + 'css'));
});

gulp.task('minify', ['lint'], function() {
  return gulp.src(files.js)
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.concat('all.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(files.distFolder + 'js'));
});

gulp.task('sass', function() {
  return gulp.src(files.sass)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe($.csso())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(files.distFolder + 'css'));
});

gulp.task('views', function() {
  return gulp.src(files.views)
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(files.distFolder));
});

gulp.task('serve', ['compile', 'watch'], function() {
  var server = gls.static('dist', 4000);
  server.start();

  gulp.watch(files.dist, function(file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('watch', ['compile'], function() {
  gulp.watch(files.js, ['minify']);
  gulp.watch(files.sassAll, ['sass']);
  gulp.watch(files.views, ['views']);
});

// Default Task
gulp.task('compile', ['libs', 'minify', 'sass', 'views']);
gulp.task('default', ['serve']);