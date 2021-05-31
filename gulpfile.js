const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const uglify = require("gulp-uglify")
const concat = require("gulp-concat")

gulp.task("default", ["css", "js"])

gulp.task("css", () => {
  return gulp
    .src("src/scss/*")
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("dist/css"))
})

gulp.task("js", () => {
  return gulp.src("src/js/*").pipe(uglify()).pipe(gulp.dest("dist/js"))
})

gulp.task("watch", () => {
  gulp.watch("src/scss/*", ["css"])
  gulp.watch("src/js/*", ["minify"])
})
