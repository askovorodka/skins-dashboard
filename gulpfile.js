var gulp = require('gulp'),
    cp = require('child_process'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    jsonServer = require("gulp-json-srv");

/**
 * API Server (Database)
 */

 var server = jsonServer.create({
  port: 3001,
  baseUrl: '/api',
  cumulative: true,
 });

gulp.task("db", function(){
    return gulp.src("./data/restore.json")
        .pipe(server.pipe());
});

gulp.task("watch", function () {
    gulp.watch(["./data/restore.json"], ["db"]);
});

gulp.task("default", ["db", "watch"]);