import { Response, Request } from "express";
import HexagonosRepo from "../repository/hexagonos.repo";


export let obtener = async (req: Request, res: Response) => {
    try {
        const hexagonosRepository = new HexagonosRepo();
        const hexagonosVector = await hexagonosRepository.obtener();
        res.json({
            ok:true,
            data:hexagonosVector,
            message: 'Lectura exitosa de hexagonos',
            error:null
        })
    } catch (error: any) {
        res.json({
            ok:false,
            error:error,
            message: 'Error al hexagonos: ' + error.message
        })
    }
}

export let ubicarDelitoEnHexagono = async (req: Request, res: Response) => {
    const longitud = req.params.longitud;
    const latitud = req.params.latitud;
    
    try {
        const hexagonosRepo = new HexagonosRepo();
        const respuesta = await hexagonosRepo.ubicarDelitoEnHexagono(Number(longitud), Number(latitud));
        res.json({
            ok: true,
            data: respuesta,
            message: 'Delito ubicado en hexágono con éxito',
            error: null
        })
    } catch (error:any) {
        res.json({
            ok: false,
            error: error,
            message:'Error al ubicar delito en hexágono: ' + error.message
        })
    }
}