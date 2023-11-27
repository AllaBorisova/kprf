const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');

const cleanBuild = () => {
  return gulp
    .src(['./build/*', '!./build/fonts', '!./build/libs'], { read: false })
    .pipe(clean());
};

const html = () => {
  return gulp
    .src('./dev/pug/pages/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('./build'));
};

const styles = () => {
  return gulp
    .src('./dev/styles/*.scss')
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
};
const scripts = () => {
  return (
    gulp
      .src('./dev/scripts/*.js')
      // .pipe(
      //   babel({
      //     presets: ["@babel/env"],
      //   })
      // )
      //.pipe(uglify())
      //.pipe(concat("main.min.js"))
      .pipe(gulp.dest('./build/js'))
  );
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
};
const images = () => {
  return gulp
    .src('./dev/img/*')
    .pipe(
      imagemin({
        verbose: true,
      })
    )
    .pipe(gulp.dest('./build/img'));
};
const svg = () => {
  return gulp
    .src('./dev/img/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(gulp.dest('./build/img'));
};

// gulp.task("watch", function () {
//   watch("./dev/index.html", gulp.parallel(browserSync.reload));
// });

// gulp.task("server", function () {
//   browserSync.init({
//     server: {
//       baseDir: "./dev/",
//     },
//   });
// });

const watchAll = () => {
  gulp.watch('./dev/pug/**/*.pug', html);
  gulp.watch('./dev/styles/**/*.scss', styles);
  gulp.watch('./dev/scripts/**/*.js', scripts);
  gulp.watch('./dev/img/*.svg', svg);
  gulp.watch('./dev/img/*', images);
};

exports.dev = gulp.series(
  cleanBuild,
  gulp.parallel(html, styles, scripts, images, svg),
  gulp.parallel(watchAll, server)
);
