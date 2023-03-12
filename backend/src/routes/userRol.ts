import { Router} from "express";

import * as controller from "../controllers/userRol.controller";



const userRolRoutes = Router();

userRolRoutes.get('/read', controller.read);





export default userRolRoutes;