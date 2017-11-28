import log from '../logger';
import wb from 'webpack-boot';
import os from 'os';
import config from '../config';

const runDevServer = async (App, port) => {
    log.info("[Client - Studio] Running development server");
    // prepare dev server proxy 
    const devServerProxyConfig = {
        "proxy" : {
            "/api" : {
                "target" : `http://localhost:${config.developmentPort}`,
                "secure" : false
            }
        }
    };

    // prepare webpack development configuration, webpack will be using studio port
    // since studio (backend) will be proxied by webpack-boot.
    const urls = wb.util.getAddress(config.protocol, "localhost", config.port);
    let compiler = wb.util.compileWebpack(wb.configBuilder.getDevelopmentConfig(), urls);
    let isAlive = await wb.util.runWebpackDevServer(compiler, os.hostname, port, devServerProxyConfig);
    if (isAlive === true) {
        // Run express server for studio development
        App.listen(config.developmentPort, (err) => {
            if (err) {
                log.error(chalk.red("Not able to startup server due to "));
                console.error(chalk.red("Not able to startup server due to "), err);
            }
            log.info("[Server API - dev] Studio starting on port ", config.developmentPort);
        });
        
    } else {
        log.error("Unable to run webpack dev server");
        log.error(isAlive);
    }
};

export default {
    runDevServer
}