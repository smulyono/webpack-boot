let constant = require("../../../constant"),
    moduleDetector = require("../../../moduleDetector");

    
// construct url loader default options
const optionsDefault = {
    limit : constant.URL_LOADER_LIMIT,
};
if (constant.URL_LOADER_MIMETYPE.length > 0) {
    optionsDefault["mimetype"] = constant.URL_LOADER_MIMETYPE;
}

module.exports = {
    module : {
        rules : [
            {
                test: constant.URL_LOADER_REGEX,
                use: [
                    {
                        loader: moduleDetector.resolveModule('url-loader'),
                        options: optionsDefault
                    },
                ]
            }            
        ]
    }
}