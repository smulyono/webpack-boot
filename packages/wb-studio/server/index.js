import Express from 'express';
import chalk from 'chalk';
import log from './logger';
import path from 'path';
import morgan from 'morgan';
import config from './config';
import ApiRoutes from './routing/apiRoutes';
import devUtils from './utils/devUtils';

const App = new Express();

let fs = require("fs");
if (!fs.existsSync(config.logDir)) {
    // create log directory
    log.info("creating ", config.logDir);
    fs.mkdirSync(config.logDir);
}
let fileLogStream = fs.createWriteStream(config.accessLogPath,
             {flags : "a"}
            );

// log access 
App.use(morgan("combined", {
    stream : fileLogStream
}));
App.use(Express.json());
// Endpoint
App.use("/api", ApiRoutes);

if (config.mode === config.constants.DEVELOPMENT_MODE) {
    log.debug("Development :: webpack-middleware");
    // start webpack boot for client side (static resources)
    // as middleware
    App.use(morgan("dev"));
    devUtils.runDevServer(App, config.port);   
} else {
    // Serve compiled public static
    App.use(Express.static(config.clientBuildDir));
    // Run express server for studio 
    App.listen(config.port, (err) => {
        if (err) {
            log.error(chalk.red("Not able to startup server due to "));
            console.error(chalk.red("Not able to startup server due to "), err);
        }
        log.info("[Server API] Studio starting on port ", config.port);
    });
}


['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        log.info(chalk.red("webpack studio shutting down...."));
        process.exit();
    });
});
