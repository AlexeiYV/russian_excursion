var gulp = require('gulp'),
	sass = require('gulp-sass')
	autoprefixer = require('gulp-autoprefixer')
	browsersync = require('browser-sync');

gulp.task('sass', function(){
	return gulp.src('scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: ['node_modules/susy/sass']
		}).on('error', sass.logError))
		.pipe(autoprefixer({'browsers': ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browsersync.stream());
});

gulp.task('serve', ['sass'], function(){
	browsersync.init({
		server: './dist/'
	});
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('./dist/*.html').on('change', browsersync.reload);
});

gulp.task('default', ['serve']);