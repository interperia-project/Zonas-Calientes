import { Router } from "express";
import * as controller from "../controllers/delitos.controller";

const delitosRoutes = Router();


delitosRoutes.post('/crear', controller.crear);
delitosRoutes.post('/alimentarDatosDelitos', controller.alimentarDatosDelitos);
delitosRoutes.get('/obtener', controller.obtenerTodos);
delitosRoutes.get('/cantidadDelitosPorHexagonoPorRangoFecha/:idHexagono/:horaInicial/:horaFinal',controller.cantidadDelitosPorHexagonoPorRangoFecha);
delitosRoutes.get('/cantidadPorHexagonoPorDiaPorHora/:idHexagono/:dia/:hora', controller.cantidadPorHexagonoPorDiaPorHora);

export default delitosRoutes;