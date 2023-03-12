export default class TipoDelitoDto{
    private _id?: string;
    private nombre: string;
    private id_medata: string;

    constructor(data?: any){

        console.log(data);

        if(!data){
            this.nombre = "";
            this.id_medata = "";
        }else{
            this._id = data.id;
            this.nombre = data.nombre;
            this.id_medata = data.id_medata;
        }
    }

    getId(){
        return this._id;
    }

    getNombre(){
        return this.nombre;
    }

    getIdMedata(){
        return this.id_medata;
    }
        
}
