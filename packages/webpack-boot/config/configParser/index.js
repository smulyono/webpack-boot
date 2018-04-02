const chalk = require("chalk"),
    moduleDetector = require("../moduleDetector"),
    util = require("util"),
    lessLoader = require("./loader/less"),

    eslintReactLoader = require("./loader/eslint_react"),
    eslintStandard = require("./loader/eslint_standard"),
    fileLoader = require("./loader/file_loader"),
    urlLoader = require("./loader/url_loader")
    ;

module.exports = function(configuration, isProduction) {
    console.log(chalk.yellow('starting to parse available loader'));
    
    // standard url loader
    configuration = moduleDetector.parseAndDetect(urlLoader(isProduction), configuration);

    configuration = moduleDetector.parseAndDetect(lessLoader(isProduction), configuration);
    
    configuration = moduleDetector.parseAndDetect(eslintReactLoader(isProduction), configuration, (status) => {
        if (status) {
            // React is loaded
            console.log("    " + chalk.cyan("React detected, `react-app` eslint config is enabled by default"));
            console.log("    " + chalk.cyan("  ----> manually add `react` into your .babelrc files"));
        } else {
            configuration = moduleDetector.parseAndDetect(eslintStandard(isProduction), configuration);        
            console.log("    " + chalk.cyan("`google` eslint config is enabled by default"));
        }
    });

    // standard file loader
    configuration = moduleDetector.parseAndDetect(fileLoader(isProduction), configuration);

    // -- DEBUGGING INFO --
    console.debug(util.inspect(configuration, false, null, true));
    return configuration;
}   