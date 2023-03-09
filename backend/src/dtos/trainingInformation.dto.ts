export default class TrainingInformationDto{
    private _id?: string;
    private cluster_id: string;
    private fields: [];

    constructor(data?: any){
        if(!data){
            this.cluster_id="";
            this.fields = [];
        }else{
            this._id = data.id;
            this.cluster_id=data.cluster_id;
            this.fields = data.fields;
        }
    }

    getId(){
        return this._id;
    }

    getCluster_id(){
        return this.cluster_id;
    }

    getFields(){
        return this.fields;
    }

}