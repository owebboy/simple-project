/*
	
	GULPFILE.JS
	owebboy

*/

/* gulp and pluins ----------------------------------------- */
var gulp 				= require('gulp'),
		stylus 			= require('gulp-stylus'),
		cssmin			= require('gulp-cssmin'),
		rename			= require('gulp-rename'),
		watch				= require('gulp-watch'),
		webserver 	= require('gulp-webserver'),
		jade 				= require('gulp-jade'),
		prettify 		= require('gulp-prettify');

/* destinations -------------------------------------------- */
var stylusFile 	= './stylus/style.styl',
		cssFile			= './css/style.css',
		jadeFile		= './pages/*.jade';

/* stylus to css ------------------------------------------- */
gulp.task('stylus', function() {
	gulp.src(stylusFile)
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});

/* compress css -------------------------------------------- */
gulp.task('compress', function() {
	gulp.src(cssFile)
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css'));
});

/* webserver ----------------------------------------------- */
gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: false,
			directoryListing: false,
			open: true,
			port: 9000
		}));
});

/* jade to html -------------------------------------------- */
gulp.task('jade', function() {
	gulp.src(jadeFile)
		.pipe(jade())
		.pipe(prettify({indent_size: 2}))
		.pipe(gulp.dest('./'));
});

/* default task -------------------------------------------- */
gulp.task('default', function() {
	gulp.start('webserver');
	watch(stylusFile, function(files, cb) {
		gulp.start('stylus', cb);
		gulp.start('compress', cb);
	});
	watch(jadeFile, function(files, cb) {
		gulp.start('jade', cb);
	})
});