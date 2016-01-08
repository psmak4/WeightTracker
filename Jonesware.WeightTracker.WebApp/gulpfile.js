/// <binding ProjectOpened='watch' />
var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('adminLTE', function () {
	return gulp.src(['bower_components/AdminLTE/dist/js/app.js'])
		.pipe(jshint())
		.pipe(rename('adminLTE.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/adminLTE'));
});

gulp.task('bootstrap', function () {
	return gulp.src(['bower_components/bootstrap/dist/js/bootstrap.js'])
		.pipe(jshint())
		.pipe(rename('bootstrap.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/bootstrap'));
});

gulp.task('datatables', function () {
	return gulp.src(['bower_components/datatables.net/js/jquery.dataTables.js'])
		.pipe(jshint())
		.pipe(rename('datatables.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/datatables'));
});

gulp.task('datepicker', function () {
	return gulp.src(['bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js'])
		.pipe(jshint())
		.pipe(rename('datepicker.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/datepicker'));
});

gulp.task('flot', function () {
	gulp.src(['bower_components/Flot/jquery.flot.js'])
			//.pipe(jshint())
			//.pipe(rename('flot.js'))
			//.pipe(uglify())
			.pipe(gulp.dest('js/lib/flot'));
	gulp.src(['bower_components/Flot/jquery.flot.selection.js'])
			//.pipe(jshint())
			//.pipe(rename('flot.selection.js'))
			//.pipe(uglify())
			.pipe(gulp.dest('js/lib/flot'));
	gulp.src(['bower_components/Flot/jquery.flot.time.js'])
			//.pipe(jshint())
			//.pipe(rename('flot.time.js'))
			//.pipe(uglify())
			.pipe(gulp.dest('js/lib/flot'));
	return gulp.src(['bower_components/Flot/jquery.flot.resize.js'])
		//.pipe(jshint())
		//.pipe(rename('flot.resize.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('js/lib/flot'));
});

gulp.task('jquery', function () {
	return gulp.src(['bower_components/jquery/dist/jquery.js'])
		.pipe(jshint())
		.pipe(rename('jquery.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/jquery'));
});

gulp.task('modernizr', function () {
	return gulp.src(['bower_components/modernizr/modernizr.js'])
		.pipe(jshint())
		.pipe(rename('modernizr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/modernizr'));
});

gulp.task('morrisjs', function () {
	return gulp.src(['bower_components/morris.js/morris.js'])
		.pipe(jshint())
		.pipe(rename('morris.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/morris.js'));
});

gulp.task('raphael', function () {
	return gulp.src(['bower_components/raphael/raphael.js'])
		.pipe(jshint())
		.pipe(rename('raphael.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/raphael'));
});

gulp.task('toastr', function () {
	return gulp.src(['bower_components/toastr/toastr.js'])
		.pipe(jshint())
		.pipe(rename('toastr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/toastr'));
});

gulp.task('javascript', ['adminLTE', 'bootstrap', 'datepicker', 'flot', 'jquery', 'modernizr', 'morrisjs', 'raphael', 'toastr'], function () {

});

gulp.task('fonts', function () {
	return gulp.src(['./bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,otf,eot,svg}', 'bower_components/bootstrap/fonts/**/*.{ttf,woff,woff2,eot,svg}'])
		.pipe(gulp.dest('fonts'));
});

gulp.task('css-lib', function () {
	return gulp.src(['bower_components/AdminLTE/dist/css/AdminLTE.css', 'bower_components/AdminLTE/dist/css/skins/_all-skins.css'])
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(concat('lib.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'));
});

gulp.task('css-app', function () {
	return gulp.src(['Less/app.less'])
		.pipe(less())
		.pipe(sourcemaps.init())
		.pipe(concat('app.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(minifyCss())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
	gulp.watch(['Less/**/*.less'], ['css-app']);
});

gulp.task('default', function () {
    // place code for your default task here
});