# Webpack Boot 

Simple webpack build generator which is inspired and __derived__ some of the utility from `react-scripts`. 

The key goal for webpack boot is to automate the configuration of webpack based on the module `needs` (automatically derived from their dependencies). Similar as `react-scripts` which is to shift the focus on the code / application rather than the dev tools configuration needed. 

## How to get started 
[ In Progress ]

## What is supported ?
* Webpack 2.x support configuration
    * Development server with webpack as `react-scripts` have supported
* Less support
* Support for webpack loaders with zero configuration
    * file-loader
    * url-loader
* Support for using additional webpack configuration 
* ESLint for React and ES6
* Environment specific configuration, will look for __.boot.env__ file
```
port=<Port for development server>
project_dir=<Project location relative to root folder>
build_dir=<Build folder location>
main_entry=<Path to main entry js file>

```
[ More .. ]

## Development with linkage
* Checkout the webpack-boot code from repository
* Run command `$ yarn link`

`__[On the other project, to test webpack-boot]__`

* Add loader to test as dependencies
* Run `$ yarn link webpack-boot` to install deps
* Run `$ yarn start`

