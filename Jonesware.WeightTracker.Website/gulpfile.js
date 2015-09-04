/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('javascript', function () {
	return gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.js', 'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js', 'bower_components/Flot/jquery.flot.js', 'bower_components/Flot/jquery.flot.selection.js', 'bower_components/Flot/jquery.flot.time.js', 'bower_components/Flot/jquery.flot.resize.js'])
		.pipe(concat('lib.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('css', function () {
	return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css', 'bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css', 'bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css', 'bower_components/font-awesome/css/font-awesome.css'])
		.pipe(concat('lib.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('css'));
});

gulp.task('fonts', function () {
	return gulp.src(['./bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,otf,eot,svg}', 'bower_components/bootstrap/fonts/**/*.{ttf,woff,woff2,eot,svg}'])
		.pipe(gulp.dest('fonts'));
});

gulp.task('default', function () {
    // place code for your default task here
});