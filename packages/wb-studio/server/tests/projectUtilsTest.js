import putil from '../utils/projectUtils';
import log from '../logger';

const testProjectName = "testutil";

const createProjectTest = async () => {
    try {
        let output = await putil.createProject(testProjectName);
        // let _id = output.id;
        // let cmd = await putil.startProject(_id);
        // cmd.stdout.pipe(process.stdout);
        // cmd.stderr.pipe(process.stderr);
        // cmd.on("close", (code) => {
        //     log.info("command exit with " + code);
        // });
    } catch (err) {
        log.error(err.message);
    }

};

const listProjectTest = async () => {
    let output = await putil.listProject();
    log.info("Listing project...");
    log.info(JSON.stringify(output));
}

const buildProjectTest = async (buildCmd) => {
    try {
        let cmd = await putil.buildProject(testProjectName, buildCmd);
        return new Promise( (resolve, reject) => {
            cmd.stdout.pipe(process.stdout);
            cmd.stderr.pipe(process.stderr);
            cmd.on("error", (error) => {
                log.error(error);
                reject(error);
            });
            cmd.on("close", (code) => {
                log.info("command exit with " + code);
                if (code == 0) {
                    resolve("ok");
                } else {
                    reject(code);
                }
            });    
        });   
    } catch (err) {
        log.error(err);
    }
}

const deleteProjectTest = async () => {
    let output = await putil.deleteProject(testProjectName);
    if (output != null) {
        log.error(output);
    } else {
        log.info(`Project ${testProjectName} is deleted`);
    }
}

const testSuite = async () => {
    await createProjectTest();
    await listProjectTest();
    await buildProjectTest(["install"]);
    await buildProjectTest();
    await deleteProjectTest();
}

testSuite();



