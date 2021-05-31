const gulp = require("gulp")
const sass = require("gulp-sass")

gulp.task("sass", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
})
