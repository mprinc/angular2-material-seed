import {join} from 'path';
import {APP_SRC, APP_DEST} from '../config';

// copies set of asset files (not *.ts) from APP_SRC to APP_DEST
//  it will copy js files, css, html files,
//  because in dev they should not be combined into bundles
export = function buildAssetsDev(gulp, plugins) {
  return function () {
    return gulp.src([
        join(APP_SRC, '**'),
        '!' + join(APP_SRC, '**', '*.ts')
      ])
      .pipe(gulp.dest(APP_DEST));
  };
}
