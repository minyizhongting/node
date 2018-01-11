var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
// var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
// var sass = require('gulp-ruby-sass');

var gutil = require('gulp-util');
var watchPath = require('gulp-watch-path');	//获取编译路径和输出路径
var combiner = require('stream-combiner2');	//捕获错误信息
var sourcemaps = require('gulp-sourcemaps');	//压缩后代码出错时方便调试
var autoprefixer = require('gulp-autoprefixer');	//css前缀
var browserSync = require('browser-sync');	//实时刷新
var rename = require('gulp-rename');	//文件重命名
var cssver = require('gulp-make-css-url-version');	//css中引用url添加版本号
var htmlmin = require('gulp-htmlmin');	//压缩html，可压缩js、css去除页面空格注释等
var concat = require('gulp-concat');	//合并多个文件，减少页面请求
var jshint = require('gulp-jshint');	//js代码校验

/* 任务 */
gulp.task('default',function(){
	gulp.start('script','css');
});

gulp.task('script',function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('css',function(){
	gulp.src('src/css/*.css')
		.pipe(cssver())
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('html',function(){
	gulp.src('src/html/*.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('dist/html'));
});

gulp.task('imagemin',function(){
	gulp.src('src/images/*.*')
		.pipe(imagemin({progressive:true}))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('less',function(){
	gulp.src('src/less/**.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('watch',['default'],function(){
	var files = [
		'src/js/*.js',
		'src/css/*.css'
	];
	gulp.watch(files,function(event){
		console.log('Event type: ' + event.type);
		console.log('Event path: ' + event.path);
	});
	gulp.watch('src/js/*.js',['script']);
	gulp.watch('src/css/*.css',['css']);
});

gulp.task('end',function(){
	gulp.run('css','js');
});

/* 其他 */
gulp.task('util',function(){
	gutil.log('message')
	gutil.log(gutil.colors.red('error'))
	gutil.log(gutil.colors.green('message: ')+'some')
});

var handleError = function(err){
	var colors = gutil.colors;
	console.log('\n');
	gutil.log(colors.red('Error!'));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: ' + colors.red(err.lineNumber));
	gutil.log('message: ' + err.message);
	gutil.log('plugin: ' + colors.yellow(err.plugin));

};

gulp.task('watchjs',function(){
	gulp.watch('src/js/**/*.js',function(event){
		var paths = watchPath(event,'src/','dist/');
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);

		var combined = combiner.obj([
			gulp.src(paths.srcPath),
			sourcemaps.init(),
			uglify(),
			sourcemaps.write('./'),
			gulp.dest(paths.distDir)
		]);
		combined.on('error',handleError)
	});
});

gulp.task('watchcss',function(){
	gulp.watch('src/css/**/*.css',function(event){
		var paths = watchPath(event,'src/','dist/');
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);

		gulp.src(paths.srcPath)
			.pipe(sourcemaps.init())
			.pipe(autoprefixer({
				browsers: 'last 2 versions'
			}))
			.pipe(minifycss())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(paths.distDir))
	});
});

gulp.task('watchb',['default'],function(){
	browserSync.init({
		server:{
			baseDir:'dist'
		}
	});
	gulp.watch('src/css/*.css',['css',browserSync.reload]);
	gulp.watch('src/html/*.html',['html',browserSync.reload]);
});

gulp.task('rename',function(){
	gulp.src('src/js/a.js')
		.pipe(uglify())
		.pipe(rename('aaaaaa.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('testhtml',function(){
    var options = {
        removeComments: true,   //清除HTML注释
        collapseWhitespace: false,  //压缩HTML
        collapseBolleanAttributes: true,  //省略布尔属性的值
        removeEmptyAttributes: true,  //删除所有空格作属性值
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src('src/html/*.html')
    	.pipe(htmlmin(options))
    	.pipe(gulp.dest('dist/html'));
});

gulp.task('concat',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('clean',function(){
	gulp.src(['./dist/css','./dist/js','./dist/html'],{read:false})
		.pipe(clean());
});

gulp.task('hint',function(){
	gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});