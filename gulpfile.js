const gulp = require("gulp")
const sass = require("gulp-sass")
const concat = require("gulp-concat")

gulp.task("css", () => {
  return gulp
    .src("src/scss/*")
    .pipe(concat("main.css"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("dist/css"))
})

gulp.task("watch", () => {
  gulp.watch("src/scss/*", ["css"])
})
