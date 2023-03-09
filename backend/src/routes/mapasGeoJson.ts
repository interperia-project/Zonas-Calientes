import { Router } from "express";
import * as controller from "../controllers/mapasGeoJson.controller"


const mapasGeoJsonRoutes = Router();

mapasGeoJsonRoutes.post('/crear', controller.crear);
mapasGeoJsonRoutes.get('/obtener', controller.obtener);





export default mapasGeoJsonRoutes;