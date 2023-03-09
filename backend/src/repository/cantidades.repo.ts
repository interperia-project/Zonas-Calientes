import mongoose from "mongoose";
import CantidadesDto from "../dtos/cantidades.dto";
import { Cantidad } from "../models/cantidades.model";



class CantidadesRepo {

    async crear(cantidadesDto: CantidadesDto): Promise<Boolean> {
        try {
            let cantidadesModel = new Cantidad({
                idHexagono : cantidadesDto.getIdHexagono(),
                dia : cantidadesDto.getDia(),
                totalDia : cantidadesDto.getTotalDia(),
                cantidad : cantidadesDto.getCantidad()
            });
            let cantidades = await Cantidad.create(cantidadesModel);
            return true;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async obtener(): Promise<CantidadesDto[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let cantidadesArray: CantidadesDto[] = [];
                let cantidadesData = await Cantidad.find()
                        .populate([{
                            path:'idTipoDelito'
                        },{
                            path:'idHexagono'
                        }])
                        .sort({"datos.fecha_hecho":1});
                
                cantidadesData.forEach(prueba =>{
                    cantidadesArray.push(new CantidadesDto(prueba));
                });
                resolve(cantidadesArray);
            } catch (error) {
                return reject (error);
            }
        })
    }

    async historicoPorHexagono(idHexagono:string): Promise<any[]>{
        try {
            let historicoPorHexagono = await Cantidad.aggregate([{
                $project: {
                    idHexagono: 1,
                    dia: 1,
                    cantidad: 1,
                    _id:-1
                }
                }, {
                    $match: {
                        idHexagono: new mongoose.Types.ObjectId(idHexagono)
                }
            }
            ]);
            return historicoPorHexagono;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener histórico delitos por hexágono")            
        }
    }

    async totalPorHexagono(idHexagono:string): Promise<any> {
        try {
            let totalPorHexagono = await Cantidad.aggregate([{
                $match: {
                    idHexagono: new mongoose.Types.ObjectId(idHexagono)
                }
            }, {
                $group: {
                    _id: '',
                    total: {
                        $sum: '$totalDia'
                    }
                }
            }]);
            return totalPorHexagono;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener total delitos por hexágono")  
        }
    }

}

export default CantidadesRepo;