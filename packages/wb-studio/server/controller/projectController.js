import log from '../logger';
import ResponseBody from '../models/responseBody';
import projectUtils from '../utils/projectUtils';
import responseUtils from '../utils/responseUtils';

class ProjectController {
    async handleCreate(req, res, next) {
        let body = req.body;
        log.info("Request for create message ", body);
        
        let resp = new ResponseBody();
        resp.success = false;
        resp.message = "noop";
        // prepare SSE header
        responseUtils.writeSSEHeader(res);

        if (body.name) {
            // create new project with name
            responseUtils.writeData(res, "creating project...");
            try {
                let projectOut = await projectUtils.createProject(body.name);
                if (projectOut && projectOut.id) {
                    // let start doing yarn install
                    let cmd  = await projectUtils.buildProject(projectOut.id, ["install"])
                    cmd.stdout.on("data", (data) => {
                        log.info(data.toString());
                        responseUtils.writeData(res, data.toString());
                    });
                    cmd.on("close", (code) => {
                        // when it is finish
                        log.info("Command exit with " + code);
                        if (code == 0) {
                            resp.success = true;
                        }
                        resp.message = projectOut;
                        responseUtils.writeEndData(res, JSON.stringify(resp));
                    })
                } else {
                    resp.message = "Project not created";
                    responseUtils.writeEndData(res, JSON.stringify(resp));
                }
            } catch (e) {
                log.error(e);
                resp.message = e.message;
                responseUtils.writeEndData(res, JSON.stringify(resp));
            }
        }
    }

    async handleList(req, res, next) {
        log.info("Listing all available projects ...");
        let output = await projectUtils.listProject();

        let resp = new ResponseBody();
        resp.success = false;
        resp.message = output;
        res.json(resp);
    }

    handleStatus(req, rest, next) {
        // 
    }

    async handleDelete(req, res, next) {
        var id = req.params.id;
        let resp = new ResponseBody();
        resp.success = false;
        resp.message = "noop";
        
        if (id) {
            let output = await projectUtils.deleteProject(id);
            if (output != null) {
                log.error(output);
                resp.message = output;
            } else {
                resp.success = true;
                resp.message = `Project ${id} is deleted`;
            }
        }
        res.json(resp);
    }
}

const projectControllerInstance = new ProjectController();

export default projectControllerInstance;