import mongoose from "mongoose";
import CantidadesDto from "../dtos/cantidades.dto";
import DelitosDto from "../dtos/delitos.dto";
import { Delito } from "../models/delitos.model";


class DelitosRepo {

    async crear(delitosDto: DelitosDto): Promise<Boolean> {
        try{
            let delitosModel = new Delito({
                idTipoDelito: delitosDto.getIdTipoDelito(),
                numero: delitosDto.getNumero(),
                fecha: delitosDto.getFecha(),
                longitud: delitosDto.getLongitud(),
                latitud: delitosDto.getLatitud(),
                sexo: delitosDto.getSexo(),
                edad: delitosDto.getEdad(),
                medio_transporte: delitosDto.getMedioTransporte(),
                modalidad: delitosDto.getModalidad(),
                arma_medio: delitosDto.getArmaMedio(),
                nombre_barrio: delitosDto.getArmaMedio(),
                codigo_barrio: delitosDto.getCodigoBarrio(),
                comuna: delitosDto.getComuna(),
                lugar: delitosDto.getLugar(),
                idHexagono: delitosDto.getIdHexagono(),
                dia: delitosDto.getDia(),
                hora_i: delitosDto.getHoraI()
            });
            console.log(delitosModel)
            let delitos = await Delito.create(delitosModel);

            return true;
        }
        catch(error) {
            console.log(error);
            throw(error);
        } 
    }

    async obtenerTodos(): Promise<DelitosDto[]> {
        return new Promise (async (resolve, reject) => {
            try{
                let delitosArray: DelitosDto[] = [];
                let delitosData = await Delito.find()
                        /*.populate([{
                            path:'idTipoDelito'
                       },{
                            path:'idHexagono'
                        }])*/
                        .sort({
                            "idHexagono": 1,
                            "fecha":1,
                            "hora_i":1
                        });   
                delitosData.forEach(prueba =>{
                    delitosArray.push(new DelitosDto(prueba));
                });
                resolve(delitosArray);
            } catch(error) {
                return reject (error);
            }
        })
    }

    async cantidadDelitosPorHexagonoPorRangoFecha(idHexagono: string, horaInicial: number, horaFinal:number): Promise<any[]> {   
        try {
            let cantidadDelitos = await Delito.aggregate([{
                $project: {
                    _id: 0,
                    numero: 0,
                    medio_transporte: 0,
                    idTipoDelito: 0,
                    arma_medio: 0,
                    lugar: 0,
                    __v: 0,
                    modalidad: 0
                    }
                }, {
                    $match: {
                        idHexagono: {
                            $eq: new mongoose.Types.ObjectId(idHexagono)
                        }
                    }
                }, {
                    $match: {
                        fecha: {
                            $gte : horaInicial,
                            $lte: horaFinal
                        }
                    }
                }, {
                    $count: 'cantidad'
                }
            ]);
           
            return cantidadDelitos;
        } catch (error) {
            console.log(error);
            throw new Error("Error al botener cantidad delitos por hexágono");
        }
    }

    async cantidadDelitosPorHexagono(idHexagono: string): Promise<any[]> {   
        try {
            let cantidadDelitos = await Delito.aggregate([{
                $project: {
                    idHexagono:1,
                    fecha: 1,
                    dia: 1,
                    hora_i: 1
                    }
                }, {
                    $sort:{
                        idHexagono:1,
                        fecha: 1,
                        dia: 1,
                        hora_id: 1
                    }
                },{
                    $match: {
                        idHexagono: {
                            $eq: new mongoose.Types.ObjectId(idHexagono)
                        }
                    }
                }, {
                    $count: 'cantidad'
                }
            ]);
           
            return cantidadDelitos;
        } catch (error) {
            console.log(error);
            throw new Error("Error al botener cantidad delitos por hexágono");
        }
    }

    async cantidadDelitosPorHexagonoDia(idHexagono: string, dia: string): Promise<any[]> {  
       // console.log("Dia en delistosRepo: ",dia);
         
        try {
            let cantidadDelitos = await Delito.aggregate([{
                $project: {
                    idHexagono:1,
                    fecha: 1,
                    dia: 1,
                    hora_i: 1
                }
                }, {
                    $match: {
                        idHexagono: {
                            $eq: new mongoose.Types.ObjectId(idHexagono)
                        }
                    }
                }, {
                    $match: {
                        dia:{
                            $eq: dia
                        }
                    }
                }, {
                    $count: 'cantidad'
                }
            ]);
           
            return cantidadDelitos;
        } catch (error) {
            console.log(error);
            throw new Error("Error al botener cantidad delitos por hexágono por dia");
        }
    }

    async cantidadDelitosPorHexagonoDiaPorHora(idHexagono:string, dia:string, hora:number): Promise<any[]> {   
        console.log("hexágono: ", idHexagono);
        console.log("dia: ", dia);
        console.log("hora: ", hora);
        try {
            let cantidadDelitos = await Delito.aggregate([{
                $project: {
                    idHexagono:1,
                    fecha: 1,
                    dia: 1,
                    hora_i: 1
                    }
                }, {
                    $match: {
                        idHexagono: {
                            $eq: new mongoose.Types.ObjectId(idHexagono)
                        }
                    }
                }, {
                    $match: {
                        dia:{
                            $eq: dia
                        }
                    }
                },{
                    $match: {
                        hora_i: {
                            $eq: hora
                        }
                    }
                }, {
                    $count: 'cantidadHora'
                }
            ]);
            return cantidadDelitos;
        } catch (error) {
            console.log(error);
            throw new Error("Error al botener cantidad delitos por hexágono por dia por hora");
        }
    }

    async obtenerPorHexagono(idHexagono: string): Promise<any[]> {
        try{
            let delitos = await Delito.aggregate([
                {
                    $match: {
                        idHexagono: {
                            $eq: new mongoose.Types.ObjectId(idHexagono)
                        }
                    }
                }, {
                    $sort: {
                        fecha: 1
                    }
                }
            ]);
            return delitos;
        } catch(error) {
            console.log(error);
            throw new Error("Error al leer delitos");
        }
    }
    
    async cantidadDelitosPorHexagonoPorDiaPorHora(idHexagono: string, dia:string, hora: number ): Promise<CantidadesDto> {   
        return new Promise<CantidadesDto>(async(resolve, reject) => {
            try {
                let cantidadesData = await Delito.find({idHexagono:idHexagono, hora_i:hora, dia:dia})
                let cantidadesDto: CantidadesDto = new CantidadesDto({
                    idHexagono:idHexagono,
                    dia:dia,
                    hora:hora,
                    cantidad: cantidadesData.length
                })
                console.log(cantidadesDto);
                resolve(cantidadesDto);
            } catch (error) {
                console.log(error);
                reject(new Error("Error al botener cantidad delitos por hexágono"));
            }
        })
    }

    async cantidadDelitosPorHexagonoPorTipoDelito(idHexagono: string, dia:string): Promise<CantidadesDto> {   
        return new Promise<CantidadesDto>(async(resolve, reject) => {
            try {
                let cantidadesData = await Delito.find({idHexagono:idHexagono, dia:dia})
                let cantidadesDto: CantidadesDto = new CantidadesDto({
                    idHexagono:idHexagono,
                    dia:dia,
                    cantidad: cantidadesData.length
                })
                console.log(cantidadesDto);
                resolve(cantidadesDto);
            } catch (error) {
                console.log(error);
                reject(new Error("Error al botener cantidad delitos por hexágono"));
            }
        })
    }


}

export default DelitosRepo;
