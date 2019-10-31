// The require statement tells Node to look into the node_modules folder for a package
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
'use strict';
const {src, dest, watch, series, parallel } = require('gulp');
const log           = require('fancy-log');
const colors        = require('ansi-colors');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
const bourbon       = require('node-bourbon').includePaths;
const cssmin        = require('gulp-cssmin');
const rename        = require('gulp-rename');
const concat        = require('gulp-concat');
const del           = require('del');
const panini        = require('panini');
const uglify        = require('gulp-uglify-es').default;
const sourcemaps    = require('gulp-sourcemaps');
const imagemin      = require('gulp-imagemin');
const removeCode    = require('gulp-remove-code');
const prettyHtml    = require('gulp-pretty-html');
const sassLint      = require('gulp-sass-lint');
const htmllint      = require('gulp-htmllint');
const jshint        = require('gulp-jshint');
const htmlreplace   = require('gulp-html-replace');
const newer         = require('gulp-newer');
const autoprefixer  = require('gulp-autoprefixer');
const accessibility = require('gulp-accessibility');
const babel         = require('gulp-babel');
const ghPages       = require('gulp-gh-pages');

// File paths
const files = {
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js'
}

/* --------------------- DEV TASKS --------------------- */
// COMPILE SCSS INTO CSS
function compileSCSS() {
  console.log('---------------COMPILING SCSS---------------');
  return src('src/assets/scss/main.scss')
	.pipe(sass({
	  outputStyle: 'expanded',
	  sourceComments: 'map',
	  sourceMap: 'scss',
	  includePaths: bourbon
	}).on('error', sass.logError))
	.pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
	.pipe(dest('dist/assets/css'))
	.pipe(browserSync.stream());
}

// USING PANINI, TEMPLATE, PAGE AND PARTIAL FILES ARE COMBINED TO FORM HTML MARKUP
function compileHTML() {
  console.log('---------------COMPILING HTML WITH PANINI---------------');
  panini.refresh();
  return src('src/pages/**/*.html')
	.pipe(panini({
	  root: 'src/pages/',
	  layouts: 'src/layouts/',
	  partials: 'src/partials/',
	  helpers: 'src/helpers/', // not using
	  data: 'src/data/' // not using
	}))
	.pipe(dest('dist'))
	.pipe(browserSync.stream());
}

// COPY CUSTOM JS
function compileJS() {
  console.log('---------------COMPILE CUSTOM.JS---------------');
  return src(['src/assets/js/custom.js'])
	.pipe(babel())
	.pipe(dest('dist/assets/js/'))
	.pipe(browserSync.stream());
}

// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
function resetPages(done) {
  console.log('---------------CLEARING PANINI CACHE---------------');
  panini.refresh();
  done();
}

// SASS LINT - Lint Task
function scssLint() {
  console.log('---------------SASS LINTING---------------');
  return src('src/assets/scss/**/*.scss')
	.pipe(sassLint({
	  configFile: '.scss-lint.yml'
	}))
	.pipe(sassLint.format())
	.pipe(sassLint.failOnError());
}

// HTML LINTER - Lint Task
function htmlLint() {
  console.log('---------------HTML LINTING---------------');
  return src('dist/*.html')
	.pipe(htmllint({}, htmllintReporter));
}

