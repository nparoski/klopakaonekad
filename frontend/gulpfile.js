"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const stripDebug = require("gulp-strip-debug");
const cleanCSS = require("gulp-clean-css");
const gzip = require("gulp-gzip");
const php = require("gulp-connect-php");
const browserSync = require("browser-sync").create();

// First and most important task, create CSS from Sass.
// At the same time, we first:
//   1. Compile all our Sass to one big CSS file and output it to ../web/stylesheets
//   2. While still in stream, we remove comments and all space (minify) to have compact CSS and output that to ./stylesheets
//   3. Finally, while still in stream, we also gzip it to final, production small styles.min.css.gz
function sassCompile() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "nested", // expanded, nested, compact, compressed
        includePaths: [
          "./node_modules/bootstrap/scss",
          "./node_modules/@fortawesome/fontawesome-free/scss"
        ],
        sourceMap: true, // Inline source maps (preferred)
        sourceMapContents: true, // Needed for node-sass generation of the maps
        sourceMapEmbed: true, // Needed to embed (inline) maps
        outFile: "./mycss" // Needed although unused in inline maps
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest("../web/stylesheets")) // 1. output for webelopment with sourcemaps normal css
    .pipe(cleanCSS()) // gulp css minify
    .pipe(rename({ suffix: ".min" })) // gulp.rename (added .min)
    .pipe(gulp.dest("../web/stylesheets")) // 2. output just minimized
    .pipe(gzip({ gzipOptions: { level: 9 } })) // compress with highest compression
    .pipe(gulp.dest("../web/stylesheets")); // 3. output gzipped
}

// This task is just an example how simple files could be copied.
// Note that if we need some other font files (which are locally present)
// we would need their paths added
function fontCopy() {
  let fontPaths = [
    "./node_modules/@fortawesome/fontawesome-free/webfonts/*",
    "./fonts/**/*.{otf,ttf,woff,woff2,svg,eot}"
  ];
  return gulp.src(fontPaths).pipe(gulp.dest("../web/webfonts"));
}

// Images are compressed and output to our ../web/images directory
// Compression is not changed so if we want that (and probably we do)
// we need to supply options to imagemin
function imageMin() {
  return gulp
    .src("./images/**/*")
    .pipe(changed("../web/images"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest("../web/images"));
}

function movePhp() {
  return gulp.src("../backend/php/**/*.php").pipe(gulp.dest("../web/php"));
}

// The order with javascript inclusion is important as it is with CSS
// Our own JS is included at the end and final JS is in ../web
// and minimized versions are here so they can just be copy/paste for production
function javascript() {
  let jsOrder = [
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/popper.js/dist/umd/popper.js",
    "./node_modules/bootstrap/dist/js/bootstrap.js",
    "./node_modules/featherlight/src/featherlight.js",
    "./node_modules/featherlight/src/featherlight.gallery.js",
    "./javascript/custom.js"
  ];
  return (
    gulp
      .src(jsOrder)
      .pipe(concat("main.js"))
      .pipe(gulp.dest("../web/javascript"))
      // .pipe(stripDebug())
      .pipe(terser()) // Minifies all javascript including es6
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest("../web/javascript"))
      .pipe(gzip({ gzipOptions: { level: 9 } }))
      .pipe(gulp.dest("../web/javascript"))
  );
}

// Static server
function staticServer() {
  browserSync.init({
    server: {
      baseDir: "../web/"
    }
  });
  gulp.watch("./scss/**/*.scss", sassCompile);
  gulp.watch("./javascript/**/*.js", javascript);
  gulp.watch("../web/**/*.{html,css,js}").on("change", browserSync.reload);
}

// PHP built in server
function phpServer() {
  php.server({ base: "../web/", port: 8010, keepalive: true });
}

function dynamicServer() {
  browserSync.init({
    proxy: "127.0.0.1:8010",
    port: 4000,
    open: true,
    // notify: false,
    xip: true,
    tunnel: "milosvukovic"
  });
  gulp.watch("./scss/**/*.scss", sassCompile);
  gulp.watch("../web/**/*.{php,html,css,js}").on("change", browserSync.reload);
}

// Rerun the task When a file changes
function watchTask() {
  gulp.watch("./scss/**/*.scss", sassCompile);
  gulp.watch("./javascript/**/*.js", javascript);
  gulp.watch("./images/**", imageMin);
}

exports.sass = sassCompile;
exports.fontcopy = fontCopy;
exports.images = imageMin;
exports.javascript = javascript;
exports.static = staticServer;
exports.php = phpServer;
exports.movePhp = movePhp;
exports.dynamic = gulp.series(gulp.parallel(phpServer, dynamicServer));
exports.watch = watchTask;
exports.default = gulp.series(sassCompile, javascript, fontCopy, imageMin);
