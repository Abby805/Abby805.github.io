var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cache       = require('gulp-cached'),
    prefix      = require('autoprefixer'),
    notify      = require('gulp-notify'),
    postcss     = require('gulp-postcss'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssnano     = require('gulp-cssnano');

gulp.task('scss', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError({
      title:    "Gulp",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>"
    }))
    .pipe(cssnano({zindex: false}))
    .pipe(sourcemaps.write())
    .pipe(postcss([ prefix({ browsers: ['last 2 versions'], cascade: false }) ]))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('js/*.js');
});

gulp.task('default', ['scss', 'watch']);
