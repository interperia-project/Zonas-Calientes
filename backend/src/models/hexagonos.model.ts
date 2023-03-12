import { Schema, model, Document} from 'mongoose';

const hexagonosSchema = new Schema({
    id:{
        type: Number
    },
    type:{
        type: String
    },
    properties:{
        address: {
            type: Array
        },
        center:{
            type: Array
        }
    },
    geometry:{
        type:{
            type: String
        },
        coordinates:[{
            type: Array
        }]
    }
});

interface IHexagonos extends Document{
    id:number;
    type: string;
    properties: {};
    geometry: {}
}

export const Hexagonos = model<IHexagonos>('Hexagonos', hexagonosSchema,'hexaGeoJson');