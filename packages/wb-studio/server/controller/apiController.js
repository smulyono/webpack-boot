import log from '../logger';

class ApiController {
    handleCreate(req, res) {

    }

    handleList(req, res, next) {
        log.info("Request for listing");
    }
}

const apiControllerInstance = new ApiController();

export default apiControllerInstance;