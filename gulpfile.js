var beeper       = require('beeper'),
    cssnano      = require('gulp-cssnano'),
    gulp         = require('gulp'),
    iconfont     = require('gulp-iconfont'),
    iconfontCSS  = require('gulp-iconfont-css'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    prefix       = require('autoprefixer'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    runTimestamp = Math.round(Date.now() / 1000);

// Prefix with project code
var fontName = 'icons';

// Paths
var paths = {
  styles: {
    src: 'scss/**/*.scss',
    dist: 'css'
  },
  images: {
    icons: 'images/icons/*.svg'
  },
  icons: {
    path: 'scss/templates/_icons-template.scss',
    target: '../../scss/global/_icons.scss',
    fontPath: '../fonts/icons/',
    dist: 'fonts/icons/'
  }
}

gulp.task('scss', () => {
  return gulp.src('./scss/styles.scss')
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
      beeper();
    }}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cssnano({zindex: false}))
    .pipe(postcss([prefix({cascade: false})]))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(paths.styles.dist));
});

gulp.task('iconfont', () => {
  return gulp.src(paths.images.icons)
    .pipe(iconfontCSS({
      fontName: fontName,
      path: paths.icons.path,
      targetPath: paths.icons.target,
      fontPath: paths.icons.fontPath,
      cacheBuster: runTimestamp
    }))
    .pipe(iconfont({
      fontName: fontName,
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001,
      prependUnicode: true,
      timestamp: runTimestamp,
    }))
    .pipe(gulp.dest(paths.icons.dist));
});

gulp.task('icons', gulp.series('iconfont', 'scss'));

gulp.task('watch', () => {
  gulp.watch(paths.styles.src, gulp.series('scss'));
});

gulp.task('default', gulp.parallel('scss', 'watch'));
