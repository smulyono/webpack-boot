const chalk = require("chalk"),
    moduleDetector = require("../moduleDetector"),
    // util = require("util"),
    lessLoader = require("./loader/less")
    ;

module.exports = function(configuration, isProduction) {
    console.log(chalk.yellow('starting to parse available loader'));
    
    configuration = moduleDetector.parseAndDetect(lessLoader(isProduction), configuration);
    
    // console.log(util.inspect(configuration, false, null, true));
    return configuration;
}   