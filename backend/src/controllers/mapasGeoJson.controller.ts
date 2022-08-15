import MapasGeoJsonDto from "../dtos/mapasGeoJson.dto";
import MapasGeoJsonRepo from "../repository/mapasGeoJson.repo";
import { Response, Request } from "express";



export let crear = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const mapasGeoJsonDto = new MapasGeoJsonDto(body);
        const mapasGeoJsonRepo = new MapasGeoJsonRepo();
        const newMapasGeoJson = await mapasGeoJsonRepo.crear(mapasGeoJsonDto);
        res.json({
            ok:true,
            data:newMapasGeoJson,
            message: "Mapa almacenado con éxito",
            error:null
        });
    } catch (error:any) {
        res.json({
            ok:false,
            error:error,
            message:"Error al crear mapa" + error.message
        });
    }
}

export let obtener = async (req: Request, res: Response) => {
    try {
        const mapasGeoJsonRepository = new MapasGeoJsonRepo();
        const mapasGeoJsonVector = await mapasGeoJsonRepository.obtener();
        res.json({
            ok:true,
            data:mapasGeoJsonVector,
            message:"Mapa consultado con éxito",
            error:null
        });
    } catch (error:any) {
        res.json({
            ok:true,
            message:"error al consultar mapa" + error.message,
        });
    }
}