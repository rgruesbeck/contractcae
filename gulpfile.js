var gulp = require('gulp');
var del = require('del');


var paths = {
    index: 'src/index.html',
    js: 'src/js/**/*.js',
    lib: 'src/lib/**/*.js',
    images: 'src/images/**/*',
    css: 'src/css/**/*.css'
};

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});


gulp.task('default',
    [
	'clean'
    ],
    function() {
});