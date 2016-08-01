import gulp from 'gulp';
import path from 'path';
import config from 'config';
import util from 'gulp-util';
import rimraf from 'gulp-rimraf';
import uglify from 'gulp-uglify';
import jade from 'gulp-jade';
import rename from 'gulp-rename';
import jspm from 'gulp-jspm';
import riot from 'gulp-riot';
import sync from 'browser-sync';

gulp.task('clean-scripts', () =>
          gulp.src([
                 path.join(config.paths.build, config.paths.scripts.js),
                 path.join(config.paths.output, config.paths.scripts.js),
                 path.join(config.paths.build, config.paths.scripts.tag),
                 path.join(config.paths.output, config.paths.scripts.tag)
               ], { read: false })
              .pipe(rimraf())
              .on('error', util.log.bind(util, 'Rimraf error')));

gulp.task('riot-tag', ['clean-scripts'], () =>
          gulp.src(path.join(config.paths.source, config.paths.scripts.tag))
              .pipe(jade({ pretty: true }))
              .pipe(rename({ extname: '.tag' }))
              .pipe(gulp.dest(config.paths.build))
              .on('error', util.log.bind(util, 'Jade error')));

gulp.task('riot-compile', ['riot-tag'], () =>
          gulp.src(path.join(config.paths.build, config.paths.scripts.tag))
              .pipe(riot())
              .pipe(gulp.dest(config.paths.build))
              .on('error', util.log.bind(util, 'Riot error')));

gulp.task('riot-clean', ['riot-compile'], () =>
          gulp.src(path.join(config.paths.build, config.paths.scripts.tag), { read: false })
              .pipe(rimraf())
              .on('error', util.log.bind(util, 'Rimraf error')));

gulp.task('copy-js', ['riot-clean'], () =>
          gulp.src([
                 path.join(config.paths.source, config.paths.scripts.js)
               ])
              .pipe(gulp.dest(config.paths.build))
              .on('error', util.log.bind(util, 'Copy error')));

gulp.task('bundle-js', ['copy-js'], () =>
          gulp.src(path.join(config.paths.build, config.paths.scripts.main + '.js'))
              .pipe(jspm({ selfExecutingBundle: true }))
              .pipe(rename({ basename: config.paths.scripts.main }))
              .pipe(gulp.dest(config.paths.output)));