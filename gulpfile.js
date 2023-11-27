var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer')




/**
 * Nodemon Task 
 * - Keeps Express Server running, even after errors
 * - Requires: https://nodemon.io/
 * TODO
 * - Port to forever?
 */
gulp.task('nodemon', function(cb) {
	var called = false;
	return nodemon({
		script: 'index.js',
		watch: ['index.js']
	})
	.on('start', function start() {
		if (!called) { cb() }
		called = true;
	})
	.on('restart', function restart() {
		setTimeout(function reload() {
			browserSync.reload({
				stream: true
			})
		}, 500)
	})
})



/**
 * BrowserSync
 * Requires: https://browsersync.io/docs/options
 */
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync({
		proxy: 'http://localhost:1035',
		port: 1037,
		open: false
	})
})


gulp.task('bs-reload', function () {
	browserSync.reload()
})


gulp.task('css-core', function(){
	gulp.src(['./src/css/core.new.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message) 
				this.emit('end')
			}
		}))
		.pipe(sass())
		//.pipe(autoprefixer('last 2 versions')) // TODO - update autoprefixer 
		.pipe(gulp.dest('./public/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss()) 
		.pipe(gulp.dest('./public/css/'))
		.pipe(browserSync.reload({ stream: true }))	
})

gulp.task('scripts', function() {
    return browserify({ entries: './src/js/main.js', extensions: ['.js'], debug: true })
        .transform(babelify)
        .bundle()
        .pipe(source('all.new.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({stream: true})) 
})




/**
 * Whitelabel
 */

// Currencies Direct
gulp.task('css-theme-cd', function(){
	gulp.src(['./src/whitelabel/CurrenciesDirect/css/theme.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message) 
				this.emit('end')
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/whitelabel/CurrenciesDirect/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss()) 
		.pipe(gulp.dest('./public/whitelabel/CurrenciesDirect/css/'))
		.pipe(browserSync.reload({ stream: true }))	
})

// TorFX
gulp.task('css-theme-tor-fx', function(){
	gulp.src(['./src/whitelabel/TorFX/css/theme.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message) 
				this.emit('end')
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/whitelabel/TorFX/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss()) 
		.pipe(gulp.dest('./public/whitelabel/TorFX/css/'))
		.pipe(browserSync.reload({ stream: true }))	
})

gulp.task('css-theme-ramsdens', function(){
	gulp.src(['./src/whitelabel/Ramsdens/css/theme.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message) 
				this.emit('end')
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/whitelabel/Ramsdens/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss()) 
		.pipe(gulp.dest('./public/whitelabel/Ramsdens/css/'))
		.pipe(browserSync.reload({ stream: true }))	
})

gulp.task('css-theme-foremost', function(){
	gulp.src(['./src/whitelabel/Foremost/css/theme.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message) 
				this.emit('end')
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/whitelabel/Foremost/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss()) 
		.pipe(gulp.dest('./public/whitelabel/Foremost/css/'))
		.pipe(browserSync.reload({ stream: true }))	
})

gulp.task('css-theme-tm-oz', function(){
	gulp.src(['./src/whitelabel/TMOz/css/theme.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message) 
				this.emit('end')
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/whitelabel/TMOz/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss()) 
		.pipe(gulp.dest('./public/whitelabel/TMOz/css/'))
		.pipe(browserSync.reload({ stream: true }))	
})



gulp.task('default', ['browser-sync'], function() {
	gulp.watch('./src/css/**/*.scss', ['css-core'])
	gulp.watch('./src/whitelabel/TorFX/css/*.scss', ['css-theme-tor-fx'])
	gulp.watch('./src/whitelabel/CurrenciesDirect/css/*.scss', ['css-theme-cd'])
	gulp.watch('./src/whitelabel/Ramsdens/css/*.scss', ['css-theme-ramsdens'])
	gulp.watch('./src/whitelabel/Foremost/css/*.scss', ['css-theme-foremost'])
	gulp.watch('./src/whitelabel/TMOz/css/*.scss', ['css-theme-tm-oz'])
	gulp.watch('./src/js/**/*.js', ['scripts'])
	gulp.watch('./views/*.html', ['bs-reload'])
	gulp.watch('./views/components/*.html', ['bs-reload'])
	gulp.watch('./views/whitelabel/*.html', ['bs-reload'])
})




/**
 * Build Task
 * - Builds CSS and JS, then exits (for staging/"production" environments)
 * TODO
 * - Potentially iterate over compilable tasks?
 */
gulp.task(
	'build', 
	[
		'css-core', 
		'css-theme-cd', 
		'css-theme-tor-fx', 
		'css-theme-ramsdens', 
		'css-theme-foremost',
		'css-theme-tm-oz',
		'scripts',
		'default'
	]
)




/**
 * Footnotes
 * - Recursively scan directory (SO) - http://goo.gl/cZeRbM/ 
 * - `gulp.dest(function(file) { return file.base })`
 */

