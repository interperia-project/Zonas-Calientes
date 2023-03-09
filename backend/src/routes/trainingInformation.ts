import { Router } from "express";

import * as controller from "../controllers/trainingInformation.controller";


const trainingInformationRoutes = Router();

trainingInformationRoutes.post('/crear', controller.crear);
trainingInformationRoutes.get('/obtener', controller.obtenerTodos);
trainingInformationRoutes.get('/obtenerPorId/:id', controller.obtenerPorId);
trainingInformationRoutes.post('/actualizarPorId/:id', controller.actualizarPorId);


export default trainingInformationRoutes;