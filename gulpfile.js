var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  rimraf = require('rimraf');

var paths = {
  js: [
    'src/js/app/module.js', 'src/js/auth/module.js', 'src/js/**/*.js'
  ],
  sass: 'src/scss/app.scss',
  jade: 'src/jade/**/*.jade',

  dist: 'dist/',
  imgs: 'src/imgs/**/*',

  fonts: [
    'bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff2'
  ],

  cssLibs: [
    'bower_components/animate.css/animate.min.css',
    'bower_components/angular-material/angular-material.min.css',
    'bower_components/angular-material-data-table/dist/md-data-table.min.css',
    'bower_components/angular-material-icons/angular-material-icons.css',
    'bower_components/material-design-icons/iconfont/material-icons.css'
  ],

  jsLibs: [
    'bower_components/jQuery/dist/jquery.min.js',

    //angular
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-i18n/angular-locale_pt-br.js',
    'bower_components/angular-jwt/dist/angular-jwt.min.js',
    'bower_components/angular-material/angular-material.min.js',
    'bower_components/angular-material-data-table/dist/md-data-table.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-jwt/dist/angular-jwt.min.js',
    'bower_components/angular-material-icons/angular-material-icons.min.js',

    //markdown
    'bower_components/marked/marked.min.js',
    'bower_components/angular-marked/dist/angular-marked.min.js'
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

gulp.task('fonts', () =>
  gulp.src(paths.fonts)
  .pipe(gulp.dest(paths.dist + 'fonts')));

gulp.task('libs', ['css:libs', 'js:libs', 'imgs', 'fonts']);

//SASS
gulp.task("sass", () =>
  gulp.src(paths.sass)
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    outputStyle: "compressed"
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
gulp.task('js:hint', () =>
  gulp.src(paths.js)
  .pipe($.jshint())
  .pipe($.jshint.reporter('default')));

gulp.task('js', ['js:hint'], () =>
  gulp.src(paths.js)
  .pipe($.sourcemaps.init())
  .pipe($.concat('all.min.js'))
  .pipe($.babel({
    presets: ['es2015']
  }))
  .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(paths.dist + 'js')));

gulp.task('watch', function() {
  $.livereload.listen();
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('compile', ['libs', 'jade', 'sass', 'js']);
gulp.task('default', ['compile', 'watch']);