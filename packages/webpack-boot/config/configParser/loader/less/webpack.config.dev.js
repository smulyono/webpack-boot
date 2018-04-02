let constant = require("../../../constant"),
    moduleDetector = require("../../../moduleDetector");

module.exports = {
    module : {
        rules : [
            {
                test: /\.less$/,
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
                            ident : "postcss",
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
                    },
                    moduleDetector.resolveModule("less-loader")                    
                ],
                include: constant.PROJECT_DIR
            }            
        ]
    }
}