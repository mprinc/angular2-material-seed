import {join} from 'path';
import {APP_SRC} from '../config';

// compiles all ts files (except tests/template ones) and type definitions,
// replace templates in them and adds sourcemaps and copies into APP_DEST
export = function buildCss(gulp, plugins) {
  return function () {
    // src files are all ts files (except tests/template ones) and type definitions
    let src = [
      join(APP_SRC, '**/*.scss')
    ];
    return gulp.src(src)
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(gulp.dest(APP_SRC));
  };
};
