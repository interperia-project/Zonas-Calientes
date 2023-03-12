import { Router } from "express";

import * as controller from "../controllers/tipoDelito.controller";



const tipoDelitoRoutes = Router();



tipoDelitoRoutes.get('/obtener', controller.obtener);


export default tipoDelitoRoutes;