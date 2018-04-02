const wmerge = require("webpack-merge");  
    
module.exports = function(isProduction) {
    return {
        "name" : "URL Loader - Standard",
        "modules" : ["url-loader", "file-loader"],
        "config" : function(srcConfiguration) {
            const configuration = require("./webpack.config.js");
            return wmerge(srcConfiguration, configuration);
        }
    };
}