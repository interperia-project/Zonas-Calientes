import { Router } from "express";
import * as controller from "../controllers/cantidades.controller";

const cantidadesRoutes = Router();

cantidadesRoutes.post('/crear', controller.crear);
cantidadesRoutes.post('/alimentarCantidades', controller.alimentarCantidades);

cantidadesRoutes.get('/obtenerPorHexagono/:idHexagono', controller.obtenerPorHexagono);
cantidadesRoutes.get('/historicoPorHexagono/:idHexagono', controller.historicoPorHexagono);
cantidadesRoutes.get('/totalPorHexagono/:idHexagono', controller.totalPorHexagono);


export default cantidadesRoutes;