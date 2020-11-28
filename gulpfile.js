const { src, dest, symlink, parallel, watch } = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();


// Browser Sync
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("*.html").on('change', browserSync.reload);
}

// Sass (scss -> css)
function sass(){

        return src('./assets/sass/global.scss')
        .pipe(gulpSass())
        .pipe(dest('./assets/css'))
        .pipe(browserSync.stream());
    }
// Watch Sass
function watcher(done){
    //watch('./sass/*.scss', sass)
    watch('./assets/sass/*.scss', sass)
    watch('./assets/sass/components/*.scss', sass)
    browserSync.reload()  
    done();
}

// Clean
function clean() {
    return del('./img/')
}

module.exports = {
    browser: parallel(browser, watcher),
    sass, watcher, clean
}