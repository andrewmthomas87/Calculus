var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var gutil = require('gulp-util')

gulp.task('es6', function() {
	browserify({
		entries: 'src/index.jsx',
		debug: true,
		extensions: ['.es6', '.jsx']
	})
	.transform(babelify)
	.on('error', gutil.log)
	.bundle()
	.on('error', gutil.log)
	.pipe(source('app.js'))
	.pipe(gulp.dest('build'))
})

gulp.task('watch', function() {
	gulp.watch('src/**/*.{es6,jsx}', ['es6'])
})

gulp.task('default', ['es6', 'watch'])
