const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); // minify Image files
const uglify = require('gulp-uglify'); //minify Javascript files
const sass = require('gulp-sass'); //compile sass to css
const concat = require('gulp-concat'); //compile minify Javascript
/*
------TOP LEVEL FUNCTION
  gulp.task - Define tasks
  gulp.src - Point tofile to use
  gulp.dest - Point to folder to output
  gulp.watch - Watch files and folders for changes
*/

//Log message
gulp.task('message', async function () {
    return console.log("gulp is running...")
});


//Copy HTML files
gulp.task('copyHTML', async function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});


//Optimize Images
gulp.task('imageMin', async function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});


//Minify JS
// gulp.task('minify', async function() {
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
// });

//Compile Sass to Css
gulp.task('sass', async function () {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('dist/css'))
});

//Script
gulp.task('scripts', async function () {
    gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});


gulp.task('default', gulp.parallel('message', 'copyHTML', 'imageMin', 'sass', 'scripts'));

gulp.task('watch', async function () {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/*.html', gulp.series('copyHTML'));
});