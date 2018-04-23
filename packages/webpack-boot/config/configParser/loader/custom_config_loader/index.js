const wmerge = require("webpack-merge"),
    path = require("path"),
    chalk = require("chalk"),
    constant = require("../../../constant");

// look for webpack.config.prod.js    
// or fallback to webpack.config.js
const getCustomConfig = function(isProduction) {
    // prepare default value (if any)
    let customConfig = null;
    try {
        customConfig = require(constant.resolvePath(path.join(constant.CUSTOM_CONFIG_DIR, "webpack.config.js")));
    } catch (e) {
    }

    if (isProduction) {
        try {
            return require(constant.resolvePath(path.join(constant.CUSTOM_CONFIG_DIR, "webpack.config.prod.js")));
        } catch (e) {
            return customConfig;
        }
    } else {
        try {
            return require(constant.resolvePath(path.join(constant.CUSTOM_CONFIG_DIR, "webpack.config.dev.js")));
        } catch (e) {
            return customConfig;
        }
    }    
    return null;
    
}

module.exports = function(isProduction){
    return {
        "name" : "Custom config loader",
        "modules" : [],
        "config" : function(srcConfiguration) {
            const customConfig = getCustomConfig(isProduction);
            if (customConfig && customConfig !== null) {
                console.log("    " + chalk.cyan("Custom config loaded from ", constant.CUSTOM_CONFIG_DIR ));
                return wmerge(srcConfiguration, customConfig);
            } else {
                console.log("    " + chalk.red("NO Custom config loaded"));
                return srcConfiguration
            }
        }
    }
}