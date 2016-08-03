import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';
import * as chalk from 'chalk';

// --------------
// Configuration.

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

// export const SUB_PROJECT_NAME = argv['sub-project'] || 'BUTTONS';
// export const SUB_PROJECT_NAME = argv['sub-project'] || 'NO_MATERIAL';
export const SUB_PROJECT_NAME = argv['sub-project'] || 'SCIENTISTS_MATERIAL';

const SUB_PROJECTS = {
  SCIENTISTS_MATERIAL: {
        BOOTSTRAP_MODULE: 'bootstrap',
        BOOTSTRAP_MODULE_HOT_LOADER: 'hot_loader_index',
        SELECTOR: 'sd-app',
        APP_SRC: 'src/scientists_material',
        APP_TITLE: 'Angular 2 scientists (with materials)',
        COMPILATION: {
            INLINE: {
                USE_RELATIVE_PATHS: false
            },
            COMPASS: {
                // NOTE: !!!if true, this will output css files into sass folder!!!
                // due to [issue-61](https://github.com/appleboy/gulp-compass/issues/61)
                GENERIC: false,
                PATHS: ['components/app', 'components/home']
            }
        }
    },
  NO_MATERIAL: {
      BOOTSTRAP_MODULE: 'index',
      BOOTSTRAP_MODULE_HOT_LOADER: 'hot_loader_index',
      SELECTOR: 'sd-app',
      APP_SRC: 'src/no_material',
      APP_TITLE: 'Angular 2 (no materials)',
      COMPILATION: {
          INLINE: {
              USE_RELATIVE_PATHS: true
          }
      }
  },
  BUTTONS: {
      BOOTSTRAP_MODULE: 'main',
      BOOTSTRAP_MODULE_HOT_LOADER: 'hot_loader_main',
      SELECTOR: 'button-basic-usage',
      APP_SRC: 'src/buttons',
      APP_TITLE: 'Angular 2 (with materials) - buttons',
      COMPILATION: {
          INLINE: {
              USE_RELATIVE_PATHS: true
          },
          COMPASS: {
              // NOTE: !!!if true, this will output css files into sass folder!!!
              // due to [issue-61](https://github.com/appleboy/gulp-compass/issues/61)
              GENERIC: false,
              PATHS: ['templates']
          }
      }
  }
};

export const SUB_PROJECT = SUB_PROJECTS[SUB_PROJECT_NAME];
export const COMPASS_CONFIG = SUB_PROJECT.COMPILATION.COMPASS;

export const PORT                 = argv['port']        || 5555;
export const PROJECT_ROOT         = normalize(join(__dirname, '..'));
export const ENV                  = getEnvironment();
export const DEBUG                = argv['debug']       || false;
export const DOCS_PORT            = argv['docs-port'] || 4003;
export const COVERAGE_PORT        = argv['coverage-port'] || 4004;
export const APP_BASE             = argv['base']        || '/';

export const ENABLE_HOT_LOADING   = !!argv['hot-loader'];
export const HOT_LOADER_PORT      = 5578;

export const BOOTSTRAP_MODULE     = ENABLE_HOT_LOADING ?
    SUB_PROJECT.BOOTSTRAP_MODULE_HOT_LOADER : SUB_PROJECT.BOOTSTRAP_MODULE;

export const APP_TITLE            = SUB_PROJECT.APP_TITLE;

export const APP_SRC              = SUB_PROJECT.APP_SRC;
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const DOCS_DEST            = 'docs';
export const DIST_DIR             = 'dist';
export const DEV_DEST             = `${DIST_DIR}/dev`;
export const PROD_DEST            = `${DIST_DIR}/prod`;
export const TMP_DIR              = `${DIST_DIR}/tmp`;
export const APP_DEST             = `${DIST_DIR}/${ENV}`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const FONTS_DEST           = `${APP_DEST}/fonts`;
export const JS_DEST              = `${APP_DEST}/js`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
export const VERSION              = appVersion();

export const CSS_PROD_BUNDLE      = 'all.css';
export const JS_PROD_SHIMS_BUNDLE = 'shims.js';
export const JS_PROD_APP_BUNDLE   = 'app.js';

export const VERSION_NPM          = '2.14.2';
export const VERSION_NODE         = '4.0.0';

export const NG2LINT_RULES        = customRules();

interface IDependency {
  src: string;
  inject: string | boolean;
  asset?: boolean; // if set to true it will be copied to final destination
  dest?: string;
}

