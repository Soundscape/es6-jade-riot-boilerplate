'use strict';

import gulp from 'gulp';
import path from 'path';
import config from 'config';
import sequence from 'gulp-sequence';

import './gulp/markup';
import './gulp/styles';
import './gulp/scripts';
import './gulp/sync.js';

gulp.task('build', ['minify-html', 'minify-css', 'bundle-js']);

gulp.task('default', sequence('build', 'serve'));