import { Router } from "express";
import * as controller from "../controllers/user.controller";


const userRoutes = Router();


userRoutes.post('/register', controller.register);
userRoutes.post('/updateById', controller.updateById);




export default userRoutes;