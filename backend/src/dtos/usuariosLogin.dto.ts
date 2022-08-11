export default class UsuariosRegistroDto{
    private _id?: string;
    private nombreCompleto: string;
    private correoElectronico: string;

    constructor(data?: any){
        if(!data){
            this.nombreCompleto = "";
            this.correoElectronico = "";
        }else{
            this._id = data.id;
            this.nombreCompleto = data.nombreCompleto;
            this.correoElectronico = data.correoElectronico; 
        }
    }

    getId(){
        return this._id;
    }

    getNombreCompleto(){
        return this.nombreCompleto;
    }

    getCorreoElectronico(){
        return this.correoElectronico;
    }
}

    
