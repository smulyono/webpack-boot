const winston = require("winston");

const level = process.env.log_level || 'debug';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toLocaleString();
            }
        })
    ]    
});

export default logger;