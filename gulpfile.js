const { src, dest, watch, series, parallel } = require("gulp");
// CSS Y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
// IMAGENES
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

const css = async (done) => {
  // compilar sass
  // PASO 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
  done();
};

const dev = (done) => {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
};
const opciones = {
  quality: 50,
};
const imagenesWebp = () => {
  return src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest("build/img"));
};

const imagenesAvif = () => {
  return src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"));
};

const imagenes = () => {
  return src("src/img/**/*")
    .pipe(imagemin({ optimazationLevel: 3 }))
    .pipe(dest("build/img"));
  f;
};
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imagenesWebp = imagenesWebp;
exports.default = series(imagenes, imagenesWebp, imagenesAvif, css, dev);

// SERIES se iniciar la tarea hasta que finaliza, inicia la siguiente

// PARALEL las 2 tareaws comienzan al mismo tiempo
