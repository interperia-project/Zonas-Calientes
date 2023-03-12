
export default class UserRolDto {
    private _id?: string;
    private userRol: string;
    private description: string;

    constructor (data?: any) {
        if(!data){
            this.userRol = "";
            this.description = "";
        }else{
            this._id = data.id;
            this.userRol = data.userRol;
            this.description = data.description;
        }
    }

    getId(){
        return this._id;
    }

    getNombre(){
        return this.userRol;
    }

    getDescription(){
        return this.description;
    }
}


