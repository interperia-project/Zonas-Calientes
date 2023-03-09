
export default class DocumentTypeDto {
    private _id?: string;
    private documentType: string;
    private description: string;

    constructor (data?: any) {
        if(!data){
            this.documentType = "";
            this.description = "";
        }else{
            this._id = data.id;
            this.documentType = data.documentType;
            this.description = data.description;
        }
    }

    getId(){
        return this._id;
    }

    getNombre(){
        return this.documentType;
    }

    getDescripcion(){
        return this.description;
    }
}


