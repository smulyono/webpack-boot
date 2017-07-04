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
                            baseConfig : require.resolve('eslint-config-react-app'),
                            useEslintrc : true
                        },
                    },
                ],
                include: constant.PROJECT_DIR
            }            
        ]
    }
}