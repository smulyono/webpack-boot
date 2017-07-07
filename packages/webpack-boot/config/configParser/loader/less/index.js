const wmerge = require("webpack-merge");  
    
module.exports = function(isProduction) {
    return {
        "name" : "LESS",
        "modules" : ["less", "less-loader"],
        "config" : function(srcConfiguration) {
            const configuration = require("./webpack.config.dev.js"),
                prodConfiguration = require("./webpack.config.prod.js");
            return (isProduction ?
                wmerge(srcConfiguration, prodConfiguration) :
                wmerge(srcConfiguration, configuration) );
        }
    };
}