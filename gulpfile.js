const gulp = require('gulp');
const del = require('del');
const combiner = require('stream-combiner2')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const pxtorpx = require('postcss-px2rpx')
const rename = require('gulp-rename');
const base64 = require('postcss-font-base64')
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');

const dist = './dist';
const src = './src';

// less wxss 转换为 wxss
gulp.task('wxss', () => {
  const combined = combiner.obj([
    gulp.src(`${src}/**/*.{wxss,less}`)
    .pipe(less())
    .pipe(postcss([pxtorpx({
        screenWidth: 750, // 设计稿屏幕, 默认750
        wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
        remPrecision: 6 // 小数精度, 默认6
    }), base64()]))
    .pipe(rename((path) => (path.extname = '.wxss')))
    .pipe(gulp.dest(dist))
  ]);
  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console)); // handleError
  return combined;
})

// copy 复制 
gulp.task('wxml', function() {
  return gulp.src(`${src}/**/*.wxml`)
  .pipe(gulp.dest('dist'))
});

gulp.task('json', () => {
  return gulp.src(`${src}/**/*.json`)
  .pipe(gulp.dest(dist))
})

gulp.task('images', () => {
  return gulp.src(`${src}/images/**`)
  .pipe(gulp.dest(`${dist}/images`))
})

gulp.task('wxs', () => {
  return gulp.src(`${src}/**/*.wxs`)
  .pipe(gulp.dest(dist))
})

// 清空 dist 文件夹中所有的文件
gulp.task('clean', () => {
  return del(['./dist/**'])
})

gulp.task('js', () => {
  gulp.src(`${src}/**/*.js`)
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
//   .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(dist))
});


gulp.task('watch', () => {
  ;['wxml', 'wxss', 'js', 'json', 'wxs'].forEach((v) => {
    gulp.watch(`${src}/**/*.${v}`, [v])
  })
  gulp.watch(`${src}/images/**`, ['images'])
  gulp.watch(`${src}/**/*.less`, ['wxss'])
})

gulp.task('dev', function(cb) {
  runSequence(
    'clean',
    ['json', 'images', 'wxml', 'wxss', 'js', 'wxs'],
    'watch',
    cb
  );
});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    ['json', 'images', 'wxml', 'wxss', 'js', 'wxs'],
    cb
  );
});


