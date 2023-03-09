import { Response, Request } from "express";
import { ObjectId } from "mongodb";
import CantidadesDto from "../dtos/cantidades.dto";
import CantidadesRepo from "../repository/cantidades.repo";
import cantidadesRepo from "../repository/cantidades.repo";
import delitosRepo from "../repository/delitos.repo";
import DelitosRepo from "../repository/delitos.repo";
import HexagonosRepo from "../repository/hexagonos.repo";



export let crear = async(req: Request, res: Response) => {
    try {
        const body = req.body;
        const cantidadesDto = new CantidadesDto(body);
        const cantidadesRepo = new CantidadesRepo();
        const nuevaCantidad = await cantidadesRepo.crear(cantidadesDto)
        res.json({
            ok:true,
            data: nuevaCantidad,
            message: 'Cantidad almacenada con éxito',
            error: null
        })
    } catch (error:any) {
        res.json({
            ok:false, 
            error: error,
            message: 'Error al almacenar cantidad' + error.message
        });
    }
}

export let obtenerPorHexagono = async (req: Request, res: Response) => {
    const idHexagono = req.params.idHexagono;
    try {
        const delitosRepository = new delitosRepo();
        const cantidadVector = await delitosRepository.obtenerPorHexagono(idHexagono);
        res.json({
            ok:true,
            data: cantidadVector,
            message: 'Dato obtenido con éxito',
            error: null
        });
    } catch (error:any) {
        res.json({
            ok:false, 
            error: error,
            message: 'Error al leer datos: ' + error.message
        });
    }
}

export let alimentarCantidades = async (req:Request, res: Response) => {
    let hexagonos : any;
    let delitos : any;
    let cantidadConsulta : any;
    let cantidadDelitosPorHexagono : any;
    let cantConsultadaPorDiaHora: any;

    let cantidad = 0;
    let total = 0;
    let cantHora = new Array();
    let dia_i = 1045267200000; //15-02-2003 00-00-00
    let dia_f = 1659311999000; //31-07-2022 23-59-59

    const delitosRepo = new DelitosRepo();
    const cantidadesRepo = new CantidadesRepo();  
    const hexagonosRepo = new HexagonosRepo();
    
    delitos = await delitosRepo.obtenerTodos();
    hexagonos = await hexagonosRepo.obtener(); 

    try {
        /*-------------------------------------------*/
        //console.log("cantidad delitos: ", delitos.length);
        /*-------------------------------------------*/
        for(let i = 0; i < hexagonos.length; i++) {
            cantidadDelitosPorHexagono = await delitosRepo.cantidadDelitosPorHexagono(hexagonos[i]._id);
            if (cantidadDelitosPorHexagono.length > 0){
                /*-------------------------------------------*/
                //console.log("Hexagono: ",hexagonos[0]._id);
                /*-------------------------------------------*/
                for (let j = dia_i; j <= dia_f; j+=86400000){
                    total=0;
                    let dia = new Date(j);   
                    cantidadConsulta = await delitosRepo.cantidadDelitosPorHexagonoDia(hexagonos[i]._id, dia.toLocaleDateString());
                    /*-------------------------------------------*/   
                    //console.log("hexagono: ",hexagonos[i]._id,' Dia: ',dia.toLocaleDateString())
                    /*-------------------------------------------*/
                    if (cantidadConsulta.length > 0){
                        cantHora.fill(0);
                        for (let k = 0; k < 24; k++) {
                            cantConsultadaPorDiaHora = await delitosRepo.cantidadDelitosPorHexagonoDiaPorHora(hexagonos[i]._id, dia.toLocaleDateString(), k);                            
                            if (cantConsultadaPorDiaHora.length > 0) {
                                cantidad = Number(cantConsultadaPorDiaHora[0].cantidadHora);
                            }else{
                                cantidad =0;
                            }
                            cantHora[k]=cantidad;
                        }
                        for(let i=0; i<cantHora.length; i++){
                            total+=cantHora[i];
                        }
                        /*-------------------------------------------*/
                        //console.log("cantidad por hora: ",cantHora);
                        //console.log("cantidad dia: ",total);
                        /*-------------------------------------------*/
                        try {
                            const cantidadesDto = new CantidadesDto({
                                idHexagono: hexagonos[i]._id,
                                dia: dia.toLocaleDateString(),
                                cantidad: cantHora,
                                totalDia: total
                            });
                            const nuevaCantidad = await cantidadesRepo.crear(cantidadesDto);
                            /*-------------------------------------------*/
                            console.log("hexagono: ",hexagonos[i]._id, " Dia: ",dia.toLocaleDateString()," Total dia: ",total," Cantidad por hora: ",cantHora);
                        } catch (error) {
                            console.log("Error al guardar cantidad delito por hexágono por hora",error);
                        } 
                    }
                }
            }
        }
    } catch (error:any) {
        res.json({
            ok:false, 
            error: error,
            message: 'Error al alimentar cantidades: ' + error.message
        });
    }
}

export let historicoPorHexagono = async (req: Request, res: Response) => {
    const idHexagono = req.params.idHexagono;
    try {
        const cantidadesRepo = new CantidadesRepo();
        const respuesta = await cantidadesRepo.historicoPorHexagono(idHexagono);
        res.json({
            ok:true,
            data:respuesta,
            message:"OK - Histórico por hexágono",
            error:null
        })
    } catch (error:any) {
        res.json({
            ok: false,
            error: error,
            message:"ERRROR - Histórico por hexágono" + error.message
        })
    }
}

export let totalPorHexagono = async (req: Request, res: Response) => {
    const idHexagono = req.params.idHexagono;
    try {
        const cantidadesRepo = new CantidadesRepo();
        const respuesta = await cantidadesRepo.totalPorHexagono(idHexagono);
        res.json({
            ok:true,
            data:respuesta,
            message:"OK - Total por hexágono",
            error:null
        })
    } catch (error:any) {
        res.json({
            ok: false,
            error: error,
            message:"ERRROR - Total por hexágono" + error.message
        })
    }
}