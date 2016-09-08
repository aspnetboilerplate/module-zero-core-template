var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');
var path = require('path');
var fs = require('fs');
var xml2js = require('xml2js');

var packagesConfig = path.join(__dirname, 'packages.config');
var packageName = '';

// read nuget package version from packages.config
var xmlParser = new xml2js.Parser();
fs.readFile(packagesConfig, function (err, data) {
    xmlParser.parseString(data, function (err, result) {
        var pkg = result.packages.package.find(function (p) {
            return p.$.id === 'Abp.Web.Resources';
        });
        packageName = pkg.$.id + '.' + pkg.$.version;
    });
});

gulp.task('clean', function () {
    return del([
        'Abp',
        'packages'
    ]);
});

gulp.task('nuget-install', ['clean'], shell.task([
    '.nuget\\NuGet.exe install .\\packages.config -OutputDirectory .\\packages'
]))

gulp.task('copy-resources', function () {
    var contentPath = './packages/' + packageName + '/content/**';
    return gulp.src(contentPath).pipe(gulp.dest('./'));
});

gulp.task('default', ['nuget-install'], function () {
    gulp.start('copy-resources');
});