// Declare local files that needs to be injected
const SUB_PROJECTS_FILES = {
  NO_MATERIAL: {
      APP_ASSETS : [
          { src: `${ASSETS_SRC}/main.css`, inject: true }
      ],
      DEV_NPM_DEPENDENCIES: [
      ],
      PROD_NPM_DEPENDENCIES: [
      ]
  },
  BUTTONS: {
      APP_ASSETS : [
          { src: 'node_modules/ng2-material/dist/MaterialIcons-Regular.*', asset: true, dest: CSS_DEST }
      ],
      DEV_NPM_DEPENDENCIES: [
          { src: 'node_modules/ng2-material/dist/ng2-material.css', inject: true, dest: CSS_DEST },
          { src: 'node_modules/ng2-material/dist/font.css', inject: true, dest: CSS_DEST }
      ],
      PROD_NPM_DEPENDENCIES: [
          { src: 'node_modules/ng2-material/dist/ng2-material.css', inject: true, dest: CSS_DEST },
          { src: 'node_modules/ng2-material/dist/font.css', inject: true, dest: CSS_DEST }
      ]
  },
  SCIENTISTS_MATERIAL: {
      APP_ASSETS : [
          { src: 'node_modules/ng2-material/dist/MaterialIcons-Regular.*', asset: true, dest: CSS_DEST }
      ],
      DEV_NPM_DEPENDENCIES: [
          { src: 'node_modules/ng2-material/dist/ng2-material.css', inject: true, dest: CSS_DEST },
          { src: 'node_modules/ng2-material/dist/font.css', inject: true, dest: CSS_DEST }
      ],
      PROD_NPM_DEPENDENCIES: [
          { src: 'node_modules/ng2-material/dist/ng2-material.css', inject: true, dest: CSS_DEST },
          { src: 'node_modules/ng2-material/dist/font.css', inject: true, dest: CSS_DEST }
      ]
  }
};

export const SUB_PROJECTS_FILE = SUB_PROJECTS_FILES[SUB_PROJECT_NAME];

if (ENABLE_HOT_LOADING) {
  console.log(chalk.bgRed.white.bold('The hot loader is temporary disabled.'));
  process.exit(0);
}

// Declare NPM dependencies (Note that globs should not be injected).
export const DEV_NPM_DEPENDENCIES: IDependency[] = normalizeDependencies([
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
  { src: 'es6-shim/es6-shim.js', inject: 'shims' },
  { src: 'systemjs/dist/system.src.js', inject: 'shims' },
  { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims' },
  { src: 'rxjs/bundles/Rx.js', inject: 'libs' },
  { src: 'angular2/bundles/angular2.js', inject: 'libs' },
  { src: 'angular2/bundles/router.js', inject: 'libs' },
  { src: 'angular2/bundles/http.js', inject: 'libs' },
]);

export const PROD_NPM_DEPENDENCIES: IDependency[] = normalizeDependencies([
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
  { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
  { src: 'systemjs/dist/system.js', inject: 'shims' },
  { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' },
]);

export const DEV_DEPENDENCIES = DEV_NPM_DEPENDENCIES.
    concat(SUB_PROJECTS_FILE.APP_ASSETS, SUB_PROJECTS_FILE.DEV_NPM_DEPENDENCIES);
export const PROD_DEPENDENCIES = PROD_NPM_DEPENDENCIES.
    concat(SUB_PROJECTS_FILE.APP_ASSETS, SUB_PROJECTS_FILE.PROD_NPM_DEPENDENCIES);

export const DEPENDENCIES = ENV === 'dev' ? DEV_DEPENDENCIES : PROD_DEPENDENCIES;
// console.log(chalk.bgWhite.blue.bold(' DEPENDENCIES: '), chalk.blue(JSON.stringify(DEPENDENCIES)));

// ----------------
// SystemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    [BOOTSTRAP_MODULE]: `${APP_BASE}${BOOTSTRAP_MODULE}`,
    'angular2/*': `${APP_BASE}angular2/*`,
    'rxjs/*': `${APP_BASE}rxjs/*`,
    '*': `${APP_BASE}node_modules/*`
  },
  packages: {
    angular2: { defaultExtension: false },
    rxjs: { defaultExtension: false }
  }
};

// TODO: Fix
// const SYSTEM_CONFIG_PROD = {
//   defaultJSExtensions: true,
//   bundles: {
//     'bundles/app': ['bootstrap']
//   }
// };

// export const SYSTEM_CONFIG = ENV === 'dev' ? SYSTEM_CONFIG_DEV : SYSTEM_CONFIG_PROD;

export const SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;

// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
export const SYSTEM_BUILDER_CONFIG = {
  defaultJSExtensions: true,
  // https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/loader-config.md#paths-implementation
  paths: {
    [`${TMP_DIR}/*`]: `${TMP_DIR}/*`,
    '*': 'node_modules/*'
  }
};

// --------------
// Private.

// finds the full path for a dependency, like paths for packages from node_modules
// so we do not need to refer to them with node_modules prefixes
// NOTE: this is not true for non-js files
function normalizeDependencies(deps: IDependency[]) {
  deps
    .filter((d:IDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:IDependency) => d.src = require.resolve(d.src));
  return deps;
}

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

function customRules(): string[] {
  var lintConf = JSON.parse(readFileSync('tslint.json').toString());
  return lintConf.rulesDirectory;
}

function getEnvironment() {
  let base:string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}
