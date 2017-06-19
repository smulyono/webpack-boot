var path = require("path"),
    fs   = require("fs");

// Will pickup the root path where the process is called
var rootPath = fs.realpathSync(process.cwd());
function resolvePath(relativePath) {
    return path.resolve(rootPath, relativePath);
}

module.exports = {
    PROJECT_DIR : resolvePath("src/"),
    BUILD_DIR   : resolvePath("build/"),
    NODE_MODULES : resolvePath("node_modules/"),
    MAIN_ENTRY   : resolvePath("src/index.js"),
    PACKAGE_JSON : resolvePath("package.json"),
    DEVELOPMENT_HOST : '0.0.0.0',
    DEVELOPMENT_PORT : 3000,
    DEVELOPMENT_SERVER_CONFIG : {
        hot : true,
        historyApiFallback : false,
        compress : true,
        quiet : true,
        clientLogLevel: 'none',
        contentBase : this.BUILD_DIR,
        watchOptions: {
            ignored: /node_modules/,
        },        
        stats : {
            colors : true,
            chunks : false
        }       
    },
    getPublichPath : function() {
        // 1. get from NODE_ENV.homepage

        // 2. lookup and get the `homepage` from the package.json

        // 3. Fallback to '';
        return '';
    }
};