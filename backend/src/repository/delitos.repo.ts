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
                idHexagono: delitosDto.getIdHexagono()
            });

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
                        .populate([{
                            path:'idTipoDelito'
                        },{
                            path:'idHexagono'
                        }])
                        .sort({"datos.fecha_hecho":1});
                        
                        
                delitosData.forEach(prueba =>{
                    delitosArray.push(new DelitosDto(prueba));
                });

                resolve(delitosArray);

            } catch(error) {
                return reject (error);
            }
        })
    }



}

export default DelitosRepo;