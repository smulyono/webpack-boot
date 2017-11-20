var path = require("path"),
    fs   = require("fs");

// Will pickup the root path where the process is called
var rootPath = fs.realpathSync(process.cwd());
function resolvePath(relativePath) {
    return path.resolve(rootPath, relativePath);
}

// picking up environment properties
require("dotenv").config({
    path : resolvePath(".boot.env")
});


module.exports = {
    PROJECT_DIR : resolvePath(process.env.boot_project_dir || "src/"),
    BUILD_DIR   : resolvePath(process.env.boot_build_dir || "build/"),
    MAIN_ENTRY   : resolvePath(process.env.boot_main_entry || "src/index.js"),
    NODE_MODULES : resolvePath("node_modules/"),
    PACKAGE_JSON : require("../package.json"),
    DEVELOPMENT_PROTOCOL : "http", // default for now
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