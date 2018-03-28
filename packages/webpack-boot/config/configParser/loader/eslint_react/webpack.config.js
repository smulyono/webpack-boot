let constant = require("../../../constant"),
    moduleDetector = require("../../../moduleDetector");

module.exports = {
    module : {
        rules : [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: require.resolve('eslint-loader'),
                        options: {
                            failOnError: true,
                            baseConfig : {
                                extends : [
                                    'react-app',
                                    'plugin:react/recommended'
                                ]
                            },
                            useEslintrc : true
                        },
                    },
                ],
                include: constant.PROJECT_DIR
            }            
        ]
    }
}