var gulp = require('gulp');
var gulpminifyhtml = require('gulp-minify-html');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var del = require('del');

var paths = {
    index: 'src/index.html',
    js: 'src/js/**/*.js',
    lib: 'src/lib/**/*.js',
    css: 'src/css/**/*.css'
};

function isproduction() {
    return process.env.NODE_ENV != 'production';
}

function distsources(morepaths) {
    if (!morepaths) { morepaths = []; }
    var sources = [paths.js, paths.lib, paths.css].concat(morepaths);
    return gulp.src(sources.map(function(source) {
	return source.replace('src', 'dist');
    }), {read: false});
}

//Clear dist dir
gulp.task('clear', function(cb) {
    del(['dist'], cb);
});

//Minify and copy JavaScripts
gulp.task('js', function() {
    return gulp.src(paths.js)
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

//Copy JavaScripts from Lib
gulp.task('lib', function() {
    return gulp.src(paths.lib)
	.pipe(gulp.dest('dist/lib'));
});

//Minify and configure index.html
gulp.task('index', function() {
    var target = gulp.src(paths.index);
    return target.pipe(inject(distsources()))
        .pipe(replace('/dist', ''))
	.pipe(gulpminifyhtml({
	    conditionals: true,
	    spare: true
	}))
	.pipe(gulp.dest('dist'));
});

//Watch
gulp.task('watch', function() {
    gulp.watch(paths.index, ['index']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.lib, ['lib']);
    gulp.watch('gulpfile.js', ['build']);
});

gulp.task('build',
    [
	'clear',
	'js',
	'lib',
	'index'
    ],
    function() {
});

gulp.task('default',
    [
	'build',
	'watch'
    ],
    function() {
});