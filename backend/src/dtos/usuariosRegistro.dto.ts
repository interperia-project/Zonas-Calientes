export default class UsuariosRegistroDto {
    private _id?: string;
    private nombreCompleto: string;
    private correoElectronico: string;
    private clave: string;

    constructor(data?: any){
        if(!data){
            this.nombreCompleto = "";
            this.correoElectronico = "";
            this.clave = "";
        }else{
            this._id = data._id;
            this.nombreCompleto = data.nombreCompleto;
            this.correoElectronico = data.correoElectronico;
            this.clave = data.clave;
        }
    }

    getId(): string | undefined{
        return this._id;
    }

    getNombreCompleto(){
        return this.nombreCompleto;
    }

    getCorreoElectronico(){
        return this.correoElectronico;
    }

    getClave(){
        return this.clave;
    }

}