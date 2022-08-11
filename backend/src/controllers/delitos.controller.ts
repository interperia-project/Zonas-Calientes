import { Response, Request } from "express";
import { ObjectId } from "mongodb";
import DelitosDto from "../dtos/delitos.dto";
import delitosRepo from "../repository/delitos.repo";
import DelitosRepo from "../repository/delitos.repo";
import HexagonosRepo from "../repository/hexagonos.repo";
import hexagonosRoutes from "../routes/hexagonos";

export let crear = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        
        const delitosDto = new DelitosDto(body);
        const delitosRepo = new DelitosRepo();
        const nuevoDelito = await delitosRepo.crear(delitosDto);
        res.json({
            ok:true,
            data: nuevoDelito,
            message: 'Dato de prueba almacenado con éxito',
            error: null
        });
    }catch (error:any) {
        res.json({
            ok:false, 
            error: error,
            message: 'Error al crear dato de prueba' + error.message
        });
    }
}


export let obtenerTodos = async (req: Request, res: Response) => {
    try{
        const delitosRepository = new delitosRepo();
        const coleccionPVector = await delitosRepository.obtenerTodos();
        res.json({
            ok:true,
            data: coleccionPVector,
            message: 'Dato de prueba almacenado con éxito',
            error: null
        });
    }catch (error:any) {
        res.json({
            ok:false, 
            error: error,
            message: 'Error al leer datos: ' + error.message
        });
    }
}


export let alimentarDatosDelitos = async (req: Request, res: Response) => {
    try {
        if(!req.files) {
            return res.status(400).json({
                ok: false,
                message: 'No se cargaron archivos'
            })
        }

        let idTipoDelito = req.body.idTipoDelito;
        let archivoEjemplo: any = req.files.datos;
        let datosString = archivoEjemplo.data.toString()
        let lineas = datosString.split('\n');    
        let cantidadNaN=0;

        const delitosRepo = new DelitosRepo();
        const hexagonosRepo = new HexagonosRepo();
        
        for (let indiceLines = 1; indiceLines < lineas.length; indiceLines++) {
            const linea = lineas[indiceLines];

            let datosArray: string[] = linea.split(';');
            let fecha =  new Date(datosArray[0]);
            let hexagono:any;

            try {
                hexagono = await hexagonosRepo.ubicarDelitoEnHexagono(Number(datosArray[3]), Number(datosArray[2]));

                const delitoDto = new DelitosDto({
                    idTipoDelito: idTipoDelito,
                    numero: 0,
                    longitud: Number(datosArray[3]),
                    latitud: Number(datosArray[2]),
                    sexo: datosArray[4],
                    edad: Number(datosArray[5]),
                    medio_transporte: datosArray[13],
                    modalidad: datosArray[17],
                    arma_medio: datosArray[20],
                    nombre_barrio: datosArray[23],
                    codigo_barrio: datosArray[24],
                    comuna: datosArray[25],
                    lugar: datosArray [26],
                    fecha: fecha.getTime(),
                    idHexagono: hexagono[0]._id
                });
                const nuevoDelito = await delitosRepo.crear(delitoDto);
            } catch (error) {
                console.log("dato ignorado",datosArray);
                cantidadNaN++;
            }
        }  
        res.json({
            ok:true,
            data: 'lo cargó',
            message: 'Datos de prueba almacenado con éxito',
            error: null
        });
    } catch (error: any) {
        res.json({
            ok:false, 
            error: error,
            message: 'Error al alimentar datos: ' + error.message
        });
    }
}