var gulp = require("gulp"),
  sass = require("gulp-sass"),
  cache = require("gulp-cached"),
  prefix = require("autoprefixer"),
  notify = require("gulp-notify"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps"),
  cssnano = require("gulp-cssnano"),
  plumber = require("gulp-plumber"),
  sassGlob = require("gulp-sass-glob"),
  beeper = require("beeper"),
  server = require("gulp-webserver");

// Paths
var paths = {
  styles: ["scss/**/*.scss"]
};

gulp.task("scss", () => {
  return gulp
    .src("scss/styles.scss")
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);
          beeper();
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(cssnano({ zindex: false }))
    .pipe(
      postcss([
        prefix({
          browsers: ["last 2 versions"],
          cascade: false
        })
      ])
    )
    .pipe(sourcemaps.write("../css/maps"))
    .pipe(gulp.dest("css"));
});

gulp.task("build-styles", gulp.series("scss"));

gulp.task("watch", () => {
  gulp.src('./').pipe(server({ livereload: true, open: true }));
  gulp.watch(paths.styles, gulp.series("build-styles"));
});

gulp.task("build", gulp.parallel("build-styles"));

gulp.task("default", gulp.parallel("build-styles", "watch"));
