import Express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import log from './logger';

const App = new Express();
// pick up environment 
dotenv.config({
    path : "./server/application.properties"
});

// Endpoint
// App.use("/api")

App.set("port", process.env.studio_port || 3000);

App.listen(App.get("port"), (err) => {
    if (err) {
        log.error(chalk.red("Not able to startup server due to "));
        console.error(chalk.red("Not able to startup server due to "), err);
    }
    log.info("[Server API] Studio starting on port ", App.get("port"));
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        log.info(chalk.red("webpack studio shutting down...."));
        process.exit();
    });
});
