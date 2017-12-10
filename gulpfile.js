var gulp = require('gulp'),
	sass = require('gulp-sass')
	autoprefixer = require('gulp-autoprefixer')
	browsersync = require('browser-sync'),
	pug = require('gulp-pug'),
	htmlbeautify = require('gulp-html-beautify'),
	notify = require('gulp-notify'),
	combine = require('stream-combiner2').obj,
	del = require('del'),
	concat = require('gulp-concat'),
	merge = require('merge-stream');


gulp.task('styles', function(){
	// return combine (
	// 	gulp.src('src/scss/style.scss'),
	// 	sass({
	// 		//outputStyle: 'compressed',
	// 		includePaths: [
	// 		'node_modules/susy/sass', 
	// 		'node_modules/normalize-scss/sass',
	// 		'node_modules/font-awesome/scss',
	// 		'node_modules/slick-carousel/slick'
	// 		]
	// 	}),
	// 	autoprefixer({'browsers': ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
	// 	gulp.dest('public')
	// ).on('error', notify.onError());

	var scss = combine (
		gulp.src('src/scss/style.scss'),
		sass({
			//outputStyle: 'compressed',
			includePaths: [
			'node_modules/susy/sass', 
			'node_modules/normalize-scss/sass',
			'node_modules/font-awesome/scss',
			'node_modules/slick-carousel/slick'
			]
		})		
	).on('error', notify.onError());

	var css = gulp.src(['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'])
		.pipe(concat('css-files.css'));

	var merged = merge(scss, css)
		.pipe(concat('style.css'))
		.pipe(autoprefixer({'browsers': ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(gulp.dest('public'));

	return merged;
});

gulp.task('pug', function(){
	return combine (
		gulp.src('src/pages/**/*.pug'),
		pug({
			basedir: "src"
		}),
		htmlbeautify(),
		gulp.dest('public')
	).on('error', notify.onError(function(error) {
        return {
            title: 'Pug',
            message: error.message
        };
    }));
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.pug', gulp.series('pug'));
	gulp.watch('src/**/*.scss', gulp.series('styles'));
	gulp.watch(['src/js/*.js', 'src/modules/**/*.js'], gulp.series('scripts'));
});

gulp.task('serve', function(){
	browsersync.init({
		server: './public'
	});

	browsersync.watch('public/**/*.*').on('change', browsersync.reload);
});

gulp.task('clean', function(){
	return del('public');
});

gulp.task('fonts', function(){
	return gulp.src([
			'node_modules/font-awesome/fonts/*.*',
			'node_modules/slick-carousel/slick/fonts/*.*',
			'src/static/fonts/*.*'
		]).pipe(gulp.dest('public/fonts/'));
});

gulp.task('img', function(){
	return gulp.src('src/static/img/*.*')
		.pipe(gulp.dest('public/img/'));
});

gulp.task('scripts', function(){
	return gulp.src([
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
		'src/js/*.js',
		'src/modules/**/*.js'
		])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('public'));
});

gulp.task('build', 
	gulp.series(
		'clean', 
		gulp.parallel('fonts', 'img', 'pug', 'styles', 'scripts')
	)
);

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));