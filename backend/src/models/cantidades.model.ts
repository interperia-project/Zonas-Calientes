import { Schema, model, Document} from 'mongoose';

const cantidadesSchema = new Schema({
    /*idTipoDelito:{
        type: Schema.Types.ObjectId, ref:"TipoDelito",
        required: [true, 'El tipo de delito es necesario']
    },*/
    idHexagono:{
        type: Schema.Types.ObjectId, ref:"Hexagono",
        required: [true, 'El id del hexágono es necesario']
    },
    dia:{
        type: String
    },
    totalDia:{
        type: Number
    },
    cantidad:{
        type: [Number]
    }
});   

interface ICantidad extends Document{
    idTipoDelito: string;
    idHexagono: string;
    dia: string;
    totalDia: number;
    cantidad: [];
}

export const Cantidad = model<ICantidad>('Cantidad', cantidadesSchema, 'cantidades')