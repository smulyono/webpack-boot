let constant = require("../../../constant"),
    moduleDetector = require("../../../moduleDetector");

module.exports = {
    module : {
        rules : [
            {
                test: constant.FILE_LOADER_REGEX,
                use: [
                    {
                        loader: moduleDetector.resolveModule('file-loader'),
                    },
                ]
            }            
        ]
    }
}