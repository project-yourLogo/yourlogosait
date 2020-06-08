
let folder__project = 'dist';
let folder__source = '#src';

let path = {
    build : {
        html : folder__project + '/',
        css : folder__project + '/css/',
        js : folder__project + '/js/',
        images : folder__project + '/images/',
        fonts : folder__project + '/fonts/',
    },
    src : {
        html : folder__source + '/*.html',
        css : folder__source + '/scss/style.scss',
        js : folder__source + '/js/script.js',
        images : folder__source + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts : folder__source + '/fonts/*.ttf',
    },
    watch : {
        html : folder__source + '/**/*.html',
        css : folder__source + '/scss/**/*.scss',
        js : folder__source + '/js/**/*.js',
        images : folder__source + '/images/**/*.{jpg,png,svg,gif,ico,webp}',

    },
    clean : './' + folder__project + '/'
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();
    scss = require('gulp-sass');
    imagemin = require('gulp-imagemin');
    fileinclude = require('gulp-file-include')

function browserSync(params){
    browsersync.init({
        server : {
            baseDir : './' + folder__project + '/'
        },
        port : 3000,
        notify : false
    })
}

function html () {
    return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}
function js () {
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function img () {
    return src(path.src.images)
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream())
}

function css () {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle : 'expanded'
        })  
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function watchFiles () {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.images], img);
    gulp.watch([path.watch.js], js);

}


let build = gulp.series(gulp.parallel(css,html,img,js));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.img = img;
exports.css = css;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
