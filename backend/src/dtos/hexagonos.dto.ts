export default class HexagonosDto{
    private _id?: string;
    private id: string;
    private type: {};
    private properties: {};
    private geometry: {};

    constructor(data?: any){
        console.log (data);

        if(!data){
            this.id = "";
            this.type = {};
            this.properties = {};
            this.geometry = {};
        }else{
            this._id = data._id;
            this.id = data.id;
            this.type = data.type;
            this.properties = data.properties;
            this.geometry = data.geometry;
        }
    }

    getId(){
        return this._id
    }
    
    getIdH(){
        return this.id;
    }

    getType() {
        return this.type;
    }

    getProperties() {
        return this.properties;
    }

    getGeometry() {
        return this.geometry;
    }
}