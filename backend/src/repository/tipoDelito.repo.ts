import TipoDelitoDto from "../dtos/tipoDelito.dto";
import { TipoDelito } from "../models/tipoDelito.model";



class TipoDelitoRepo {
    async obtener(): Promise<TipoDelitoDto[]> {
        return new Promise (async (resolve, reject) => {
            try {
                let tipoDelitoArray: TipoDelitoDto[] = [];

                let tipoDelitoData = await TipoDelito.find();

                tipoDelitoData.forEach(tipos => {
                    tipoDelitoArray.push(new TipoDelitoDto(tipos));
                });

                resolve(tipoDelitoArray);

            } catch (error) {
                return reject(error);
            }
        })
    }
}


export default TipoDelitoRepo;