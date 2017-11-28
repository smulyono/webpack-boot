const path = require("path"),
    constants = require("./constants");
import dotenv from 'dotenv';

// pick up environment 
dotenv.config({
    path : path.resolve(__dirname, "../application.properties")
});


module.exports = {
    constants,
    protocol : process.env.https === true ? 'https' : 'http',
    port : process.env.studio_port || 3000,
    developmentPort : process.env.studio_dev_port || 8812,
    mode : process.env.studio_mode || constants.PRODUCTION_MODE,
    workingdir : process.env.studio_workingdir || "/tmp",
    dbPath : process.env.studio_db_path || "/tmp/_db",

    clientPublicPath : "/",
    clientBuildDir : path.resolve(__dirname, '../../build'),

    logDir : path.resolve(__dirname, "../logs"),
    accessLogPath : path.resolve(__dirname, "../logs", "access.log"),
    applicationLogPath : path.resolve(__dirname , "../logs", "application.log")
}