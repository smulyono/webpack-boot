import Express from 'express';
import chalk from 'chalk';
import log from './logger';
import path from 'path';
import webpackDevMiddleWare from 'webpack-dev-middleware';
import morgan from 'morgan';
import config from './config';
import ApiRoutes from './routing/apiRoutes';

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

if (config.mode === config.constants.DEVELOPMENT_MODE) {
    log.debug("Development :: webpack-middleware");
    // start webpack boot for client side (static resources)
    // as middleware
    let wb = require("webpack-boot");
    let compiler = wb.util.compileWebpack(wb.configBuilder.getDevelopmentConfig());
    
    App.use(webpackDevMiddleWare(compiler, {
        noInfo : true,
        publicPath : config.clientPublicPath,
        stats : {
            assets : false,
            children : false,
            chunks : false,
            chunkModules : false
        }
    }))
    App.use(morgan("dev"));
}
// log access 
App.use(morgan("combined", {
    stream : fileLogStream
}));

App.use(Express.static(config.clientBuildDir));
App.use(Express.json());
// Endpoint
App.use("/api", ApiRoutes);


App.listen(config.port, (err) => {
    if (err) {
        log.error(chalk.red("Not able to startup server due to "));
        console.error(chalk.red("Not able to startup server due to "), err);
    }
    log.info("[Server API] Studio starting on port ", config.port);
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        log.info(chalk.red("webpack studio shutting down...."));
        process.exit();
    });
});
