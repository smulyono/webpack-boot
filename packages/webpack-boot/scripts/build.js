const webpack = require("webpack"),
    chalk = require("chalk"),
    fs = require("fs-extra"),
    configBuilder = require("../config/configBuilder"),
    constants = require("../config/constant");

chalk.blue("Building deployment assets");
// set node_env as development
process.env.NODE_ENV = "production";

fs.emptyDirSync(constants.BUILD_DIR);

// Use react-dev-utils custom compiler which will give less verbose output for development
let compiler = webpack(configBuilder.getProductionConfig());
compiler.run((error, stats) => {
    if (error) {
        console.error(chalk.red("Deployment build failed!", error));
        process.exit(1);
    }
    console.log(chalk.green("[Build deployment - webpack]"), stats.toString({
        colors: true,
        timings: true,
        chunks: true,
        modules: false,
        reasons: false
    }));    
    console.log(chalk.green("[Build deployment - done]"));
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        console.log(chalk.red("Deployment build closed /cancelled"));
        process.exit();
    });
});