var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    uncss        = require('gulp-uncss'),
    autoprefixer = require('gulp-autoprefixer'),
    includer     = require('gulp-htmlincluder'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    cssnano      = require('gulp-cssnano'),
    pump         = require('pump');

/*
 * Create variables for our project paths so we can change in one place
 */
var javascriptFiles = [
  // libraries first
  './node_modules/lory.js/dist/lory.min.js',
  // everything else
  './src/js/**/*.js',
];
var paths = {
  'sass'     : './src/scss/**/*.scss',
  'js'       : javascriptFiles,
  'html'     : './src/html/**/*.html',
  'css'      : './build/public/css/',
  'atomic'   : './build/public/css/atomic.css',
  'builtJs'  : './build/public/js/',
  'builtHtml': './build/',
};

gulp.task('htmlIncluder', function() {
  pump([
    gulp.src(paths.html),
    includer('include virtual'),
    gulp.dest(paths.builtHtml)
  ]);
});

gulp.task('js', function() {
  pump([
    gulp.src(paths.js),
    concat('index.js'),
    gulp.dest(paths.builtJs),
  ]);
});

gulp.task('jsProd', function() {
  pump([
    gulp.src(paths.js),
    concat('index.js'),
    uglify(),
    gulp.dest(paths.builtJs),
  ]);
});

gulp.task('sass', function() {
  pump([
    gulp.src(paths.sass),
    sass({errLogToConsole: true}),
    autoprefixer({browsers: ['last 2 versions']}),
    gulp.dest(paths.css)
  ]);
});

gulp.task('uncss', ['sass'], function() {
  pump([
    gulp.src(paths.atomic),
    uncss({
      html: [paths.html],
      options: {
        ignoreSslErrors: 'true'
      }
    }),
    cssnano(),
    gulp.dest(paths.css)
  ]);
})

gulp.task('build-prod', ['htmlIncluder'], function() {
  gulp.start('uncss');
  gulp.start('jsProd');
})

gulp.task('default', ['htmlIncluder'], function() {
  gulp.start('sass');
  gulp.start('js');
});

gulp.task('watch', ['htmlIncluder'], function() {
    gulp.start('sass');
    gulp.start('js');
    gulp.watch([paths.html], ['htmlIncluder']);
    gulp.watch([paths.sass, paths.builtHtml], ['sass']);
    gulp.watch([paths.js], ['js']);
});
