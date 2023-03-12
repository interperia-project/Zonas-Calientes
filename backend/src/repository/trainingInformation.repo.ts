import TrainingInformationDto from "../dtos/trainingInformation.dto";
import { TrainingInformation } from "../models/trainingInformation.model";



class TrainingInformationRepo{
    async crear(trainingInformationDto: TrainingInformationDto): Promise<Boolean>{

        try {
            let trainingInformationModel = new TrainingInformation({
                cluster_id:trainingInformationDto.getCluster_id(),
                fields: trainingInformationDto.getFields(),
            });

            let respuesta = await TrainingInformation.create(trainingInformationModel);

            return true;

        } catch (error:any) {
            console.log(error);
            throw error;
        }
    }

    async obtenerPorId(rtaTrainingInformationId: string): Promise<any> {
        try {
            let rtaTrainingInformation = await TrainingInformation.findById(rtaTrainingInformationId).exec();
            return rtaTrainingInformation;
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener información de entrenamiento por id');
        }
    }

    async obtenerTodos(): Promise<TrainingInformationDto[]>{
        return new Promise<TrainingInformationDto[]>(async(resolve,reject) => {
            try {
                let rtaTrainingInformationArray: TrainingInformationDto[] = [];

                let rtaTrainingInformationData = await TrainingInformation.find();

                rtaTrainingInformationData.forEach(rtaTrainingInformation =>{
                    rtaTrainingInformationArray.push(new TrainingInformationDto(rtaTrainingInformation))
                });

                resolve(rtaTrainingInformationArray);

            } catch (error) {
                return reject(error);
            }
        })
    }

    async actualizarPorId(trainingInformationId: string, trainingInformation:any): Promise<Boolean>{
        try {
            let rtaTrainingInformationActualizado = await TrainingInformation.findByIdAndUpdate(trainingInformationId,{...trainingInformation});
            console.log('devuelve: ', rtaTrainingInformationActualizado);

            return true;

        } catch (error) {
            console.log(error);
            throw (error);
        }
    }
}

export default TrainingInformationRepo;