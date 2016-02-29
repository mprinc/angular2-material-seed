import {join} from 'path';
import {APP_SRC, APP_DEST, APP_BASE, DEV_DEPENDENCIES} from '../config';
import {templateLocals} from '../utils';
import * as slash from 'slash';

// inject all (shims/libs/and inject='true') dependencies under coresponding placeholders
// adds a versioning (current date) sufix to each file to avoid cashing issues
export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, 'index.html'))
      .pipe(inject('shims')) // inject all depencencies (d.inject == 'shims') under 'shims' placeholder
      .pipe(inject('libs')) // d.inject == 'libs'
      .pipe(inject())   // inject all depencencies (d.inject == true)
                        // under default ('inject:js' or 'inject:css' depending on the file type) placeholder
      // uses CONFIG exports in templates
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };

  // injects all dependencies (filenames) that conforms to the inject parameter
  // into a html file
  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath()
    });
  }

  // get all dependencies that conforms with the inject == name or inject == true if no name
  function getInjectablesDependenciesRef(name?: string) {
    return DEV_DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  // allows dependencies to have APP_SRC path in it
  // (it get replaced with APP_DEST)
  function mapPath(dep) {
    let envPath = dep.src;
    if (envPath.startsWith(APP_SRC)) {
      envPath = join(APP_DEST, dep.src.replace(APP_SRC, ''));
    }
    return envPath;
  }

  // adds date (to create unique version of the filename in order to avoid caching issues)
  function transformPath() {
    return function (filepath) {
      arguments[0] = join(APP_BASE, filepath) + `?${Date.now()}`;
      return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
  }

};
