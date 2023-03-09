
export default class DelitosDto{
    private _id?: string;
    private idTipoDelito: string;
    private idHexagono: string;
    private numero: number;
    private longitud: number;
    private latitud: number;
    private sexo: string;
    private edad: number;
    private medio_transporte: string;
    private modalidad: string;
    private arma_medio: string;
    private nombre_barrio: string;
    private codigo_barrio: string;
    private comuna: string;
    private lugar: string;
    private fecha: number;
    private dia: string;
    private hora_i: number;

    constructor(data?: any) {
        if(!data){
            this.idTipoDelito = "";
            this.idHexagono = "";
            this.numero = 0;
            this.fecha = 0;
            this.longitud = 0;
            this.latitud = 0;
            this.sexo = "";
            this.edad = 0;
            this.medio_transporte = "";
            this.modalidad = "";
            this.arma_medio = "";
            this.nombre_barrio = "";
            this.codigo_barrio = "";
            this.comuna = "";
            this.lugar = "";
            this.dia = "";
            this.hora_i = 0;
        }else{
            this._id = data.id;
            this.idTipoDelito = data.idTipoDelito;
            this.idHexagono = data.idHexagono;
            this.numero = data.numero;
            this.fecha = data.fecha;
            this.longitud = data.longitud
            this.latitud = data.latitud;
            this.sexo = data.sexo;
            this.edad = data.edad;
            this.medio_transporte = data.medio_transporte;
            this.modalidad = data.modalidad;
            this.arma_medio = data.arma_medio;
            this.nombre_barrio = data.nombre_barrio;
            this.codigo_barrio = data.codigo_barrio;
            this.comuna = data.comuna;
            this.lugar = data.lugar;
            this.dia = data.dia;
            this.hora_i = data.hora_i;
        }
    }

    getId(){
        return this._id;
    }

    getIdTipoDelito(){
        return this.idTipoDelito;
    }

    getIdHexagono(){
        return this.idHexagono;
    }

    getNumero(){
        return this.numero;
    }

    getFecha(){
        return this.fecha;
    }

    getLongitud(){
        return this.longitud;
    }

    getLatitud(){
        return this.latitud;
    }

    getSexo(){
        return this.sexo;
    }

    getEdad(){
        return this.edad;
    }

    getMedioTransporte(){
        return this.medio_transporte;
    }
    
    getModalidad(){
        return this.modalidad;
    }

    getArmaMedio(){
        return this.arma_medio;
    }

    getNombreBarrio(){
        return this.nombre_barrio;
    }

    getCodigoBarrio(){
        return this.codigo_barrio;
    }

    getComuna(){
        return this.comuna;
    }

    getLugar(){
        return this.lugar;
    }

    getDia(){
        return this.dia;
    }

    getHoraI(){
        return this.hora_i;
    }

}

