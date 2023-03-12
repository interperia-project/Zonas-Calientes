import MapasGeoJsonDto from "../dtos/mapasGeoJson.dto";
import { MapasGeoJson } from "../models/mapasGeoJson.model";



class MapasGeoJsonRepo {

    async crear (mapasGeoJsonDto: MapasGeoJsonDto): Promise<Boolean> {
        try {
            let mapasGeoJsonModel = new MapasGeoJson({
                type: mapasGeoJsonDto.getType(),
                features: mapasGeoJsonDto.getFeatures()
            });

            let mapasGeoJson = await MapasGeoJson.create(mapasGeoJsonModel);
            return true;
            
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async obtener(): Promise<MapasGeoJsonDto[]> {
        return new Promise (async (resolve, reject) => {
            try {
                let mapasGeoJsonArray: MapasGeoJsonDto[] =[];
                let mapasGeoJsonData = await MapasGeoJson.find();

                mapasGeoJsonData.forEach(mapa => {
                    mapasGeoJsonArray.push(new MapasGeoJsonDto(mapa));
                });

                resolve(mapasGeoJsonArray);

            } catch (error) {
                return reject(error);
            }
        })
    }

}

export default MapasGeoJsonRepo;