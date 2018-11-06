
// --------------------------------------------------
// Plugins
// --------------------------------------------------

var   gulp          = require("gulp"),
      sass          = require("gulp-sass"),
      concat        = require("gulp-concat"),
      watch         = require("gulp-watch"),
      plumber       = require("gulp-plumber"),
      minify_css    = require("gulp-clean-css"),
      uglify        = require("gulp-uglify"),
      autoprefixer  = require("gulp-autoprefixer"),
      sourcemaps    = require("gulp-sourcemaps"),
      notify        = require("gulp-notify"),
      browserSync   = require("browser-sync"),
      sprites       = require("gulp.spritesmith"),
      jslint        = require("gulp-jslint"),
      svgsprites    = require("gulp-svg-sprites");


// -------------------------------------------------
// Settings
// -------------------------------------------------

var assets = './assets/';
var public = './public/';

var src = {
  sass: assets + "sass/**/*.scss",
  js: assets + "js/**/*.js",
  img: assets + "img/*",
  sprites: assets + "img/sprites/*",
  svgsprites: assets + "svg/*"
};

var output = {
  css: public + "css",
  js: public + "js",
  img: public + "img",
  html: "./*.html",
  min_css: 'app.min.css',
  min_js: 'app.min.js'
};


// -------------------------------------------------
// Error Handler
// -------------------------------------------------

var onError = function(err) {
  console.log(err);
  this.emit('end');
};


// -------------------------------------------------
// Task: Sass
// -------------------------------------------------

gulp.task('sass', function(){
  return gulp.src(src.sass)
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 3 version'))
    .pipe(concat(output.min_css))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass_build', function(){
  return gulp.src(src.sass)
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 3 version'))
    .pipe(concat(output.min_css))
    .pipe(minify_css())
    .pipe(gulp.dest(output.css))
    .pipe(browserSync.reload({stream: true}));
});


// -------------------------------------------------
// Task: JS
// -------------------------------------------------

gulp.task('js', function(){
  return gulp.src([
      assets + 'js/jquery.min.js',
      assets + 'js/slick.js',
      assets + 'js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat(output.min_js))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output.js))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js_build', function(){
  return gulp.src([
      assets + 'js/jquery.min.js',
      assets + 'js/slick.js',
      assets + 'js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat(output.min_js))
    .pipe(uglify())
    .pipe(gulp.dest(output.js))
    .pipe(browserSync.reload({stream: true}));
});


// -------------------------------------------------
// Task: Image Sprite
// -------------------------------------------------

gulp.task('sprites', function () {
  var spriteData = gulp.src(src.sprites)
    .pipe(sprites({
      imgName: '../img/sprite.png',
      cssName: 'icons.css'
    }));
  spriteData.img.pipe(gulp.dest(output.img));
  spriteData.css.pipe(gulp.dest(output.css));
});


// -------------------------------------------------
// Task: SVG Sprite
// -------------------------------------------------


// -------------------------------------------------
// Task: Watch
// -------------------------------------------------

gulp.task('watch', function(){
  browserSync.init({
    server: {
      basDir: './',
      index: "index.html"
    }
  });
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.js, ['js']);
  gulp.watch(output.html).on('change', browserSync.reload);
  gulp.watch(src.sprites, ['sprites']);
  gulp.watch(src.svgsprites, ['svgsprites']);
});

// -------------------------------------------------
// Task: Default
// -------------------------------------------------

gulp.task('default', ['watch', 'sass', 'js', 'sprites']);
gulp.task('build', ['sass_build', 'js_build', 'sprites']);
