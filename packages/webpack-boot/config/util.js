const address = require("address"),
    webpack = require("webpack"),
    constant = require("./constant"),
    chalk = require("chalk"),
    progressPlugin = require("webpack/lib/ProgressPlugin"),
    url = require("url");

const getFormattedTime = (msTime) => {
    const secInMs = 1000;
    const minInMs = secInMs * 60;
    const hourInMs = 60 * minInMs;

    let hour = Math.floor(msTime / hourInMs);
    let hourRemainder = (msTime % hourInMs);
    let minutes = Math.floor(hourRemainder / minInMs);
    let minutesRemainder = hourRemainder % minInMs;
    let seconds = Math.floor(minutesRemainder / secInMs);
    let secondsRemainder = Math.floor(minutesRemainder % secInMs);


    return `${hour} hour ${minutes} minutes ${seconds} seconds ${secondsRemainder} ms`;
}


module.exports = {
    clearConsole : () => {
        process.stdout.write('\x1Bc');
    },
    printFormattedTime: (msTime) => {
        // return the ms Time to nice formatted 00 hours 00 minutes 00 seconds 00 mili
        return getFormattedTime(msTime);
    },
    
    getAddress : (protocol, host, port) => {
        const isUnspecified = (host === '0.0.0.0' || host === '::');
        let prettyHost, lanAddress, lanUrl, displayUrl;

        if (isUnspecified) {
            // bind to localhost
            prettyHost = "localhost";
            // get the local ip adress
            lanAddress = address.ip();
        } else {
            prettyHost = host;
            lanAddress = host;
        }

        displayUrl = url.format({
            protocol, 
            hostname : prettyHost, 
            port : port,
            pathname : '/'
        });

        lanUrl = url.format({
            protocol, 
            hostname:lanAddress, 
            port : port,
            pathname : '/'
        })

        return {
            prettyHost,  // host display name
            displayUrl,  // full url display
            lanAddress,  // Lan host name
            lanUrl,      // full url display (in LAN network)
        }
    },
    compileWebpack : (configuration, urlToDisplay) => {
        const compiled = webpack(configuration);
        let isFirstBuild = true;
        let percentageOutTTy = 0;
        let startTime = new Date();
        /**
         * https://stackoverflow.com/questions/31052991/webpack-progress-using-node-js-api
         */
        compiled.apply(new progressPlugin((percentage, msg, current, active, modulepath) => {
            if (process.stdout.isTTY) {
                // inside terminal
                if (process.stdout.isTTY && percentage < 1) {
                    process.stdout.cursorTo(0)
                    modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : ''
                    current = current ? ' ' + current : ''
                    active = active ? ' ' + active : ''
                    process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' ')
                    process.stdout.clearLine(1)
                } else if (percentage === 1) {
                    process.stdout.write('\n')
                    console.log('webpack - compile: done.')
                }
            } else {
                //     // executed not in terminal, inside of maven build
                const diff = percentage - percentageOutTTy;
                const diffPercentage = Math.round(diff * 100);
                if (diffPercentage >= 10
                    && percentage < 1) {
                    modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : ''
                    current = current ? ' ' + current : ''
                    active = active ? ' ' + active : ''
                    var dt = new Date();
                    console.log(`[ ${dt.toLocaleTimeString()} ] ` + (percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' ');
                    percentageOutTTy = percentage;
                } else if (percentage === 1) {
                    console.log('\n')
                    console.log('webpack - compile: done.')
                }
            }
        }))

        compiled.plugin("invalid", () => {
            console.log(chalk.cyan("webpack re-compiling......"));
        })

        compiled.plugin("done", (rawStats) => {
            // show only warning and errors, to show any build information, 
            // please change the configuration in constant from quiet->true into quiet->false
            let stats = rawStats.toJson();

            if (!stats.errors && !stats.warnings) {
                console.log(chalk.green(chalk.underline("compiled successfully")));
            }

            if (stats.errors && stats.errors.length > 0) {
                console.log(chalk.red("Compilation erros "));
                console.log(stats.errors.join("\n\n"));
            }

            if (stats.warnings && stats.warnings.length > 0) {
                console.log(chalk.yellow("Compilation warnings "));
                console.log(stats.warnings.join("\n\n"));
            }

            let endTime = stats.time;
            if (isFirstBuild) {
                endTime = new Date() - startTime;
                console.log(chalk.green("Initial Execution time : "), getFormattedTime(endTime));
            } else {
                console.log(chalk.green("Execution time : "), getFormattedTime(endTime));
            }

            if (urlToDisplay) {
                // Standard display, only passed when in development (start)
                console.log(chalk.yellow("[Webpack-Boot]"), chalk.bold("Dev Server Information :"));
                console.log(chalk.dim("--------------------------------------------------------------------"));
                console.log(chalk.yellow("[Webpack-Boot] Url Address        : "), chalk.bold(urlToDisplay.displayUrl));
                console.log(chalk.yellow("[Webpack-Boot] LAN Address        : "), chalk.bold(urlToDisplay.lanUrl));
                console.log(chalk.yellow("[Webpack-Boot] Serving files from :", chalk.bold(constant.BUILD_DIR)));
                console.log(chalk.dim("--------------------------------------------------------------------"));                                 
            } else {
                // when it is in display information (build / bundling)
                console.log(chalk.yellow("[Webpack-Boot]"), chalk.bold("Build Information :"));
                console.log(chalk.dim("--------------------------------------------------------------------"));
                console.log(chalk.green("[Bundled Information - webpack] \n"), rawStats.toString({
                    chunks: true,
                    chunkModules: false,
                    colors: false,
                    errors: false,
                    warnings: false,
                    usedExports: false,
                    children: false,
                    modules: false,
                    timings: false
                }));
                console.log(chalk.dim("--------------------------------------------------------------------"));
                console.log(chalk.green("[Bundling - done]"));
            }
            isFirstBuild = false;
        });
        return compiled;
    }
}