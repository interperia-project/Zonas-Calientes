import { Router } from "express";

import * as controller from "../controllers/hexagonos.controller";


const hexagonosRoutes = Router();

hexagonosRoutes.get('/obtener', controller.obtener);
hexagonosRoutes.get('/ubicarDelitoEnHexagono/:longitud/:latitud', controller.ubicarDelitoEnHexagono);

export default hexagonosRoutes;