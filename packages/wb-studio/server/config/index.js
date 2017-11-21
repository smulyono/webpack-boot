const path = require("path"),
    constants = require("./constants");
import dotenv from 'dotenv';

// pick up environment 
dotenv.config({
    path : path.resolve(__dirname, "../application.properties")
});


module.exports = {
    constants,
    port : process.env.studio_port || 3000,
    mode : process.env.studio_mode || constants.PRODUCTION_MODE,
    workingdir : process.env.studio_workingdir || "/tmp",

    clientPublicPath : "/",
    clientBuildDir : path.resolve(__dirname, '../../build'),

    logDir : path.resolve(__dirname, "../logs"),
    accessLogPath : path.resolve(__dirname, "../logs", "access.log"),
    applicationLogPath : path.resolve(__dirname , "../logs", "application.log")
}