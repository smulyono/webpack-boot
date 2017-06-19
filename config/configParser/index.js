const chalk = require("chalk"),
    lessLoader = require("./loader/less");

module.exports = function(configuration, isProduction) {
    console.log(chalk.yellow('starting to parse available loader'));
    
    lessLoader(configuration, isProduction);

}   