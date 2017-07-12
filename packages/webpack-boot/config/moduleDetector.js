const chalk = require("chalk"),
    fs = require("fs"),
    // util = require("util"),
    path = require("path");

function _resolveModule(moduleName) {
    let module;
    try {
        module = require.resolve(moduleName);    
    } catch (e) {}

    if (!module) {
        // look in current project 
        var rootPath = fs.realpathSync(process.cwd());
        
        try {
            module = require.resolve(path.resolve(rootPath, 'node_modules',moduleName));
        } catch (e) {}
    }
    return module;
}

function _isModuleExists(moduleName) {
    try {
        let modulePath = require.resolve(moduleName);
        if (modulePath) {
            return true;
        }
    } catch (e) {
    }
    // look in current project 
    var rootPath = fs.realpathSync(process.cwd());
    try {
        let modulePath = require.resolve(path.resolve(rootPath, 'node_modules',moduleName));
        if (modulePath) {
            return true;
        }
    } catch (e) {
    }
    return false;
}

function _loadModule(moduleName) {
    if (_isModuleExists(moduleName)) {
        return true;
    } 
    return false;

}

module.exports = {
    resolveModule : _resolveModule,
    isModuleExists : _isModuleExists,
    detect : function(name, moduleNames) {
        let isLoaded = true;

        process.stdout.write(chalk.magenta('[' + name + ' support]......    '));  
        
        let unloadedModules = [];
        for (let index=0; index< moduleNames.length; index++) {
            if (!_loadModule(moduleNames[index])) {
                unloadedModules.push(moduleNames[index]);
                isLoaded = false;
            }
        }

        if (isLoaded) {
            console.info(chalk.green("[ v ]"));        
        } else {
            console.info(chalk.red("[ x ]"));
            for (let index in unloadedModules) {
                console.info("    " + chalk.red("module " +  unloadedModules[index] +" not found"));
            }
        }
        return isLoaded;
    },
    parseAndDetect : function(json, defaultConfiguration, callback) {
        if (json && json.hasOwnProperty("name") && 
            json.hasOwnProperty("modules") && 
            json.hasOwnProperty("config")) {
            if (this.detect(json.name, json.modules)) {
                defaultConfiguration = json.config(defaultConfiguration);
                if (undefined !== callback) callback(true);
            } else if (undefined !== callback) callback(false);
        } else {
            // not a valid module for webpack-boot, continue....
        }
        // console.log(util.inspect(defaultConfiguration,false,null, true))
        return defaultConfiguration;
    }
}