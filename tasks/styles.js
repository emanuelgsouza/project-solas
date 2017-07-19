const gulp = require('gulp')
const minifyCss = require('gulp-clean-css')
const stylus = require('gulp-stylus')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')

module.exports = function (args, reload) {
  gulp.task('stylus', function () {
    gulp.src('./src/assets/stylus/app.styl')
      .pipe(stylus())
      .pipe(gulpif(args.production, gulp.dest('./dist/css/')))
      .pipe(gulpif(args.production, minifyCss()))
      .pipe(gulpif(args.production, rename('app.min.css')))
      .pipe(gulp.dest('./dist/css/'))
    if (!args.production) reload()
  })
}
