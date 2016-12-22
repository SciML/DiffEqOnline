# Julia API demo

This project demonstrates a data-driven website which uses Julia for performing calculations in the back end.  It differs from [this demo](https://github.com/amellnik/Julia-Node-stack-demo) in that the back end is written in Julia using [JuliaWebAPI.jl](https://github.com/JuliaWeb/JuliaWebAPI.jl) rather than in Node, which then connects to Julia.  

The current version of this project uses Julia to square an array of numbers (lame, I know).  A later version will allow the user to describe a differential equation, solve it, and plot the results.  

A live version of this front-end will be deployed to the [github page](http://amellnik.github.io/julia-api-demo) for this project.  

# Development notes for the angular-cli front end

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
