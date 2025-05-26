[![Deploy static content to Pages](https://github.com/kaiyuan01/roth-conversion-planner/actions/workflows/static.yml/badge.svg)](https://github.com/kaiyuan01/roth-conversion-planner/actions/workflows/static.yml)

# Roth Conversion
See the discussions here:
 https://www.youtube.com/watch?v=EbZfRRSX8Wo&amp;list=PLiskER8xug1eo49yiMsDm8NFY1PGFvMbk

 https://www.youtube.com/watch?v=EbZfRRSX8Wo&list=PLiskER8xug1eo49yiMsDm8NFY1PGFvMbk
 https://www.youtube.com/watch?v=KEJ1JhVZ0V4&list=PLiskER8xug1cvgAapbJMWldAlAY8ygnZL

 Related CLEC Playlists:
 https://www.youtube.com/watch?v=EbZfRRSX8Wo&list=PLiskER8xug1eo49yiMsDm8NFY1PGFvMbk 退休計劃
 https://www.youtube.com/watch?v=81Iv_pqY9NE&list=PLiskER8xug1cvgAapbJMWldAlAY8ygnZL 美國稅務居民專題
 
 # Web site
 https://kaiyuan01.github.io/roth-conversion-planner/browser/ 

 # ng
 If you use github codespaces IDE, be sure to install ng first if you need it:
 npm install -g @angular/cli

 # Modules required:
 npm install --save @angular/material

 # Build releases
 E.g.:
    npm version 1.0.7alpha
    npm run build -- --base-href=/roth-conversion-planner/browser/ --configuration production
    ng build --configuration production --base-href /roth-conversion-planner/browser/

    npm run build

    Known issue: they all generated 1.0.2--dev in index.html, just as dev build:
    npm run build --prod
    npm run build --production
    ng build --configuration production
 
 # RothConversionPlanner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
