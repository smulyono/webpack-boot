/**
 * Provide a main module where webpack configuration
 * can be retrieved and pass-through to another flow
 * e.x webpack middleware
 */
const
    configBuilder = require("../config/configBuilder"),
    util = require("../config/util"),
    merge = require("webpack-merge"),
    webpack = require("webpack");

module.exports = {
    configBuilder,
    util,
    webpack,
    merge
};
