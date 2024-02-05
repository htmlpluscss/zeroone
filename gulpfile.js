'use strict';

const gulp             = require('gulp');

const postcss          = require('gulp-postcss');
const autoprefixer     = require("autoprefixer");
const csso             = require("gulp-csso");
const minify           = require('gulp-minify');
const browserReporter  = require('postcss-browser-reporter');

const postcssImport    = require('postcss-import');
const postcssVariables = require('postcss-advanced-variables');
const postcssColor     = require('postcss-color-function');
const postcssNested    = require('postcss-nested');
const postcssExtend    = require('postcss-extend');

const mqpacker         = require("@lipemat/css-mqpacker");
const sourcemaps       = require('gulp-sourcemaps');

const nunjucksRender   = require('gulp-nunjucks-render');

const rename           = require('gulp-rename');

const plumber          = require('gulp-plumber');
const server           = require('browser-sync').create();
const replace          = require('gulp-replace');
const htmlmin          = require('gulp-htmlmin');

const del              = require('del');
const fs               = require("fs");

const newer            = require('gulp-newer');

const concat           = require('gulp-concat');
const remember         = require('gulp-remember');

const debug            = require('gulp-debug');
const w3cjs            = require('gulp-w3cjs');

const site             = 'OneZero';
//const domain           = 'palladium.ae';
const domain           = 'pg-development.vercel.app';

const html = (files, since = {}, folder = '') => {

	return gulp.src(files, since)
		.pipe(plumber())
		.pipe(debug({title: 'html:'}))
		.pipe(nunjucksRender({
			data: {
				url: 'https://' + domain,
				domain : domain,
				site: site
			},
			path: 'src/'
		}))
//		.pipe(w3cjs({
//			url : 'https://validator.w3.org/nu/'
//		}))
//		.pipe(w3cjs.reporter())
//		.pipe(replace('css/styles.css', 'css/styles.min.css?' + Date.now()))
//		.pipe(replace('js/scripts.js', 'js/scripts.min.js?' + Date.now()))
		.pipe(gulp.dest('build' + folder))

};

gulp.task('html', () => html('src/**/index.html', {since: gulp.lastRun('html')}));
gulp.task('html:touch', () => html('src/**/index.html'));
gulp.task('html:main', () => html('src/index.html', {}, '/'));

gulp.task('css', () => {

	return gulp.src('src/css/style.css')
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(postcss([
				postcssImport(),
				postcssVariables(),
				postcssColor(),
				postcssNested(),
				postcssExtend(),
				autoprefixer({
					overrideBrowserslist: 'Android >= 5'
				}),
				mqpacker(),
				browserReporter()
			]))
			.pipe(sourcemaps.write())
			.pipe(rename('styles.css'))
			.pipe(gulp.dest('build/css'))
			.pipe(csso())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest('build/css'))

});

gulp.task('js', () => {

	return gulp.src([

		'src/js/min/*.js',
		'src/js/js.js',
		'src/js/*.js',
		'!src/js/min/swiper.min.js',
		'!src/js/min/inputmask.min.js'

	], {since: gulp.lastRun('js')})

		.pipe(debug({title: 'js'}))
		.pipe(sourcemaps.init())
		.pipe(remember('js'))
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())

// prod

		.pipe(minify({
			preserveComments: "some",
			ext : {
				min:'.min.js'
			}
		}))

		.pipe(gulp.dest('build/js'))

});

gulp.task('serve', () => {

	gulp.src([
//		'src/js/min/swiper.min.js',
		'src/js/min/inputmask.min.js'
	]).pipe(gulp.dest('build/js'));

	server.init({
		server: 'build',
		files: [
			{
				match: ['build/**/*.*', '!build/**/*.min.{css,js}'],
				fn: server.reload()
			}
		]
	});

});

gulp.task('clear', () => del('build'));

gulp.task('copy', () => {

	return gulp.src(['src/**/*.*', '!src/**/*.{css,html,js}'])
			.pipe(newer('build'))
			.pipe(debug({title: 'copy:newer'}))
			.pipe(gulp.dest('build'))

});

gulp.task('watch', () => {
	gulp.watch('src/js/*.*', gulp.series('js'));
	gulp.watch('src/css/*.*', gulp.series('css'));
	gulp.watch('src/**/index.html', gulp.series('html'));
	gulp.watch(['src/main/**','!src/main/index.html'], gulp.series('html:main'));
	gulp.watch(['src/_include/**/*.html','src/template/**/*.html'], gulp.series('html:touch'));
	gulp.watch(['src/**/*.*', '!src/**/*.{css,html,js}'], gulp.series('copy'));
});

gulp.task('default', gulp.series(
	'clear',
	gulp.parallel('css','js'),
	'html',
	'copy',
	gulp.parallel('watch','serve')
	));


gulp.task('min', () => {

	return gulp.src(['build/**/*.html'])
		.pipe(replace('<link href="/css/styles.css" rel="preload" as="style">', ''))
		.pipe(replace('<link href="/js/scripts.js" rel="preload" as="script">', ''))
//		.pipe(replace('css/styles.css', 'css/styles.min.css?' + Date.now()))
//		.pipe(replace('js/scripts.js', 'js/scripts.min.js?' + Date.now()))
		.pipe(replace('<link href="/css/styles.css" rel="stylesheet">', '<style>' + fs.readFileSync('build/css/styles.min.css', 'utf8') + '</style>'))
		.pipe(replace('<script defer src="/js/scripts.js"></script>', ''))
		.pipe(replace('</body>', fs.readFileSync('build/js/scripts.min.js', 'utf8') + '</body>'))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(replace('<br', ' <br'))
		.pipe(gulp.dest('build'))

});