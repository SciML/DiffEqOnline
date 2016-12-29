# Julia API demo

This project demonstrates a data-driven website which uses Julia for performing
calculations in the back end. It differs from [this demo](https://github.com/amellnik/Julia-Node-stack-demo)
in that the back end is written in Julia using [JuliaWebAPI.jl](https://github.com/JuliaWeb/JuliaWebAPI.jl)
rather than in Node, which then connects to Julia.  

The current version of this project provides a web interface to [DifferentialEquations.jl](https://github.com/JuliaDiffEq/DifferentialEquations.jl).

A live version of this front-end will be deployed to the [github page](https://amellnik.github.io/JuliaAPIDemo/) for this project.  

# Running the Demo

## Installation

First, make sure you have node installed. In CentOS 7, this is done by

```
sudo yum install nodejs
```

Next, install AngularJS via

```
sudo npm install angular
```

Clone the repo and navigate to it. Then run

```
sudo npm install
```

This should have the webserver setup. For the Julia installations, assuming
Julia is already installed, run the following:

```julia
Pkg.add("DifferentialEquations")
Pkg.add("Plots")
Pkg.add("JSON")
Pkg.add("Compat")
Pkg.add("JuliaWebAPI")
Pkg.add("Logging")
```

# Running the API Locally

Navigate to this repository and run `ng serve` for a dev server.
Navigate a browser to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

That should be serving the website, but the Julia interaction does not exist
yet. To set that up, run the following commands:

```
julia api/srvr.jl &
julia api/run_api.jl
```

Go to `http://localhost:7777/squareit/WzEsMiwzXQ==` to see if it's working.
The nonsensical bit at the end is the base64 encoding of `"[1,2,3]"`.
You should see a response of `{"data":"[1,4,9]"}`.  

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
