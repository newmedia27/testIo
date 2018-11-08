const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const rigger = require('gulp-rigger');

gulp.task('sass', function () {
    gulp.src('./src/app/scss/**/main.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('dist', function () {
    gulp.src('./src/app/css/**/*.css')
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
    gulp.src('./src/app/index.html')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./src/app/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./src/app/img/*.*')
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/app"
        }
    });
});

gulp.task('rigger',function () {
    gulp.src("./src/html/*.html")
        .pipe(rigger())
        .pipe(gulp.dest('./src/app'))
        .pipe(browserSync.reload({
            stream: true
        }));

});
gulp.task('default',['browserSync','sass','rigger'], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch("./src/app/*.html",).on('change', browserSync.reload);
    gulp.watch("./src/**/*.html",["rigger"]);
});