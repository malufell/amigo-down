const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const server = require("browser-sync").create();
const { watch, series } = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const ghPages = require("gulp-gh-pages");

gulp.task("deploy", function () {
  return gulp.src("./docs/**/*").pipe(
    ghPages({
      remoteUrl: "https://github.com/malufell/amigo-down",
      branch: "gh-pages",
    })
  );
});

const paths = {
  scripts: {
    src: "./",
    dest: "./docs/",
  },
};

// Reload Server
async function reload() {
  server.reload();
}

// Sass compiler
async function compileSass() {
  gulp
    .src("./sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./assets/css"));
}

// Copy assets after build
async function copyAssets() {
  gulp.src(["assets/**/*"]).pipe(gulp.dest(paths.scripts.dest));
}

// Build files html and reload server
async function buildAndReload() {
  await includeHTML();
  await copyAssets();
  reload();
}

async function includeHTML() {
  return gulp
    .src([
      "*.html",
      "!head.html", // ignore
      "!header.html", // ignore
      "!footer.html", // ignore
      "!script.html", // ignore
    ])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

exports.default = async function () {
  // Init serve files from the build folder
  server.init({
    server: {
      baseDir: paths.scripts.dest,
    },
  });
  // Build and reload at the first time
  buildAndReload();
  // Watch Sass task
  watch("./sass/**/*.scss", series(compileSass));
  // Watch task
  watch(["*.html", "assets/**/*"], series(buildAndReload));
};
