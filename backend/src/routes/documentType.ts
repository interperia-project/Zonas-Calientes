import { Router} from "express";

import * as controller from "../controllers/documentType.controller";



const documentTypeRoutes = Router();

documentTypeRoutes.get('/read', controller.read);





export default documentTypeRoutes;