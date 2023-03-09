export default class UserLoginDto{
    private _id?: string;
    private userName: string;
    private password: string;
    private email: string;
    private cellphone: string;
    private roles: [];
    private attempts: number;
    private activeRol: [];
    private verificationCode: number;
    private accountEnabled: boolean;

    constructor(data?: any){
        if(!data){
            this.userName= "";
            this.password= "";
            this.email= "";
            this.cellphone= "";
            this.roles= [];
            this.attempts= 0;
            this.activeRol= [];
            this.verificationCode= 0;
            this.accountEnabled= false;
        }else{
            this._id = data.id;
            this.userName= data.userName;
            this.password= data.password;
            this.email= data.email;
            this.cellphone= data.cellphone
            this.roles= data.roles;
            this.attempts= data.attempts;
            this.activeRol= data.activeRol;
            this.verificationCode= data.verificationCode;
            this.accountEnabled= data.accountEnabled
        }
    }

    getUserId(){
        return this._id;
    }

    getUserName(){
        return this.userName;
    }

    getPassword(){
        return this.password;
    }

    getEmail(){
        return this.email;
    }

    getCellphone(){
        return this.cellphone;
    }

    getRoles(){
        return this.roles;
    }

    getAttempts(){
        return this.attempts;
    }

    getActiveRol(){
        return this.activeRol;
    }

    getVerificationCode(){
        return this.verificationCode;
    }

    getAccountEnabled(){
        return this.accountEnabled;
    }
}

    
