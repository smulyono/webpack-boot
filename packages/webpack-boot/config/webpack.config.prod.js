const constant = require("./constant"),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    bail: true,
    context: constant.PROJECT_DIR,
    output: {
        path: constant.BUILD_DIR,
        filename: "assets/js/[name].bundle.[chunkhash:8].js",
        chunkFilename: "assets/js/[name].[chunkhash:8].chunk.js",
        // points where the prefix url should point to.
        publicPath: constant.getPublichPath()
    },
    entry: [require.resolve("babel-polyfill"), constant.MAIN_ENTRY],
    resolve: {
        modules: [constant.PROJECT_DIR, constant.NODE_MODULES],
        extensions: [".js", ".json", ".jsx"]
    },
    devtool: "source-map",
    // migration 1.x to 2.x, cannot omit the -loader
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        strictExportPresence: true,
        rules: [
            // css autoprefixer
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: require.resolve("style-loader"),
                    use: [
                        {
                            loader: require.resolve("css-loader"),
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: require.resolve("postcss-loader"),
                            options: {
                                plugins: () => [
                                    require("postcss-flexbugs-fixes"),
                                    require("autoprefixer")({
                                        browsers: [
                                            ">1%",
                                            "last 4 versions",
                                            "Firefox ESR",
                                            "not ie < 9" // React doesn't support IE8 anyway
                                        ],
                                        flexbox: "no-2009"
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            // babel + react
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: require.resolve("babel-loader"),
                    options: {
                        cacheDirectory: true
                    }
                },
                include: constant.PROJECT_DIR
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Boot",
            author: "webpack-boot",
            filename: "index.html",
            template: constant.PROJECT_DIR + "/assets/pages/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true
            }
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV || "development"
        }),
        // show module names instead of numbers in webpack stats
        new webpack.NamedModulesPlugin(),
        // don't spit out any errors in compiled assets
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: "assets/css/[name].[contenthash:8].css"
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: true,
            minimize: true,
            sourceMap: true
        })
    ],
    performance: {
        hints: false
    }
};
