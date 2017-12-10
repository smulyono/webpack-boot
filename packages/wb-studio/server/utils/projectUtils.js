import path from 'path';
import config from '../config';
import log from '../logger';
import fs from 'fs-extra';
import yeoman from 'yeoman-environment';
import uuid from 'uuid';
import spawn from 'cross-spawn';
import db from './dbUtils';
import { inherits } from 'util';

/**
 * Creating project folder on studio working dir. After
 * folder is created, webpack-boot project also generated.
 * 
 * @param {String} _name 
 */
const createProject = async (_name) => {
    const name = (_name ? _name.toLowerCase() : "");
    try {
        const exists = await db.get(name);
        throw new Error("Project already exists");
    } catch (err) {
        // expecting some error, but only for key not found
        if (err.type !== "NotFoundError") {
            throw new Error(err);
        }
    }

    return new Promise( (resolve, reject) => {
    
        // creating folder for project in studio working dir
        const workingPath = config.workingdir;
        const folderName = uuid.v4();

        if (!fs.existsSync(workingPath)) {
            fs.mkdirSync(workingPath);
        }
        if (fs.existsSync(path.resolve(workingPath, folderName))) {
            // another project or something already there
            log.info("Project already exists...., continuing");
        } else {
            fs.mkdirSync(path.resolve(workingPath, folderName));
            log.info("Directory created");
        }
        const projectPath = path.resolve(workingPath, folderName);
    
        // run yo webpack-boot
        const env = yeoman.createEnv();
        env.register(require.resolve("generator-webpack-boot"), "web:boot");
        // create promise
        env.run("web:boot " + projectPath, {"skipInstall" : true}, (err) => {
            if (err) {
                reject (err);
            } else {
                // once webpack is done
                const id = uuid.v4();
                const projectOut = {
                    "id" : id,
                    "name" : name,
                    "path" : projectPath
                };
                db.put(id, projectOut, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(projectOut);
                    }
                });
            }
        });
    })
}

const exportProject = (_id, name) => {

}

const runYarn = async (_id, buildCmd = ["build"]) => {
    const projectOut = await db.get(_id);
    if (projectOut) {
        log.info("Building project at " +  projectOut.path);
        return spawn("yarn" , buildCmd, {
            cwd : projectOut.path,
            encoding : "utf8"
        });
    } else {
        console.error("No project to be build!");
        return null;
    }
}

const deleteProject = async (_id) => {
    let project = await db.get(_id);
    if (project) {
        return new Promise( (resolve, reject) => {
            db.del(_id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    // delete the actual folder
                    fs.removeSync(project.path);
                    resolve(null);
                }
            });
        });
    } else {
        log.warn("No project found for " + _id);
    }
    return null;
}

const listProject =  () => {
    return new Promise((resolve, reject) => {
        var stream = db.createReadStream();
        let output = {};
        stream.on("data", (data) => {
            output[data.key] = data.value;
        });
        stream.once("end", () => {
            
        });
        stream.once("close", () => {
            resolve(output);
        });
        stream.once("error", (err) => {
            log.error("Read db stream output error", err);
            reject(err);
        });

    });
}

const getProject = async (_id) => {
    let project = await db.get(_id);
    return project;
}

module.exports = {
    createProject,
    exportProject,
    runYarn,
    deleteProject,
    listProject,
    getProject
}
