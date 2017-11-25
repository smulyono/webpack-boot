import log from '../logger';
import ResponseBody from '../models/responseBody';

class ProjectController {
    handleCreate(req, res, next) {
        let body = req.body;
        log.info("Request for create message ", body);
        
        if (body.name) {
            // create new project with name
            
        }

        let resp = new ResponseBody();
        resp.success = true;
        resp.message = "This is object";
        res.json(resp);
    }

    handleList(req, res, next) {
    }

    handleStatus(req, rest, next) {
        // 
    }
}

const projectControllerInstance = new ProjectController();

export default projectControllerInstance;