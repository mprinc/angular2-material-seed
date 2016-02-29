import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

// --------------
// Clean (override).
gulp.task('clean', done => task('clean', 'all')(done));
gulp.task('clean.dev', done => task('clean', 'dev')(done));
gulp.task('clean.prod', done => task('clean', 'prod')(done));
gulp.task('check.versions', () => task('check.versions'));
gulp.task('build.docs', () => task('build.docs'));
gulp.task('serve.docs', () => task('serve.docs'));
gulp.task('serve.coverage', task('serve.coverage'));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.prod', // cleans prod (folder, ...)
              'tslint', // ts linting
              'build.assets.dev', // asset files (not *.ts) from APP_SRC -> APP_DEST
              'build.js.dev', // compiles ts files, replace templates and adds sourcemaps -> APP_DEST
              'build.index.dev', // inject all dependencies under coresponding placeholders
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev', // watch for any change in the APP_SRC folder
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', done =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.e2e',
              'build.index.dev',
              done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence('clean.prod', // cleans prod (folder, ...)
              'tslint', // ts linting
              'build.assets.prod', // copies set of asset files to APP_DEST
              'build.html_css.prod',    // project css and html (templates) -> TMP_DIR,
                                        // external css -> CSS_DEST
              'build.js.prod', // ng2/Lo-Dash/Underscore templates, compiles typescript -> TMP_DIR
              'build.bundles', // minify all js dependencies -> JS_DEST/JS_PROD_SHIMS_BUNDLE
              'build.bundles.app',  // builds from SYSTEM_BUILDER_CONFIG.paths (all code used in the project)
                                    // a SystemJS bundle into JS_DEST/JS_PROD_APP_BUNDLE
              'build.index.prod', // injects css/js shims/bundles -> APP_SRC/'index.html'
              done));

// --------------
// Build test.
gulp.task('build.test', done =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.test',
              'build.index.dev',
              done));

// --------------
// Build test watch.
gulp.task('build.test.watch', done =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Docs
// Disabled until https://github.com/sebastian-lenz/typedoc/issues/162 gets resolved
gulp.task('docs', done =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', done =>
  runSequence('build.dev',
              'server.start',
              'watch.serve',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', done =>
  runSequence('build.e2e',
              'server.start',
              'watch.serve',
              done));

// --------------
// Serve prod
gulp.task('serve.prod', done =>
  runSequence('build.prod',
              'server.start',
              'watch.serve',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('build.test',
              'karma.start',
              done));
