var gulp = require("gulp");
var md5 = require("gulp-md5-plus");//添加MD5
var del = require("del");//清除旧版本文件
var uglify = require("gulp-uglify");//压缩js
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');//压缩html
var replace = require('gulp-replace-pro');//替换
var through = require('through2');
var runSequence = require('run-sequence');//顺序执行
// var rename = require("gulp-rename");//文件重命名
var curr = '';//替换后的路径

gulp.task('clean', function(){
    return del(['./output','./manifest.json'])
});

gulp.task('html',function(){
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minfyJS: true,//压缩JS
        minfyCss: true,//压缩CSS
    };
    return gulp.src('./index.html')
        // .pipe(htmlmin(options))
        .pipe(gulp.dest('./output/'))
});

gulp.task('html2',function(){
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minfyJS: true,//压缩JS
        minfyCss: true,//压缩CSS
    };
    return gulp.src('./home.html')
        // .pipe(htmlmin(options))
        .pipe(gulp.dest('./output/'))
});

gulp.task('css',function(){
    return gulp.src("./style.css")
        .pipe(cssmin())
        .pipe(md5(10,'',{//由于css输出目录结构改变，所以等下自己替换路径
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest("./output/css"))
         .pipe(through.obj(function(file,enc,cb){
            curr = file.relative;//保存输出的文件名，替换路径时使用
            this.push(file);
            cb();
        }))
});

gulp.task('cssRe',function(){//替换index.html里css的引入路径
    return gulp.src('./output/index.html')
    .pipe(replace({
        './style.css': './css/'+curr,
    }))
    .pipe(gulp.dest('./output/'));
})

gulp.task('js',function(){
    return gulp.src("./demo.js")
        // .pipe(uglify())
        .pipe(md5(10,'./output/index.html',{
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest("./output/"));
});

gulp.task('img',function() {
    return gulp.src(['./img.png'])
        .pipe(md5(10 ,'',{
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest('./output/'))
        .pipe(through.obj(function(file,enc,cb){
            curr = file.relative;
            this.push(file);
            cb();
        }))
});

gulp.task('imgRe',function(){
    return gulp.src(['./output/css/*.css'])
    .pipe(replace({
        './img.png': '../'+curr,
    }))
    .pipe(gulp.dest('./output/css'));
})

gulp.task('default',function(done){
    runSequence(
        ['html'],
        ['html2'],
        ['css'],
        ['cssRe'],
        ['js'],
        ['img'],
        ['imgRe'],
    done,);
});