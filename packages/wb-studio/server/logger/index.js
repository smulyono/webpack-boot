const winston = require("winston"), 
    path = require("path"),
    config = require("../config");
    
require("winston-daily-rotate-file");

const level = process.env.log_level || 'debug';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toLocaleString();
            }
        }),
        new winston.transports.DailyRotateFile({
            level : level,
            filename : config.applicationLogPath
        })
    ]    
});

export default logger;