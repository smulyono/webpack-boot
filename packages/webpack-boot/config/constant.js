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
    PROJECT_DIR : resolvePath(process.env.project_dir || "src/"),
    BUILD_DIR   : resolvePath(process.env.build_dir || "build/"),
    MAIN_ENTRY   : resolvePath(process.env.main_entry || "src/index.js"),
    NODE_MODULES : resolvePath("node_modules/"),
    PACKAGE_JSON : require("../package.json"),
    DEVELOPMENT_PROTOCOL : "http", // default for now
    DEVELOPMENT_HOST : '127.0.0.1',
    DEVELOPMENT_PORT : process.env.port || 3000,
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
    /** specific loader properties */
    FILE_LOADER_REGEX : process.env.file_loader_regex ? new RegExp(process.env.file_loader_regex) : /\.(png|jpg|jpeg|gif|wav)$/,
    URL_LOADER_REGEX : process.env.url_loader_regex ? new RegExp(process.env.url_loader_regex) : /\.(woff|otf|png)$/,    
    URL_LOADER_LIMIT : process.env.url_loader_limit ? process.env.url_loader_limit : 1000,
    URL_LOADER_MIMETYPE : process.env.url_loader_mimetype ? process.env.url_loader_mimetype : '',
    getPublichPath : function() {
        // 1. get from NODE_ENV.homepage

        // 2. lookup and get the `homepage` from the package.json

        // 3. Fallback to '';
        return '';
    }
};