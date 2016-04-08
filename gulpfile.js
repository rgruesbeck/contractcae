var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpminifyhtml = require('gulp-minify-html');
var gulpif = require('gulp-if');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var del = require('del');

var paths = {
    index: 'src/index.html',
    markup: 'src/*.html',
    blog: 'src/blog/**/*',
    js: 'src/js/**/*.js',
    lib: 'src/lib/**/*.js',
    styles: 'src/styles/**/*.css',
    font: 'src/font/**/*',
    images: 'src/images/**/*',
    favicon: 'src/favicon.png'
};

var assetpaths = [
    'dist/js/**/*.js',
    'dist/lib/**/*.js',
    'dist/styles/**/*.css'
];

function isproduction() {
    return process.env.NODE_ENV == 'production';
}

//Clear files
gulp.task('clear', function(cb) {
    del(['dist'], cb);
});

//Minify and copy JavaScripts
gulp.task('js', function() {
    return gulp.src(paths.js)
	.pipe(gulpif(isproduction(), uglify()))
	.pipe(gulpif(isproduction(), rev()))
	.pipe(gulp.dest('dist/js'));
});

//Copy JavaScripts from Lib
gulp.task('lib', function() {
    return gulp.src(paths.lib)
	.pipe(gulp.dest('dist/lib'));
});

//Copy styles
gulp.task('styles', function(cb) {
    return gulp.src(paths.styles)
	.pipe(gulpif(isproduction(), rev()))
	.pipe(gulp.dest('dist/styles'));
});

//Copy fonts
gulp.task('fonts', function(cb) {
    return gulp.src(paths.font)
	.pipe(gulp.dest('dist/font'));
});

//Copy images
gulp.task('images', function() {
    return gulp.src(paths.images)
	.pipe(gulp.dest('dist/images'));
});

//Minify and configure index.html
gulp.task('index', function() {
    var target = gulp.src(paths.index);
    var sources = gulp.src(assetpaths, {read: false});

    return target.pipe(inject(sources))
        .pipe(replace('/dist', ''))
	.pipe(gulpif(isproduction(), gulpminifyhtml({
	  conditionals: true,
	  spare: true
	})))
	.pipe(gulp.dest('dist'));
});

//Minify and configure *.html
gulp.task('markup', function() {
    var target = gulp.src([paths.markup, '!./src/index.html']);
    var sources = gulp.src(assetpaths, {read: false});

    return target.pipe(inject(sources))
        .pipe(replace('/dist', ''))
	.pipe(gulpif(isproduction(), gulpminifyhtml({
	  conditionals: true,
	  spare: true
	})))
	.pipe(gulp.dest('dist'));
});

//move blog posts
gulp.task('blog', function() {
    return gulp.src(paths.blog)
	.pipe(gulp.dest('dist/blog'));
});

//Favicon
gulp.task('favicon', function() {
    return gulp.src(paths.favicon)
	.pipe(gulp.dest('dist'));
});

//Watch
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.blog, ['blog']);
    gulp.watch(paths.index, ['index']);
    gulp.watch(paths.markup, ['markup']);
});

gulp.task('build',
    [
	'clear',
	'js',
	'lib',
	'styles',
	'fonts',
	'images',
	'favicon',
	'blog',
	'markup',
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