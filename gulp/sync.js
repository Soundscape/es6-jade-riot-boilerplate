import gulp from 'gulp';
import path from 'path';
import config from 'config';
import sync from 'browser-sync';

gulp.task('watch', () => {
  gulp.watch(path.join(config.paths.source, config.paths.markup.jade), ['minify-html']);
  gulp.watch(path.join(config.paths.source, config.paths.styles.scss), ['minify-css']);
  gulp.watch(path.join(config.paths.source, config.paths.scripts.js), ['bundle-js']);
  gulp.watch(path.join(config.paths.source, config.paths.scripts.tag), ['bundle-js']);
});

gulp.task('serve', ['watch'], () => {
  sync.init({
    server: config.paths.output
  });
  
  gulp.watch(path.join(path.join(config.paths.output, config.paths.markup.html))).on('change', sync.reload);
  gulp.watch(path.join(path.join(config.paths.output, config.paths.styles.css))).on('change', sync.reload);
  gulp.watch(path.join(path.join(config.paths.output, config.paths.scripts.main + '.js'))).on('change', sync.reload);
});