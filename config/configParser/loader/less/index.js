const moduleDetector = require("../../../moduleDetector"),
    configuration = require("./webpack.config.js"),
    chalk = require("chalk");
    
module.exports = function(srcConfiguraton, isProduction) {
    if (moduleDetector.detect("LESS",
                 "less-loader", "less")) {
        // get the configuration    

    }
    
}