import * as merge from 'merge-stream';
import {join} from 'path';
import {APP_SRC, COMPASS_CONFIG} from '../config';
// import {noop} from 'gulp-util';

// compiles all ts files (except tests/template ones) and type definitions,
// replace templates in them and adds sourcemaps and copies into APP_DEST
export = function buildCss(gulp, plugins) {
  return function() {
    //   if(!COMPASS_CONFIG) return noop();
    //   gulp.src(APP_SRC)
    // .pipe(noop());

    //the title and icon that will be used for the Grunt notifications
    var notifyInfo = {
      title: 'Gulp',
      icon: require.resolve('gulp-notify/assets/gulp-error.png')
    };

    //error notification settings for plumber
    var plumberErrorHandler = {
      errorHandler: plugins.notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: 'Error: <%= error.message %>'
      })
    };

    console.log('__dirname: ', __dirname);
    console.log('COMPASS_CONFIG.GENERIC: ', COMPASS_CONFIG.GENERIC);

    var compassTask = function (scssFiles, distPathCss, projectPath){
        console.log('[compassTask] projectPath: ', projectPath);
        console.log('[compassTask] scssFiles: ', scssFiles);
        console.log('[compassTask] distPathCss: ', distPathCss);

        // https://www.npmjs.com/package/gulp-compass
        // https://www.npmjs.com/package/gulp-compass#sass
        // http://stackoverflow.com/questions/29481629/stylesheets-must-be-in-the-sass-directory-error-with-gulp-compass
        // https://github.com/appleboy/gulp-compass/issues/61
        return gulp.src(scssFiles)
            .pipe(plugins.plumber(plumberErrorHandler))
            .pipe(plugins.compass({
            outputStyle: 'nested',
            environment: 'development',
            noLineComments: true,
            require: ['susy', 'breakpoint'],
            trace: true,
            style: 'nested',
            relative: true,
            sourcemap: true,
            css: distPathCss,
            sass: projectPath,
            //   add_import_path: projectPath + '/',
            //   project: projectPath + '/',
            task: 'compile' // 'watch'
          }))
          // doesn't have any effect
            .pipe(gulp.dest(distPathCss + '/css'));
    };

    var appPath;
    var projectPath;
    var distPath;
    var distPathCss;
    var scssFiles;

    if (COMPASS_CONFIG.GENERIC) { // NOTE: !!!This will output css files into sass folder!!!
        // due to [issue-61](https://github.com/appleboy/gulp-compass/issues/61)
      appPath = APP_SRC;

      projectPath = join(__dirname, '../..', appPath);
      distPath = APP_SRC;
      distPathCss = join(distPath, '');
      //  	scssFiles = ['./**/sass/*.scss'];
      scssFiles = join(appPath, '**/sass/*.scss');
      var task = compassTask(scssFiles, distPathCss, projectPath);
      return task;
    } else {
      // drawback: we have to run compass for each path separately
      var tasks = COMPASS_CONFIG.PATHS.map(function(path){
          appPath = join(APP_SRC, path);
          projectPath = join(__dirname, '../..', appPath, 'sass');
          distPath = join(APP_SRC, path);
          distPathCss = join(distPath, '');
          scssFiles = [join(appPath, '*.scss')];
          var task = compassTask(scssFiles, distPathCss, projectPath);
          return task;
      });
      return merge(...tasks);
    }
  };
};
