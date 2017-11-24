import putil from '../utils/projectUtils';
import log from '../logger';

const createProjectTest = async () => {
    let output = await putil.createProject("sanny");
    console.log(JSON.stringify(output));

    let path = output.path;
    let cmd = putil.buildProject(path);
    cmd.stdout.on("data", (data) => {
        console.log(data.toString());
    });
    cmd.stdout.on("error", (data) => {
        console.error(data.toString());
    });
    cmd.on("close", (code) => {
        console.log("command exit with " + code);
    });

};
// putil.createProject("sanny")
// .then((output) => {
//     console.info("Created project : ", output);
// })
// .catch((output) => {
//     console.error("Error ", output);
// })


createProjectTest();
