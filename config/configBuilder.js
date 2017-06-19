const devConfig = require("../config/webpack.config.dev"),
      prodConfig = require("../config/webpack.config.prod"),
      configParser = require("./configParser");


module.exports = {
    getDevelopmentConfig : function() {
        configParser(devConfig, false);
    },
    getProductionConfig : function() {
        return prodConfig;
    }
}