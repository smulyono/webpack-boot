const devConfig = require("../config/webpack.config.dev"),
      prodConfig = require("../config/webpack.config.prod");


module.exports = {
    getDevelopmentConfig : function() {
        return devConfig;
    },
    getProductionConfig : function() {
        return prodConfig;
    }
}