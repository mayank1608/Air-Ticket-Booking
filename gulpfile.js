const gulp = require('gulp');
var csso = require('gulp-csso');
const sass = require('gulp-sass');
const del = require('del');
var browserSync = require('browser-sync').create();

var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', () => {
    return gulp.src(['./node_modules/bootstrap/scss/bootstrap.scss' , './style/sass/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        // .pipe(csso())
        .pipe(gulp.dest('./style/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("./js/"))
        .pipe(browserSync.stream());
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('watch', () => {

    browserSync.init({
        server: {
            baseDir: "./"
            },
            port: 8080,
            open: true,
            notify: false
    });

    gulp.watch(['./node_modules/bootstrap/scss/bootstrap.scss', './style/sass/**/*.scss'], (done) => {
        gulp.series(['clean', 'styles', 'js'])(done);
    });
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['clean', 'styles', 'js']));