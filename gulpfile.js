var gulp = require("gulp");
var md5 = require("gulp-md5-plus");//添加MD5
var del = require("del");//清除旧版本文件
var uglify = require("gulp-uglify");//压缩js
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');//压缩html
// var rename = require("gulp-rename");//文件重命名

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

gulp.task('css',['html2'],function(){
    return gulp.src("./style.css")
        // .pipe(cssmin())
        .pipe(md5(10,['./output/index.html','./output/home.html'],{
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest("./output/"));
});

gulp.task('js',['css'],function(){
    return gulp.src("./demo1.js")
        .pipe(uglify())
        .pipe(md5(10,'./output/*.html',{
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest("./output/"));
});

gulp.task('img' , ['js'],function() {
    return gulp.src(['./img.png'])
        .pipe(md5(10 ,'./output/*.css',{
            dirLevel:null,
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest('./output/'));
});

gulp.task('default',['clean'],function(){
    gulp.start('html','html2','css','js','img');
})