var gulp          = require('gulp');
var sass          = require('gulp-sass');
var minifycss     = require('gulp-minify-css');
var autoprefixer  = require('gulp-autoprefixer');
var livereload    = require('gulp-livereload');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var rimraf        = require('rimraf');
var sourcemaps    = require('gulp-sourcemaps');


gulp.task('clean', function(done) {
  rimraf('dist', done);
});

var input = 'src/assets/scss/app.scss';
var output = 'dist/assets/css';
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp.src(input)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(livereload())
});


// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {

  return gulp.src('src/assets/js/**/**.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // .pipe(uglify)
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload());
});

gulp.task('default',['clean', 'sass', 'javascript'], function() {
  livereload.listen();
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
  gulp.watch(['**/*.php']);
});
