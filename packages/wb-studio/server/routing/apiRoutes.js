import { Router } from 'express';
import ApiController from '../controller/apiController';
// create api route
const router = new Router();

router.route("/apps")
    .get(ApiController.handleList);
    
router.route("/app")
    .post(ApiController.handleCreate);


export default router;