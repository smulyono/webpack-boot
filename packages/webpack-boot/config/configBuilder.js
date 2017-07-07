const devConfig = require("../config/webpack.config.dev"),
      prodConfig = require("../config/webpack.config.prod"),
      configParser = require("./configParser");


module.exports = {
    getDevelopmentConfig : function() {
        return configParser(devConfig, false);
    },
    getProductionConfig : function() {
        return configParser(prodConfig, true);
    }
}