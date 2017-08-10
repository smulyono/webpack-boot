const 
    webpackDevServer = require("webpack-dev-server"),
    chalk = require("chalk"),
    configBuilder = require("../config/configBuilder"),
    util = require("../config/util"),
    constants = require("../config/constant");

console.log(chalk.blue("Webpack boot development server... [ x ]"));
// set node_env as development
process.env.NODE_ENV = "development";

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = constants.PACKAGE_JSON.name;
const urls = util.getAddress(protocol, constants.DEVELOPMENT_HOST, constants.DEVELOPMENT_PORT);

// configBuilder.getDevelopmentConfig();

// Use react-dev-utils custom compiler which will give less verbose output for development
let compiler = util.compileWebpack(configBuilder.getDevelopmentConfig(), urls);

let server = new webpackDevServer(compiler, constants.DEVELOPMENT_SERVER_CONFIG);
server.listen(constants.DEVELOPMENT_PORT, constants.DEVELOPMENT_HOST, function (err) {
    if (err) {
        console.error("Unable to start development server");
        process.exit(1);
    }
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        console.log(chalk.red("Dev server closed!"));
        server.close();
        process.exit();
    });
});
