import { Schema, model, Document} from 'mongoose';

const trainingInformationSchema = new Schema({
    cluster_id:{
        type: String
    },
    fields:[{
        training_model_path:{
            type: String
        },
        scaler_path:{
            type: String
        },
        next_input_vector:{
            type: []
        }
    }]
});   

interface ITrainingInformation extends Document{
    cluster_id: string;
    fields: [];
}

export const TrainingInformation = model<ITrainingInformation>('TrainingInformation', trainingInformationSchema, 'trainingInformation')