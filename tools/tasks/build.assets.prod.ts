import {join} from 'path';
import {APP_SRC, APP_DEST, ASSETS_SRC} from '../config';

// copies set of asset files (not *.ts, *.js, *.html, *.css) from APP_SRC to APP_DEST
// it excludes empty folders
export = function buildAssetsProd(gulp, plugins) {
  // TODO There should be more elegant to prevent empty directories from copying
  let es = require('event-stream');
  var onlyDirs = function (es) {
    // https://www.npmjs.com/package/event-stream#map-asyncfunction
    return es.map(function (file, cb) {
      if (file.stat.isFile()) {
        return cb(null, file);
      } else {
        return cb();
      }
    });
  };
  return function () {
    return gulp.src([
        join(APP_SRC, '**'),
        '!' + join(APP_SRC, '**', '*.ts'),
        '!' + join(APP_SRC, '**', '*.css'),
        '!' + join(APP_SRC, '**', '*.html'),
        '!' + join(ASSETS_SRC, '**', '*.js')
      ])
      .pipe(onlyDirs(es))
      .pipe(gulp.dest(APP_DEST));
  };
}
