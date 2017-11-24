import path from 'path';
import config from '../config';
import log from '../logger';
import fs from 'fs';
import yeoman from 'yeoman-environment';
import uuid from 'uuid';
import { spawn } from 'child_process';

/**
 * Creating project folder on studio working dir. After
 * folder is created, webpack-boot project also generated.
 * 
 * @param {String} name 
 */
const createProject = (name) => {
    return new Promise( (resolve, reject) => {
        // creating folder for project in studio working dir
        const workingPath = config.workingdir;
        
            if (!fs.existsSync(workingPath)) {
                fs.mkdirSync(workingPath);
            }
            if (fs.existsSync(path.resolve(workingPath, name))) {
                // another project or something already there
                log.info("Project already exists...., continuing");
            } else {
                fs.mkdirSync(path.resolve(workingPath, name));
                log.info("Directory created");
            }
            const projectPath = path.resolve(workingPath, name);
        
            // run yo webpack-boot
            const env = yeoman.createEnv();
            env.register(require.resolve("generator-webpack-boot"), "web:boot");
            // create promise
            env.run("web:boot " + projectPath, {}, (err) => {
                if (err) {
                    reject (err);
                } else {
                    // once webpack is done
                    const _id = uuid.v4();
                    resolve ({
                        "id" : _id,
                        "name" : name,
                        "path" : projectPath
                    });
                }
            });
        })
}

const buildProject = (projectPath) => {
    return spawn("yarn", ["start"], {
        cwd : projectPath
    });
}

const exportProject = (_id, name) => {

}

module.exports = {
    createProject,
    buildProject,
    exportProject
}
