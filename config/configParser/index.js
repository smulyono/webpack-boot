const chalk = require("chalk"),
    moduleDetector = require("../moduleDetector"),
    // util = require("util"),
    lessLoader = require("./loader/less"),

    eslintReactLoader = require("./loader/eslint_react"),
    eslintStandard = require("./loader/eslint_standard")
    ;

module.exports = function(configuration, isProduction) {
    console.log(chalk.yellow('starting to parse available loader'));
    
    configuration = moduleDetector.parseAndDetect(lessLoader(isProduction), configuration);
    
    configuration = moduleDetector.parseAndDetect(eslintReactLoader(isProduction), configuration, (status) => {
        if (status) {
            // React is loaded
            console.log("    " + chalk.blue("React detected, `react-app` eslint config is enabled by default"));
        } else {
            configuration = moduleDetector.parseAndDetect(eslintStandard(isProduction), configuration);        
            console.log("    " + chalk.blue("`google` eslint config is enabled by default"));
        }
    });

    // console.log(util.inspect(configuration, false, null, true));
    return configuration;
}   