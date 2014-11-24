/*
	
	GULPFILE.JS
	owebboy

*/

/* gulp and plugins ----------------------------------------- */
var gulp 								= require('gulp'),
		stylus 							= require('gulp-stylus'),
		cssmin							= require('gulp-cssmin'),
		rename							= require('gulp-rename'),
		watch								= require('gulp-watch'),
		webserver 					= require('gulp-webserver'),
		jade 								= require('gulp-jade'),
		prettify 						= require('gulp-prettify'),
		autoprefixer 				= require('gulp-autoprefixer'),
		concat 							= require('gulp-concat'),
		del 								= require('del');

/* destinations -------------------------------------------- */
var stylusFile 					= './stylus/*.styl',
		jadeFile						= './pages/*.jade',
		dist								= './dist';

/* stylus to css ------------------------------------------- */
gulp.task('stylus', function() {
	gulp.src(stylusFile)
		.pipe(stylus())
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: true
		}))
		.pipe(gulp.dest(dist))
		.pipe(concat('all.css'))
		.pipe(gulp.dest(dist))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dist));
});

/* webserver ----------------------------------------------- */
gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
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

/* clean build ---------------------------------------------- */
gulp.task('clean', function (cb) {
	del(dist, cb);
});

/* default task -------------------------------------------- */
gulp.task('default', function() {
	gulp.start('webserver');
	watch(stylusFile, function(files, cb) {
		gulp.start('stylus', cb);
	});
	watch(jadeFile, function(files, cb) {
		gulp.start('jade', cb);
	})
});