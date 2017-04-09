var gulp         = require('gulp');
var concat       = require('gulp-concat');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var minifyHTML   = require('gulp-minify-html');
var rename       = require("gulp-rename");
var size         = require('gulp-size');
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');
var reload       = browserSync.reload;
var deploy       = require('gulp-gh-pages');

gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

/**
 *
 * Styles
 * - Compile
 * - Compress/Minify
 * - Catch errors (gulp-plumber)
 * - Autoprefixer
 *
 **/
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  //   .pipe(sass())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('css'));
});


gulp.task('css', function () {
  return gulp.src('css/**')
    .pipe(gulp.dest('dist/css'));
});


/**
 *
 * BrowserSync.io
 * - Watch CSS, JS & HTML for changes
 * - View project at: localhost:3000
 *
 **/
gulp.task('browser-sync', function() {
  browserSync.init(['css/*.css', 'js/**/*.js', 'index.html'], {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('minify-html', function() {
  var opts = {
    comments:true,
    spare:true
  };

  gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});


/**
 *
 * Javascript
 * - Uglify
 *
 **/
gulp.task('scripts', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({
      dirname: "min",
      suffix: ".min",
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream:true}));
});

/**
 *
 * Images
 * - Compress them!
 *
 **/
gulp.task('images', function () {
  return gulp.src('images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('vendor', function () {
  return gulp.src('vendor/**/**')
    .pipe(gulp.dest('dist/vendor'));
});

/**
 *
 * Default task
 * - Runs sass, browser-sync, scripts and image tasks
 * - Watchs for file changes for images, scripts and sass/css
 *
 **/
gulp.task('default', ['sass', 'browser-sync', 'scripts'], function () {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('images/*', ['images']);
});

gulp.task('prod', ['vendor', 'css', 'scripts', 'images', 'minify-html']);