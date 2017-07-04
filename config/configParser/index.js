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
    
    configuration = moduleDetector.parseAndDetect(eslintReactLoader(isProduction), configuration, () => {
        configuration = moduleDetector.parseAndDetect(eslintStandard(isProduction), configuration);        
    });

    // console.log(util.inspect(configuration, false, null, true));
    return configuration;
}   