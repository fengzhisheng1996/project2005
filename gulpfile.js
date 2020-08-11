//引入gulp,调用包。
const gulp = require('gulp'); //gulp对象
//引入压缩html的包
const html = require('gulp-minify-html');
//引入压缩css的包
const css = require('gulp-clean-css');

//引入监听的包
const watch = require('gulp-watch');


//es6转es5的三个模块
//gulp-babel@7   babel-core       babel-preset-es2015
const babel = require('gulp-babel'); //主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');

//引入压缩js的包
const script = require('gulp-uglify');

//gulp-imagemin图片压缩(png)
const imagemin = require('gulp-imagemin');


//sass编译
//gulp-sass gulp-sourcemaps gulp-load-plugins 
const sass = require('gulp-sass');
//引入生成.map文件模块
const sourcemaps = require('gulp-sourcemaps');
//生成.map文件
const plugins = require('gulp-load-plugins')(); //返回的是一个函数体。需要再次执行。


// gulp.task() : 创建gulp任务
// gulp.src() : 引入文件的目录
// gulp.dest() : 输出文件目录设置
// pipe : 管道流--链式操作的连接点。

// //2.复制文件 - 不需要任何的包
// gulp.task('copyfile', () => {
//     return gulp.src('src/fonts/*') //载入src/fonts下面的所有文件
//         .pipe(gulp.dest('dist/fonts/')); //输出。自动生成。
// });

//3.压缩html文件。
gulp.task('uglifyhtml', () => {
    return gulp.src('src/html/*.html') //载入文件
        .pipe(html()) //压缩
        .pipe(gulp.dest('dist/html/')); //输出
});

//4.压缩css文件。
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css') //载入文件
        .pipe(css()) //压缩
        .pipe(gulp.dest('dist/css/')); //输出
});

//5.压缩js文件。
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({ //先将es6转换成es5
            presets: ['es2015'] //es2015->es6  es2016->es7...
        }))
        .pipe(script()) //再执行压缩
        .pipe(gulp.dest('dist/script/'));
});



//6.编译sass,同时生成.map文件(.map调式文件,调试的核心是scss文件)
// gulp-sass  gulp-sourcemaps gulp-load-plugins
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        //初始化gulp-sourcemaps插件
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed' //压缩的
        }))
        //通过sourcemaps,生成.map文件
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/sass/'));
});

//6.压缩图片
//对png最大的压缩，其他的格式几乎压不动。
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin()) //执行压缩
        .pipe(gulp.dest('dist/img/'));
});


//监听插件 gulp-watch()
//参1:监听的目录，数组的形式
//参2:通过gulp.parallel()并行执行监听任务名。
//监听上面的任务，监听之前任务必须先跑一次。再进行监听。

//任务名为default,直接gulp运行，默认任务名。
gulp.task('default', function() {
    watch(['src/html/*.html', 'src/css/*.css', 'src/script/*.js'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs'));
});