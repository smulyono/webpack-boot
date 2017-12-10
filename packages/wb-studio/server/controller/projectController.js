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

        if (body.name) {
            // create new project with name
            log.info(`creating project ${body.name}`);
            try {
                let projectOut = await projectUtils.createProject(body.name);
                if (projectOut && projectOut.id) {
                    resp.success = true;
                    resp.message = `Project ${projectOut.id} is created`;
                    resp.data = {
                        id : projectOut.id,
                        name : body.name
                    };
                } else {
                    resp.message = "Project not created";
                }
            } catch (e) {
                log.error(e);
                resp.message = e.message;
            }
        } else {
            log.error("No project name is assigned...");
            resp.message="No project name is assigned, please try again...";
        }
        res.json(resp);
    }

    async handleList(req, res, next) {
        log.info("Listing all available projects ...");
        let resp = new ResponseBody();
        try {
            let output = await projectUtils.listProject();
            resp.success = true;
            resp.data = output;
        } catch(e) {
            resp.success = false;
            resp.message = `Unable to list any projects due to ${e}`;
            resp.data = [];
        }

        res.json(resp);
    }

    async handleRunYarn(req, res, next) {
        let runCmd = req.params.cmd || null,
            projectId = req.params.id || null;

        let resp = new ResponseBody();
            resp.success = false;
            resp.message = "noop";
    
        if (runCmd === null || projectId === null) {
            return req.json(resp);
        }

        /** Start SSE  */
        responseUtils.writeSSEHeader(res);
        const projectOut = await projectUtils.getProject(projectId);
        if (projectOut) {
            log.info(`Project ${projectId} found at ${projectOut.path}`);
        } else {
            resp.message = `Unable to found project ${projectId}`;
            responseUtils.writeSSEData(resp.message);
            responseUtils.writeSSEEndData(JSON.stringify(resp));
        }

        // start preparing `supported` cmd
        if (/[install|start|build]/.test(runCmd)) {
            responseUtils.writeSSEData(res, `executing ${runCmd} on project`);
            let cmd = await projectUtils.runYarn(projectId, [runCmd]);
            cmd.stdout.on("data", (data) => {
                log.info(data.toString());
                responseUtils.writeSSEData(res, data.toString());
            });
            cmd.stdout.on("close", (code) => {
                log.info(`command ${runCmd} exit with ${code}`);
                if (code == 0) {
                    resp.success = true;
                }
                resp.message = "done";
                responseUtils.writeSSEEndData(res, JSON.stringify(resp));
            });

        } else {
            resp.message = `Unable to execute unsupported ${runCmd}`;
            responseUtils.writeSSEData(resp.message);
            responseUtils.writeSSEEndData(JSON.stringify(resp));
        }
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