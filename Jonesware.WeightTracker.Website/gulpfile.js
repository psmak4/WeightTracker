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

gulp.task('datepicker', function () {
	return gulp.src(['bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js'])
		.pipe(jshint())
		.pipe(rename('datepicker.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/datepicker'));
});

gulp.task('durandal', function () {
	gulp.src(['bower_components/Durandal/js/plugins/dialog.js'])
		.pipe(jshint())
		.pipe(rename('dialog.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/plugins/history.js'])
		.pipe(jshint())
		.pipe(rename('history.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/plugins/http.js'])
		.pipe(jshint())
		.pipe(rename('http.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/plugins/observable.js'])
		.pipe(jshint())
		.pipe(rename('observable.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/plugins/router.js'])
		.pipe(jshint())
		.pipe(rename('router.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/plugins/serializer.js'])
		.pipe(jshint())
		.pipe(rename('serializer.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/plugins/widget.js'])
		.pipe(jshint())
		.pipe(rename('widget.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/plugins'));
	gulp.src(['bower_components/Durandal/js/transitions/entrance.js'])
		.pipe(jshint())
		.pipe(rename('entrance.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal/transitions'));
	gulp.src(['bower_components/Durandal/js/activator.js'])
		.pipe(jshint())
		.pipe(rename('activator.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	gulp.src(['bower_components/Durandal/js/app.js'])
		.pipe(jshint())
		.pipe(rename('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	gulp.src(['bower_components/Durandal/js/binder.js'])
		.pipe(jshint())
		.pipe(rename('binder.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	gulp.src(['bower_components/Durandal/js/composition.js'])
		.pipe(jshint())
		.pipe(rename('composition.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	gulp.src(['bower_components/Durandal/js/events.js'])
		.pipe(jshint())
		.pipe(rename('events.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	gulp.src(['bower_components/Durandal/js/system.js'])
		.pipe(jshint())
		.pipe(rename('system.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	gulp.src(['bower_components/Durandal/js/viewEngine.js'])
		.pipe(jshint())
		.pipe(rename('viewEngine.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
	return gulp.src(['bower_components/Durandal/js/viewLocator.js'])
		.pipe(jshint())
		.pipe(rename('viewLocator.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/durandal'));
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

gulp.task('knockout', function () {
	return gulp.src(['bower_components/knockout/dist/knockout.js'])
		.pipe(jshint())
		.pipe(rename('knockout.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/knockout'));
});

gulp.task('knockout-validation', function () {
	return gulp.src(['bower_components/knockout-validation/dist/knockout.validation.js'])
		.pipe(jshint())
		.pipe(rename('knockout.validation.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/knockout'));
});

gulp.task('modernizr', function () {
	return gulp.src(['bower_components/modernizr/modernizr.js'])
		.pipe(jshint())
		.pipe(rename('modernizr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/modernizr'));
});

gulp.task('require', function () {
	return gulp.src(['bower_components/requirejs/require.js'])
		.pipe(jshint())
		.pipe(rename('require.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/require'));
});

gulp.task('text', function () {
	return gulp.src(['bower_components/text/text.js'])
		.pipe(jshint())
		.pipe(rename('text.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/text'));
});

gulp.task('toastr', function () {
	return gulp.src(['bower_components/toastr/toastr.js'])
		.pipe(jshint())
		.pipe(rename('toastr.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/lib/toastr'));
});

gulp.task('javascript', ['adminLTE', 'bootstrap', 'datepicker', 'durandal', 'flot', 'jquery', 'knockout', 'knockout-validation', 'modernizr', 'require', 'text', 'toastr'], function () {

});

gulp.task('css-lib', function () {
	return gulp.src(['bower_components/Durandal/css/durandal.css', 'bower_components/AdminLTE/dist/css/AdminLTE.css', 'bower_components/AdminLTE/dist/css/skins/_all-skins.css', 'bower_components/animate.css/animate.css'])
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
		.pipe(minifyCss())
		.pipe(concat('app.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'));
});

gulp.task('fonts', function () {
	return gulp.src(['./bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,otf,eot,svg}', 'bower_components/bootstrap/fonts/**/*.{ttf,woff,woff2,eot,svg}'])
		.pipe(gulp.dest('fonts'));
});

gulp.task('watch', function () {
	gulp.watch(['Less/app.less', 'Less/_carousel.less', 'Less/_forms.less', 'Less/_noWeighIns.less', 'Less/_scrollbars.less', 'Less/_splash.less'], ['css-app']);
});

gulp.task('default', function () {
    // place code for your default task here
});