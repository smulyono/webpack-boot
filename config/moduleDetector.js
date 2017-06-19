const chalk = require("chalk"),
    fs = require("fs"),
    path = require("path");

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
    isModuleExists : _isModuleExists,
    detect : function(mainModule) {
        let moduleNames = arguments,
            isLoaded = true;

        process.stdout.write(chalk.magenta('[' + mainModule + ' support]......    '));  
        
        let unloadedModules = [];
        for (let index in moduleNames) {
            if (index === 0) continue;
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
    }
}