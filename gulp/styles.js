import gulp from 'gulp';
import path from 'path';
import config from 'config';
import util from 'gulp-util';
import clean from 'gulp-clean-css';
import rimraf from 'gulp-rimraf';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('clean-styles', () =>
          gulp.src([
                 path.join(config.paths.build, config.paths.styles.css),
                 path.join(config.paths.output, config.paths.styles.css)
               ], { read: false })
              .pipe(rimraf())
              .on('error', util.log.bind(util, 'Rimraf error')));

gulp.task('scss-to-css', ['clean-styles'], () =>
          gulp.src(path.join(config.paths.source, config.paths.styles.scss))
              .pipe(sass())
              .pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 8'], { cascade: true }))
              .pipe(gulp.dest(config.paths.build))
              .on('error', util.log.bind(util, 'SCSS error')));

gulp.task('minify-css', ['scss-to-css'], () =>
          gulp.src(path.join(config.paths.build, config.paths.styles.css))
              .pipe(clean({ compatibility: 'ie8' }))
              .pipe(gulp.dest(config.paths.output))
              .on('error', util.log.bind(util, 'Minify CSS error')));