const wmerge = require("webpack-merge");  
    
module.exports = function(isProduction) {
    return {
        "name" : "ESLint - React",
        "modules" : ["react", "eslint-loader", "eslint-config-react-app"],
        "config" : function(srcConfiguration) {
            const configuration = require("./webpack.config.js");
            return wmerge(srcConfiguration, configuration);
        }
    };
}