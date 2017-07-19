const gulp = require('gulp')
const glob = require('glob')
const br = require('browser-sync')
const reload = br.reload

const args = require('yargs')
  .default('production', false)
  .alias('p', 'production').argv

glob.sync('./tasks/*.js', { realPath: true })
  .forEach(function (file) {
    require(file)(args, reload)
})

const dependences = ['stylus', 'imagemin','htmlmin', 'script']

gulp.task('default', dependences, function () {
  br.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    open: false
  })

  if (!args.production) {
    gulp.watch('./src/js/*.js', ['script'])
    gulp.watch('./src/assets/stylus/**/*.styl', ['stylus'])
    gulp.watch('./src/**/*.html', ['htmlmin'])
    gulp.watch('./src/html/index.html', ['htmlmin'])
  }
})
