import { Schema, model, Document} from 'mongoose';

const delitosSchema = new Schema({
    idTipoDelito:{
        type: Schema.Types.ObjectId, ref:"TipoDelito",
        required: [true, 'El tipo de delito es necesario']
    },
    idHexagono:{
        type: Schema.Types.ObjectId, ref:"hexaGeoJson",
        required: [true, 'El id del hexágono es necesario']
    },
    numero:{
        type: Number,
    },
    fecha:{
        type: Number
    },
    longitud: {
        type: Number,
    },
    latitud:{
        type: Number
    },
    sexo:{
        type: String
    },
    edad:{
        type:Number
    },
    medio_transporte:{
        type: String
    },
    modalidad:{
        type: String
    },
    arma_medio:{
        type: String
    },
    nombre_barrio:{
        type: String
    },
    codigo_barrio:{
        type: String
    },
    comuna:{
        type: String
    },
    lugar:{
        type: String
    },
    dia:{
        type: String
    },
    hora_i:{
        type: Number
    }
});

interface IDelito extends Document{
    idTipoDelito: string;
    numero: number;
    fecha: number;
    longitud: number;
    latitud: number;
    sexo: string;
    edad: number;
    medio_transporte: string;
    modalidad: string;
    arma_medio: string;
    nombre_barrio: string;
    codigo_barrio: string;
    comuna: string;
    lugar: string;
    idHexagono: string;
    dia: string;
    hora_i: number
}

export const Delito = model<IDelito>('Delito',delitosSchema,'delitos')