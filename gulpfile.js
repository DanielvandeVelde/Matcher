require("dotenv").config()
const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const uglify = require("gulp-uglify")
const concat = require("gulp-concat")
const browserSync = require('browser-sync').create()
const port = process.env.PORT

gulp.task("css", () => {
  return gulp
    .src("src/scss/*")
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', () => {
  browserSync.init({
    proxy: `localhost:${port}`
  })
  // Watchers
  gulp.watch('./src/**/*.scss', gulp.series('css'))
  gulp.watch('./views/*.hbs', browserSync.reload)
})

gulp.task("js", () => {
  return gulp.src("src/js/*").pipe(uglify()).pipe(gulp.dest("dist/js"))
})

gulp.task("default", gulp.parallel("css", "js"))
