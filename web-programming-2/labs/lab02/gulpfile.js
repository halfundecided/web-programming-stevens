const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = ["./src/styles/variables.scss", "./src/styles/custom.scss"];

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

gulp.task("sass", function(done) {
  gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("styles.css"))
    .pipe(gulp.dest("./public/css/"))
    .pipe(
      autoPrefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./public/css/"));
  done();
});

gulp.task("js:vendor", function(done) {
  gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"));
  done();
});

gulp.task("build", gulp.series(["sass", "js:vendor"]));

gulp.task("default", gulp.series(["sass", "js:vendor"]));
