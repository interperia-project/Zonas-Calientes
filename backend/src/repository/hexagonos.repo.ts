import HexagonosDto from "../dtos/hexagonos.dto";
import { Hexagonos } from "../models/hexagonos.model"


class HexagonosRepo {

    async obtener(): Promise<HexagonosDto[]> {
        return new Promise (async (resolve, reject) =>{
            try {
                let hexagonosArray: HexagonosDto[] = [];
                let hexagonosData = await Hexagonos.find();
                hexagonosData.forEach((doc: any) =>{
                    hexagonosArray.push(new HexagonosDto(doc));
                });
                resolve(hexagonosArray);
            } catch (error) {
                return reject (error);
            }
        })
    }

    async ubicarDelitoEnHexagono(longitud: number, latitud: number): Promise<HexagonosDto[]>{
        try {
            let idHexagono = await Hexagonos.aggregate([{
                $match:{
                    geometry:{
                        $geoIntersects:{
                            $geometry:{
                                "type": "Point",
                                "coordinates":[longitud,latitud]
                            }        
                        }
                    }
                }
            },{
                $limit:1
            }
        ]);
            return idHexagono;
        } catch (error) {
            console.log(error);
            throw new Error('Error al ubicar delito en hexágono')
        }
    }

}

export default HexagonosRepo;