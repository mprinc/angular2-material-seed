# Introduction

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/mgechev/angular2-seed.svg?branch=master)](https://travis-ci.org/mgechev/angular2-seed)
[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mgechev/angular2-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/mgechev/angular2-seed.svg)](https://david-dm.org/mgechev/angular2-seed)
[![devDependency Status](https://david-dm.org/mgechev/angular2-seed/dev-status.svg)](https://david-dm.org/mgechev/angular2-seed#info=devDependencies)

# Building description (Documentation)

## Development

For additional info about extending build process, please read:

+ [Add custom Gulp task](https://github.com/mgechev/angular2-seed/wiki/Add-custom-Gulp-task)
+ [Add an external styles](https://github.com/mgechev/angular2-seed/wiki/Add-an-external-styles)
+ [Add external dependency](https://github.com/mgechev/angular2-seed/wiki/Add-external-dependency)
+ [Add external fonts](https://github.com/mgechev/angular2-seed/wiki/Add-external-fonts)
### Building Order
+ **build.dev** - builds dev version
    + **clean.prod** - cleans prod (folder, ...)
    + **tslint** - ts linting
    + **build.compass** - compiles COMPASS files -> APP_DEST
    + **build.assets.dev** - copies asset files (not *.ts) from APP_SRC -> APP_DEST, and dependencies assets -> d.dest
    + **build.js.dev** - compiles ts files, replace templates and adds sourcemaps -> APP_DEST
    + **build.index.dev** - inject all dependencies under coresponding placeholders
+ **server.start** - starts
+ **watch.serve** - watch on the project changes
    + if any file in APP_SRC is changed it runs 'build.dev' again

#### Server

Afet the building process is finished server will start at the ```config.ts:PORT```. In order to change paths that will be matched and transformed on HTTP requests, check at:  ```tools/utils/code_change_tools.ts:runServer:routes```

### Assets
+ all files from the app source folder (config.ts:APP_SRC) are copied to the dev folder (config.ts:APP_DEST)  at the (relatively) same subfolder
+ excluded files are:
    + *.ts

### ng2 HTML templates and CSS
+ html/css refered inside the ng components are not explicitly treated and embeded
    + if they do exist in the app src folder (which is expected) then they are treated as assets

### Compass SASS files
+ There are two options how SASS files can be treated (this is unfortunatelly due to wicked behaviour of gulp.compass and might be resolved in the future)
+ **generic**:
    + compile and deploy all SASS files in their coresponding SASS folders
+ **per-sass folder**:
    + for each sass folder specify its path and
    + optionally (destDir) destination folder
        + if omitted compiled css files will be deployed in the subfolder of the APP_DEST folder
    + optionally (cssDir) css-deployment subfolder
        + if omitted compiled css files will be deployed in the parent folder, just outside the sass folder

### Pure (non-compass) SASS files
+

### CSS
+ all css files from dependencies (config.ts) are injected as references in html
+ all css files in the app src folder are treated as assets

### HTML
+ check assets

### JS
+ all js files from dependencies (config.ts) are injected as references in html
+ check assets

## Production

### Assets
+ all files from the app source folder (config.ts:APP_SRC) are copied to the dev folder (config.ts:APP_DEST)  at the (relatively) same subfolder
+ excluded files are:
    + *.ts, *.js
    + *.html
    + *.css

### ng2 HTML templates and CSS
+ html and css files refered inside the ng components are embeded in the js file representing that component

### SASS files

### CSS
+ all css files from dependencies (config.ts) are bundled together and bulde reference is injected in the html

### JS
+ all js files are bundled based on the injection type together and bulde references are injected in html

# Angular2-material-seed (Documentation)

**NOTE**: This is a fork of the work of other great guys (please read in further chapters). It has few additional extensions

+ **Documentation** of compilation and building process (both prod and dev) and all tasks. It is both for novice and more experienced guys
+ Support for **multiple sub-projects** that can be chosen among in ```config.ts``` file, currently it supports
    + original Angular2-seed example with the list of computer scientists
    + ng2-material version of the same project
    + plain and simple ng2-material example from angular-materials (simple single page ng2-material project with list of buttons)
+ **Updated dependencies** to the currently newest ones (Angular2, ng2-material, etc)
+ Build support (extended ```tools/tasks/build.assets.dev.ts```, ```tools/tasks/build.assets.prod.ts```) for adding **asset dependencies** in the ```config.ts``` file. This helps to copy to project external dependencies, like ng2-material fonts.
+ **SASS** support with gulp-notify
+ **COMPASS** support but still not doing great due to the [issue-61](https://github.com/appleboy/gulp-compass/issues/61)

# Angular2-material (Documentation)

**NOTE: This project is fork of the project [angular2-seed](https://mgechev.github.io/angular2-seed/), but then it is manualy patched with [Justin DuJardin](https://github.com/justindujardin)'s [justindujardin/angular2-seed](https://github.com/justindujardin/angular2-seed) where he basically integrated his [ng2-material](https://github.com/justindujardin/ng2-material).**

# Angular2-seed (Documentation)

**NOTE: The following text is comming from [angular2-seed](https://mgechev.github.io/angular2-seed/) that this project is forked from and it is kept here as a valuable source of knowledge and practice.**

A seed project for Angular 2 apps.

It is something similar to the Angular Quick Start but does the entire build with gulp.

`angular2-seed` provides the following features:

- Ready to go, statically typed build system using gulp for working with TypeScript.
- Production and development builds.
- Sample unit tests with Jasmine and Karma including code coverage via [istanbul](https://gotwarlost.github.io/istanbul/).
- End-to-end tests with Protractor.
- Development server with Livereload.
- Following the [best practices for your application’s structure](https://github.com/mgechev/angular2-style-guide).
- Manager of your type definitions using [typings](https://github.com/typings/typings).
- Basic Service Worker, which implements "Cache then network strategy".

# How to start

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7.

You must have `ts-node` installed as global. If you don't, use:

```bash
npm install -g ts-node
```

In order to start the seed use:


```bash
git clone --depth 1 https://github.com/mgechev/angular2-seed.git
cd angular2-seed
# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
npm run docs

# dev build
npm run build.dev
# prod build
npm run build.prod
```

_Does not rely on any global dependencies._

# Table of Content

- [Introduction](#introduction)
- [How to start](#how-to-start)
- [Table of Content](#table-of-content)
- [Configuration](#configuration)
- [How to extend?](#how-to-extend)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Examples](#examples)
- [Directory Structure](#directory-structure)
- [Contributors](#contributors)
- [Change Log](#change-log)
- [License](#license)

# Configuration

Default application server configuration

```javascript
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

# How to extend?

Visit the [Wiki page](https://github.com/mgechev/angular2-seed/wiki) of the project.

# Running tests

```bash
npm test

# Debug - In two different shell windows
npm run build.test.watch      # 1st window
npm run karma.start           # 2nd window

# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
npm run serve.coverage

# e2e (aka. end-to-end, integration) - In three different shell windows
# Make sure you don't have a global instance of Protractor

# npm run webdriver-update <- You will need to run this the first time
npm run webdriver-start
npm run serve.e2e
npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
npm run e2e.live
```
You can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

# Contributing

Please see the [CONTRIBUTING](https://github.com/mgechev/angular2-seed/blob/master/CONTRIBUTING.md) file for guidelines.

# Examples

Forks of this project demonstrate how to extend and integrate with other libraries:

 - https://github.com/justindujardin/angular2-seed - integration with [ng2-material](https://github.com/justindujardin/ng2-material)
 - https://github.com/archfirst/angular2-seed-sass - integration with [Sass](http://sass-lang.com/)
 - https://github.com/AngularShowcase/angular2-sample-app - sample Angular 2 application
 - https://github.com/AngularShowcase/ng2-bootstrap-sbadmin - ng2-bootstrap-sbadmin
 - https://github.com/AngularShowcase/angular2-seed-ng2-highcharts - Simple application including a [Highcharts](http://www.highcharts.com) graph.
 - https://github.com/tarlepp/angular-sailsjs-boilerplate-frontend-angular2 - Example application for [Sails.js](http://sailsjs.org/) integration.
 - https://github.com/ludohenin/ng2-wp-blog - Angular 2 application using Wordpress [JSON-API](http://v2.wp-api.org) backend.
 - https://github.com/AngularShowcase/angular2-seed-example-mashup - Angular 2 application demonstrating the use of [Redux](http://redux.js.org/), [D3](https://github.com/mbostock/d3), [socket io](https://github.com/socketio), [Google Charts](https://developers.google.com/chart/), and [RxJs](https://github.com/Reactive-Extensions/RxJS)

# Directory Structure

```
.
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── src
│   ├── about
│   │   └── components
│   │       ├── about.e2e.ts
│   │       ├── about.html
│   │       ├── about.ts
│   │       └── about.spec.ts
│   ├── app
│   │   └── components
│   │       ├── app.css
│   │       ├── app.e2e.ts
│   │       ├── app.html
│   │       ├── app.ts
│   │       └── app.spec.ts
│   ├── assets
│   │   ├── img
│   │   │   └── smile.png
│   │   └── main.css
│   ├── home
│   │   └── components
│   │       ├── home.css
│   │       ├── home.html
│   │       ├── home.ts
│   │       ├── home.e2e.ts
│   │       └── home.spec.ts
│   ├── shared
│   │   └── services
│   │       ├── name_list.ts
│   │       └── name_list.spec.ts
│   ├── hot_loader_main.ts
│   ├── main.ts
│   └── index.html
├── dist
├── tools
│   ├── manual_typings
│   ├── tasks
│   ├── utils
│   ├── config.ts
│   └── utils.ts
├── appveyor.yml
├── gulpfile.ts
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── test-main.js
├── tsconfig.json
├── tslint.json
└── typings.json
```

# Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="nareshbhatia" src="https://avatars.githubusercontent.com/u/1220198?v=3&s=117" width="117">](https://github.com/nareshbhatia) |[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[tarlepp](https://github.com/tarlepp) |[NathanWalker](https://github.com/NathanWalker) |[nareshbhatia](https://github.com/nareshbhatia) |[jesperronn](https://github.com/jesperronn) |

[<img alt="d3viant0ne" src="https://avatars.githubusercontent.com/u/8420490?v=3&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |
:---: |:---: |:---: |:---: |:---: |:---: |
[d3viant0ne](https://github.com/d3viant0ne) |[aboeglin](https://github.com/aboeglin) |[ryzy](https://github.com/ryzy) |[natarajanmca11](https://github.com/natarajanmca11) |[JakePartusch](https://github.com/JakePartusch) |[larsthorup](https://github.com/larsthorup) |

[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="devanp92" src="https://avatars.githubusercontent.com/u/4533277?v=3&s=117" width="117">](https://github.com/devanp92) |[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |[<img alt="LuxDie" src="https://avatars.githubusercontent.com/u/12536671?v=3&s=117" width="117">](https://github.com/LuxDie) |[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ouq77](https://github.com/ouq77) |[jerryorta-dev](https://github.com/jerryorta-dev) |[devanp92](https://github.com/devanp92) |[evanplaice](https://github.com/evanplaice) |[LuxDie](https://github.com/LuxDie) |[c-ice](https://github.com/c-ice) |

[<img alt="ojacquemart" src="https://avatars.githubusercontent.com/u/1189345?v=3&s=117" width="117">](https://github.com/ojacquemart) |[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="juristr" src="https://avatars.githubusercontent.com/u/542458?v=3&s=117" width="117">](https://github.com/juristr) |[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |[<img alt="dszymczuk" src="https://avatars.githubusercontent.com/u/539352?v=3&s=117" width="117">](https://github.com/dszymczuk) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ojacquemart](https://github.com/ojacquemart) |[TuiKiken](https://github.com/TuiKiken) |[juristr](https://github.com/juristr) |[dstockhammer](https://github.com/dstockhammer) |[briantopping](https://github.com/briantopping) |[dszymczuk](https://github.com/dszymczuk) |

[<img alt="brendanbenson" src="https://avatars.githubusercontent.com/u/866866?v=3&s=117" width="117">](https://github.com/brendanbenson) |[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="koodikindral" src="https://avatars.githubusercontent.com/u/6285484?v=3&s=117" width="117">](https://github.com/koodikindral) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[brendanbenson](https://github.com/brendanbenson) |[dwido](https://github.com/dwido) |[koodikindral](https://github.com/koodikindral) |[jeffbcross](https://github.com/jeffbcross) |[johnjelinek](https://github.com/johnjelinek) |[justindujardin](https://github.com/justindujardin) |

[<img alt="philipooo" src="https://avatars.githubusercontent.com/u/1702399?v=3&s=117" width="117">](https://github.com/philipooo) |[<img alt="lihaibh" src="https://avatars.githubusercontent.com/u/4681233?v=3&s=117" width="117">](https://github.com/lihaibh) |[<img alt="tandu" src="https://avatars.githubusercontent.com/u/273313?v=3&s=117" width="117">](https://github.com/tandu) |[<img alt="inkidotcom" src="https://avatars.githubusercontent.com/u/100466?v=3&s=117" width="117">](https://github.com/inkidotcom) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |[<img alt="mjwwit" src="https://avatars.githubusercontent.com/u/4455124?v=3&s=117" width="117">](https://github.com/mjwwit) |
:---: |:---: |:---: |:---: |:---: |:---: |
[philipooo](https://github.com/philipooo) |[lihaibh](https://github.com/lihaibh) |[tandu](https://github.com/tandu) |[inkidotcom](https://github.com/inkidotcom) |[markharding](https://github.com/markharding) |[mjwwit](https://github.com/mjwwit) |

[<img alt="ocombe" src="https://avatars.githubusercontent.com/u/265378?v=3&s=117" width="117">](https://github.com/ocombe) |[<img alt="gdi2290" src="https://avatars.githubusercontent.com/u/1016365?v=3&s=117" width="117">](https://github.com/gdi2290) |[<img alt="typekpb" src="https://avatars.githubusercontent.com/u/499820?v=3&s=117" width="117">](https://github.com/typekpb) |[<img alt="Brooooooklyn" src="https://avatars.githubusercontent.com/u/3468483?v=3&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="redian" src="https://avatars.githubusercontent.com/u/816941?v=3&s=117" width="117">](https://github.com/redian) |[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ocombe](https://github.com/ocombe) |[gdi2290](https://github.com/gdi2290) |[typekpb](https://github.com/typekpb) |[Brooooooklyn](https://github.com/Brooooooklyn) |[redian](https://github.com/redian) |[Bigous](https://github.com/Bigous) |

[<img alt="robertpenner" src="https://avatars.githubusercontent.com/u/79827?v=3&s=117" width="117">](https://github.com/robertpenner) |[<img alt="sclausen" src="https://avatars.githubusercontent.com/u/916076?v=3&s=117" width="117">](https://github.com/sclausen) |[<img alt="tapas4java" src="https://avatars.githubusercontent.com/u/2254963?v=3&s=117" width="117">](https://github.com/tapas4java) |[<img alt="butterfieldcons" src="https://avatars.githubusercontent.com/u/12204784?v=3&s=117" width="117">](https://github.com/butterfieldcons) |[<img alt="jgolla" src="https://avatars.githubusercontent.com/u/1542447?v=3&s=117" width="117">](https://github.com/jgolla) |[<img alt="ultrasonicsoft" src="https://avatars.githubusercontent.com/u/4145169?v=3&s=117" width="117">](https://github.com/ultrasonicsoft) |
:---: |:---: |:---: |:---: |:---: |:---: |
[robertpenner](https://github.com/robertpenner) |[sclausen](https://github.com/sclausen) |[tapas4java](https://github.com/tapas4java) |[butterfieldcons](https://github.com/butterfieldcons) |[jgolla](https://github.com/jgolla) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |

# Change Log

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
