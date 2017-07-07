let constant = require("../../../constant");

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
                            baseConfig : require.resolve('eslint-config-google'),
                            useEslintrc : true
                        },
                    },
                ],
                include: constant.PROJECT_DIR
            }            
        ]
    }
}