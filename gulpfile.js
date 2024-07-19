const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require ('gulp-sourcemaps');
const imagemin = require ('gulp-imagemin');
const uglify = require ('gulp-uglify');

function sassCompilation() { 
    
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())    
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));

}

function imageCompilation() {
    
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))

}

function compileJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}


// exports.sass = sassCompilation;
// exports.imagemin = imageCompilation;
// exports.uglify = compileJavaScript;

exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(sassCompilation));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(imageCompilation));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(compileJavaScript));
}