import path from 'path';
import config from '../config';
import log from '../logger';
import fs from 'fs';


const createProject = (name) => {
    // creating folder for project in studio working dir
    const workingPath = config.workingdir;
    
    if (!fs.existsSync(workingPath)) {
        fs.mkdirSync(workingPath);
    }
    if (fs.existsSync(path.resolve(workingPath, name))){
        // another project or something already there
        log.info("Project already exists...., continuing");
    } else {
        fs.mkdirSync(path.resolve(workingPath, name));
        log.info("Directory created");
    }

    // run yo webpack-boot

    // do initial yarn install
}

const buildProject = (_id, name) => {

}

const exportProject = (_id, name) => {

}

module.exports = {
    createProject,
    buildProject,
    exportProject
}
