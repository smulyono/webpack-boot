const path = require("path"),
    constants = require("./constants");
import dotenv from 'dotenv';

// pick up environment 
dotenv.config({
    path : "./server/application.properties"
});


module.exports = {
    constants,
    port : process.env.studio_port || 3000,
    mode : process.env.studio_mode || constants.PRODUCTION_MODE,

    clientPublicPath : "/",
    clientBuildDir : path.resolve(__dirname, '../../build'),

    logDir : path.resolve(__dirname, "../logs"),
    accessLogPath : path.resolve(__dirname, "../logs", "access.log"),
    applicationLogPath : path.resolve(__dirname , "../logs", "application.log")
}