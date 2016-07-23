import gulp from 'gulp';
import path from 'path';
import config from 'config';
import util from 'gulp-util';
import jade from 'gulp-jade';
import rimraf from 'gulp-rimraf';
import minify from 'gulp-minify-html';

gulp.task('clean-markup', () =>
          gulp.src([
                 path.join(config.paths.build, config.paths.markup.html),
                 path.join(config.paths.output, config.paths.markup.html)
               ], { read: false })
              .pipe(rimraf())
              .on('error', util.log.bind(util, 'Rimraf error')));

gulp.task('jade-to-html', ['clean-markup'], () =>
          gulp.src(path.join(config.paths.source, config.paths.markup.jade))
              .pipe(jade({ pretty: true }))
              .pipe(gulp.dest(config.paths.build))
              .on('error', util.log.bind(util, 'Jade error')));

gulp.task('minify-html', ['jade-to-html'], () =>
          gulp.src(path.join(config.paths.build, config.paths.markup.html))
              .pipe(minify({ conditionals: true, spare: true }))
              .pipe(gulp.dest(config.paths.output))
              .on('error', util.log.bind(util, 'Minify HTML error')));