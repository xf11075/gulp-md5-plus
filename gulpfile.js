var gulp = require("gulp");
var md5 = require("gulp-md5-plus");
var del = require("del");

gulp.task('clean', function(){
    return del(['./output','./manifest.json'])
});

gulp.task('html',function(){
    return gulp.src('./index.html')
        .pipe(gulp.dest('./output/'))
})

gulp.task('css',['html'],function(){
    return gulp.src("./style.css")
        .pipe(md5(10,'./output/index.html',{
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest("./output/css/"));
})

gulp.task('js',['css'],function(){
    return gulp.src("./demo1.js")
        .pipe(md5(10,'./output/*.html',{
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest("./output/js/"));
});

gulp.task('img' , ['css'],function() {
    return gulp.src(['./sub_img/sub1/img.png'],{base:"sub_img"})
        .pipe(md5(10 ,'./output/css/*.css',{
            dirLevel:null,
            mappingFile: 'manifest.json'
        }))
        .pipe(gulp.dest('./output/img/'));
});


gulp.task('default',['clean'],function(){
    gulp.start('html','css','img');
})