import Express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

const App = new Express();
// pick up environment 
dotenv.config({
    path : "./server/.env"
});

// Endpoint
// App.use("/api")

App.set("port", process.env.STUDIO_PORT || 3000);

App.listen(App.get("port"), (err) => {
    if (err) {
        console.error(chalk.red("Not able to startup server due to "), err);
    }
    console.info("Studio starting on port ", App.get("port"));
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
        console.log(chalk.red("webpack studio shutting down...."));
        process.exit();
    });
});
