const wmerge = require("webpack-merge");  
    
module.exports = function(isProduction) {
    return {
        "name" : "File Loader - Standard",
        "modules" : ["file-loader"],
        "config" : function(srcConfiguration) {
            const configuration = require("./webpack.config.js");
            return wmerge(srcConfiguration, configuration);
        }
    };
}