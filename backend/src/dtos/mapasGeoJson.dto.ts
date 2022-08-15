export default class MapasGeoJsonDto{
    private type: string;
    private features: [];

    constructor(data?: any){
        console.log(data);

        if(!data){
            this.type = "";
            this.features = [];
        }else{
            this.type = data.type;
            this.features = data.features;
        }
    }

    getType(){
        return this.type;
    }

    getFeatures(){
        return this.features;
    }
}