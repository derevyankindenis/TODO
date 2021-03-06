'use strict';

const del = require('del');
const gulp = require('gulp');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
var ghPages = require('gulp-gh-pages');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const server = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src('./css/main.css')
        .pipe(plumber())
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(server.stream());
});

gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(rollup({}, 'iife'))
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest('build/js/'));
  });

gulp.task('htmls', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('./build'))
        .pipe(server.stream());
});

gulp.task('imgs', function () {
    return gulp.src('./img/*.{svg, png}')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('build', ['htmls', 'imgs', 'styles', 'scripts']);

gulp.task('js-watch', ['scripts'], function (done) {
    server.reload();
    done();
});

gulp.task('serve', ['build'], function () {
    server.init({
      server: './build',
      notify: false,
      open: true,
      port: 3503,
      ui: false
    });

    gulp.watch('./css/*.css', ['styles']);
    gulp.watch('*.html', ['htmls']);
    gulp.watch('js/**/*.js', ['js-watch']);
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('deploy', function() {
 return gulp.src('./build/**/*')
   .pipe(ghPages());
});
