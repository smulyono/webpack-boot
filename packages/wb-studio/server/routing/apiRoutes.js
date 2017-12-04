import { Router } from 'express';
import projectController from '../controller/ProjectController';
// create api route
const router = new Router();

router.route("/apps")
    .get(projectController.handleList);
    
router.route("/app")
    .post(projectController.handleCreate);

/** SSE Methods */
router.route("/app/:id/run/:cmd")
    .get(projectController.handleRunYarn);
/** end of SSE Methods */

router.route("/app/:id")
    .delete(projectController.handleDelete);


export default router;