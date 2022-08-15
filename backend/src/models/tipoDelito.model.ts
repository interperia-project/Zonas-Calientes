import { Schema, model, Document} from 'mongoose';


const tipoDelitoSchema = new Schema({
    nombre:{
        type: String
    },
    id_medata:{
        type: String
    }
});


interface  ITipoDelito extends Document {
    nombre: string;
    id_medata: string;
};


export const TipoDelito = model<ITipoDelito>('TipoDelito',tipoDelitoSchema, 'tiposDelito')