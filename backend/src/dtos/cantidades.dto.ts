
export default class CantidadesDto{
    private _id?: string;
    //private idTipoDelito: string;
    private idHexagono: string;
    private dia: string;
    private totalDia: number;
    private cantidad: [];

    constructor(data?: any){
        if(!data){
            //this.idTipoDelito = "";
            this.idHexagono = "";
            this.dia = "";
            this.totalDia = 0;
            this.cantidad = [];
        }
        else{
            this._id = data.id;
            //this.idTipoDelito = data.idTipoDelito;
            this.idHexagono = data.idHexagono;
            this.dia = data.dia;
            this.totalDia = data.totalDia;
            this.cantidad = data.cantidad;
        }
    }

    getId(){
        return this._id;
    }

    /*getIdTipoDelito(){
        return this.idTipoDelito;
    }*/

    getIdHexagono(){
        return this.idHexagono;
    }

    getDia(){
        return this.dia;
    }

    getTotalDia(){
        return this.totalDia;
    }

    getCantidad(){
        return this.cantidad;
    }

}