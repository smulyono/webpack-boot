import { Router } from 'express';
import projectController from '../controller/ProjectController';
// create api route
const router = new Router();

router.route("/apps")
    .get(projectController.handleList);
    
router.route("/app")
    .post(projectController.handleCreate);


export default router;