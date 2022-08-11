import { Router } from "express";
import * as controller from "../controllers/usuarios.controller";


const uRoutes = Router();


uRoutes.post('/crear', controller.crear);




export default uRoutes;