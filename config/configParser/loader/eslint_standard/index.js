const wmerge = require("webpack-merge");  
    
module.exports = function(isProduction) {
    return {
        "name" : "ESLint - Standard",
        "modules" : ["eslint-loader", "eslint-config-recommended/esnext"],
        "config" : function(srcConfiguration) {
            const configuration = require("./webpack.config.js");
            return wmerge(srcConfiguration, configuration);
        }
    };
}