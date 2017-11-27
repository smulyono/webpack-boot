import { Router } from 'express';
import projectController from '../controller/ProjectController';
// create api route
const router = new Router();

router.route("/apps")
    .get(projectController.handleList);
    
router.route("/app")
    .post(projectController.handleCreate);

router.route("/app/:id/build")
    .post(projectController.handleStatus);

router.route("/app/:id/status")
    .post(projectController.handleStatus);

router.route("/app/:id")
    .delete(projectController.handleDelete);


export default router;