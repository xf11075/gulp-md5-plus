#npm i gulp-md5-plus gulp jsonfile del gulp-uglify gulp-cssmin gulp-htmlmin --save-dev

## gulpfile.js
var gulp = require("gulp");
var md5 = require("gulp-md5-plus");//添加MD5
var del = require("del");//清除旧版本文件
var uglify = require("gulp-uglify");//压缩js
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');//压缩html