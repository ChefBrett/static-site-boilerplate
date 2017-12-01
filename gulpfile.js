var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    uncss        = require('gulp-uncss'),
    autoprefixer = require('gulp-autoprefixer'),
    includer     = require('gulp-htmlincluder'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    cssnano      = require('gulp-cssnano'),
    pump         = require('pump'),
    babelify     = require('babelify'),
    browserify   = require('browserify'),
    source       = require('vinyl-source-stream');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
  'sass'       : './src/scss/**/*.scss',
  'js'         : './src/js/index.js',
  'html'       : './src/html/**/*.html',
  'css'        : './build/public/css/',
  'atomic'     : './build/public/css/atomic.css',
  'builtJs'    : './build/public/js/',
  'builtHtml'  : './build/',
  'images'     : './src/public/images/**/*.*',
  'buildImages': './build/public/images',
  'fonts'      : './src/public/fonts/**/*.*',
  'buildFonts' : './build/public/fonts',
};

gulp.task('env-prod', function() {
    return process.env.NODE_ENV = 'prod';
});

gulp.task('env-dev', function() {
    return process.env.NODE_ENV = 'dev';
});

gulp.task('htmlIncluder', function() {
  const json = require('./src/json');

  // ToDo: This is probably not the best place to do this, but it works
  json.bundle = (
    process.env.NODE_ENV === 'prod'
      ? '/public/js/bundle.min.js'
      : '/public/js/bundle.js'
  )

  let options = {
    jsonInput: json,
    dev: {
      // printIterations: true,
    },
  };

  pump([
    gulp.src(paths.html),
    includer(options),
    gulp.dest(paths.builtHtml)
  ]);
});

gulp.task('images', function() {
  pump([
    gulp.src(paths.images),
    gulp.dest(paths.buildImages),
  ])
})

gulp.task('fonts', function() {
  pump([
    gulp.src(paths.fonts),
    gulp.dest(paths.buildFonts),
  ])
})

gulp.task('js', function() {
  return browserify({
        entries: [ paths.js ]
    })
    .transform(babelify.configure({
      presets: ['env'],
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(paths.builtJs))
    ;
});

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest(paths.css))
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

// these are the tasks to run directly
gulp.task('build-prod', ['env-prod', 'htmlIncluder'], function() {
  gulp.start('sass');
  gulp.start('js');
  gulp.start('images');
  gulp.start('fonts');
});

gulp.task('build', ['env-dev', 'htmlIncluder'], function() {
  gulp.start('sass');
  gulp.start('js');
  gulp.start('images');
  gulp.start('fonts');
});

gulp.task('watch', ['env-dev', 'htmlIncluder'], function() {
  gulp.start('sass');
  gulp.start('js');
  gulp.start('images');
  gulp.start('fonts');
  gulp.watch([paths.html], ['htmlIncluder']);
  gulp.watch([paths.sass, paths.builtHtml], ['sass']);
  gulp.watch([paths.js], ['js']);
});

gulp.task('default', ['build']);

