const constant = require("./constant"),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: constant.PROJECT_DIR,
    output: {
        path: constant.BUILD_DIR,
        filename: "assets/js/[name]-bundle.js"
    },
    entry: [
        require.resolve('./devserver/webpackHotClient'),
        constant.MAIN_ENTRY
    ],
    resolve: {
        modules: [constant.PROJECT_DIR, "node_modules"],
        extensions: ['.js', '.json', '.jsx']
    },
    devtool : 'inline-source-map',
    // migration 1.x to 2.x, cannot omit the -loader
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        strictExportPresence: true,
        rules: [
            // css autoprefixer
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                })
                            ],
                        },
                    }
                ],
                include: constant.PROJECT_DIR
            },
            // babel + react
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: require.resolve('babel-loader'),
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
            title: "Webpack Build Application",
            description: "Simple Application using webpack",
            author: "smulyono",
            filename: "index.html",
            template: constant.PROJECT_DIR + "/assets/pages/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
         // show module names instead of numbers in webpack stats
        new webpack.NamedModulesPlugin(),
        // don't spit out any errors in compiled assets
        new webpack.NoEmitOnErrorsPlugin()
    ],
    performance: {
        hints: false,
    }
};