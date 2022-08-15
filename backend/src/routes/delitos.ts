import { Router } from "express";

import * as controller from "../controllers/delitos.controller";

const delitosRoutes = Router();


delitosRoutes.post('/crear', controller.crear);
delitosRoutes.get('/obtener', controller.obtenerTodos);
delitosRoutes.post('/alimentarDatosDelitos', controller.alimentarDatosDelitos)

export default delitosRoutes;