function htmllintReporter(filepath, issues) {
  if (issues.length > 0) {
	issues.forEach(function (issue) {
	  log(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
	});
	process.exitCode = 1;
  } else {
	console.log('---------------NO HTML LINT ERROR---------------');
  }
}

// JS LINTER - Lint Task
function jsLint() {
  return src('src/assets/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
}

// WATCH FILES
function watchFiles() {
  watch('src/**/*.html', compileHTML);
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'] , compileSCSS);
  watch('src/assets/js/*.js', compileJS);
  watch('src/assets/images/**/*', copyImages);
}

// BROWSER SYNC
function browserSyncInit(done) {
  console.log('---------------BROWSER SYNC---------------');
  browserSync.init({
	notify: false,
	server: './dist'
  });
  return done();
}


// --------------------- OPTIMIZATION TASKS ---------------------
// COPIES AND MINIFY IMAGE TO DIST
function copyImages() {
  console.log('---------------OPTIMIZING IMAGES---------------');
  return src('src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(newer('dist/assets/images/'))
	.pipe(imagemin())
	.pipe(dest('dist/assets/images/'))
	.pipe(browserSync.stream());
}

// PLACES FONT FILES IN THE DIST FOLDER
function copyFont() {
  console.log('---------------COPYING FONTS INTO DIST FOLDER---------------');
  return src([
	  'src/assets/fonts/*',
	])
	.pipe(dest('dist/assets/fonts'))
	.pipe(browserSync.stream());
}

// COPY JS VENDOR FILES
function jsVendor() {
  console.log('---------------COPY JAVASCRIPT VENDOR FILES INTO DIST---------------');
  return src([
	  'src/assets/vendor/js/*',
	])
	.pipe(dest('dist/assets/vendor/js'))
	.pipe(browserSync.stream());
}

// COPY CSS VENDOR FILES
function cssVendor() {
  console.log('---------------COPY CSS VENDOR FILES INTO DIST---------------');
  return src([
	  'src/assets/vendor/css/*',
	])
	.pipe(dest('dist/assets/vendor/css'))
	.pipe(browserSync.stream());
}

// PRETTIFY HTML FILES
function prettyHTML() {
  console.log('---------------HTML PRETTIFY---------------');
  return src('dist/*.html')
	.pipe(prettyHtml({
	  indent_size: 4,
	  indent_char: ' ',
	  unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
	}))
	.pipe(dest('dist'));
}

// DELETE DIST FOLDER
function cleanDist(done) {
  console.log('---------------REMOVING OLD FILES FROM DIST---------------');
  del.sync('dist');
  return done();
}

// CREATE DOCS FOLDER FOR DEMO - Not used (removed from 'gulp prod')
function generateDocs() {
  console.log('---------------CREATING DOCS---------------');
  return src([
	  'dist/**/*',
	])
	.pipe(dest('docs'))
	.pipe(browserSync.stream());
}

// ACCESSIBILITY CHECK
function HTMLAccessibility() {
  return src('dist/*.html')
	.pipe(accessibility({
	  force: true
	}))
	.on('error', console.log)
	.pipe(accessibility.report({
	  reportType: 'txt'
	}))
	.pipe(rename({
	  extname: '.txt'
	}))
	.pipe(dest('accessibility-reports'));
}


/* --------------------- PROD TASKS --------------------- */
// CHANGE TO MINIFIED VERSIONS OF JS AND CSS
function renameSources() {
  console.log('---------------RENAMING SOURCES---------------');
  return src('dist/*.html')
	.pipe(htmlreplace({
	  'js': 'assets/js/main.min.js',
	  'css': 'assets/css/main.min.css'
	}))
	.pipe(dest('dist/'));
}

// CONCATINATE JS SCRIPTS
function concatScripts() {
  console.log('---------------CONCATINATE SCRIPTS---------------');
  return src([
	  'src/assets/vendor/js/jquery.js',
	  'src/assets/vendor/js/popper.js',
	  'src/assets/vendor/js/bootstrap.js',
      'src/assets/vendor/js/slick.js',
	  'src/assets/js/*'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write('./'))
	.pipe(dest('dist/assets/js'))
	.pipe(browserSync.stream());
}

// MINIFY SCRIPTS
function minifyScripts() {
  console.log('---------------MINIFY SCRIPTS---------------');
  return src('dist/assets/js/main.js')
	.pipe(removeCode({
	  production: true
	}))
	.pipe(uglify().on('error', console.error))
	.pipe(rename('main.min.js'))
	.pipe(dest('dist/assets/js'));
}

// MINIFY CSS
function minifyCss() {
  console.log('---------------MINIFY CSS---------------');
  return src([
	  'src/assets/vendor/css/**/*',
	  'dist/assets/css/main.css'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('main.css'))
	.pipe(sourcemaps.write('./'))
	.pipe(cssmin())
	.pipe(rename('main.min.css'))
	.pipe(dest('dist/assets/css'));
}

// RUN ALL LINTERS
exports.linters = series(htmlLint, scssLint, jsLint);

// RUN ACCESSIILITY CHECK
exports.accessibility = HTMLAccessibility;

// DEV
exports.dev = series(cleanDist, copyFont, jsVendor, cssVendor, copyImages, compileHTML, compileJS, resetPages, prettyHTML, compileSCSS, browserSyncInit, watchFiles);

// PROD
exports.prod = series(cleanDist, compileSCSS, copyFont, copyImages, compileHTML, concatScripts, minifyScripts, minifyCss, renameSources, prettyHTML, browserSyncInit);
