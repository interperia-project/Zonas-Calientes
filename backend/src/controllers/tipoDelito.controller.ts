import { Response, Request } from "express";
import TipoDelitoRepo from "../repository/tipoDelito.repo";




export let obtener = async (req: Request, res: Response) => {
    try {
        const tipoDelitoRepository = new TipoDelitoRepo();
        const tipoDelitoVector = await tipoDelitoRepository.obtener();
        res.json({
            ok:true,
            data:tipoDelitoVector,
            message: 'Lectura exitosa tipo delito',
            error:null
        });
    } catch (error:any) {
        res.json({
            ok:false,
            error:error,
            message: 'Error al leer tipo delito: ' + error.message
        })
    }
}