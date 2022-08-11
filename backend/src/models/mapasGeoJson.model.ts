import { Schema, model, Document} from 'mongoose';

const mapasGeoJsonSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    features: [{
        type: {
            type: String,
            required: true
        },
        geometry: {
            type:{
                type: String,
                required: true
            },
            coordinates: {
                type: [[[Number]]],
                required: true
            }
        },
        properties: {
            name:{
                type: String,
                required: true
            }
        }
    }]
})

interface IMapasGeoJson extends Document {
    type: String;
    features:[];
}

export const MapasGeoJson = model<IMapasGeoJson>('mapasGeoJson',mapasGeoJsonSchema,'mapasGeoJson')