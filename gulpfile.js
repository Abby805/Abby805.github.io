var gulp = require("gulp"),
  sass = require("gulp-sass"),
  eslint = require("gulp-eslint"),
  scsslint = require("gulp-sass-lint"),
  cache = require("gulp-cached"),
  prefix = require("autoprefixer"),
  notify = require("gulp-notify"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps"),
  cssnano = require("gulp-cssnano"),
  plumber = require("gulp-plumber"),
  sassGlob = require("gulp-sass-glob"),
  babel = require("gulp-babel"),
  beeper = require("beeper");

// Paths
var paths = {
  styles: ["scss/**/*.scss"],
  scripts: ["js/*.js"]
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

gulp.task("scsslint", () => {
  return gulp
    .src(paths.styles)
    .pipe(
      scsslint({
        options: {
          configFile: "sass-lint.yml"
        }
      })
    )
    .pipe(scsslint.format())
    .pipe(scsslint.failOnError());
});

gulp.task("eslint", () => {
  return gulp
    .src(paths.scripts)
    .pipe(
      eslint({
        parser: "babel-eslint",
        rules: {
          "no-mutable-exports": 0
        },
        globals: ["jQuery", "$"],
        envs: ["browser"]
      })
    )
    .pipe(eslint.format());
});

gulp.task("scripts", () => {
  return gulp
    .src(paths.scripts)
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
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("js/dist"));
});

gulp.task("build-styles", gulp.series("scss", "scsslint"));
gulp.task("build-scripts", gulp.series("scripts", "eslint"));

gulp.task("watch", () => {
  gulp.watch(paths.styles, gulp.series("build-styles"));
  gulp.watch(paths.scripts, gulp.series("build-scripts"));
});

gulp.task(
  "build",
  gulp.parallel("build-styles", "build-scripts")
);

gulp.task("default", gulp.parallel("build-styles", "watch"));
