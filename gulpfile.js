var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpminifyhtml = require('gulp-minify-html');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var del = require('del');

var paths = {
    index: 'src/index.html',
    js: 'src/js/**/*.js',
    lib: 'src/lib/**/*.js',
    styles: 'src/styles/**/*'
};

var assetpaths = [
    'dist/js/**/*.js',
    'dist/lib/**/*.js',
    'dist/styles/**/*.css'
];

function isproduction() {
    return process.env.NODE_ENV != 'production';
}

//Clear dist dir
gulp.task('clear', function(cb) {
    del(['dist'], cb);
});

//Minify and copy JavaScripts
gulp.task('js', function() {
    return gulp.src(paths.js)
	.pipe(uglify())
        .pipe(rev())
	.pipe(gulp.dest('dist/js'));
});

//Copy JavaScripts from Lib
gulp.task('lib', function() {
    return gulp.src(paths.lib)
	.pipe(gulp.dest('dist/lib'));
});

//Copy styles
gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(rev())
	.pipe(gulp.dest('dist/styles'));
});

//Minify and configure index.html
gulp.task('index', function() {
    var target = gulp.src(paths.index);
    var sources = gulp.src(assetpaths, {read: false});

    return target.pipe(inject(sources))
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
    gulp.watch(paths.js, ['js', 'index']);
    gulp.watch(paths.lib, ['lib', 'index']);
    gulp.watch(paths.styles, ['styles', 'index']);
    gulp.watch('gulpfile.js', ['compile']);
});

gulp.task('compile',
    [
	'js',
	'lib',
	'styles',
	'index'
    ],
    function() {
});

gulp.task('build',
    [
	'clear',
	'compile'
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