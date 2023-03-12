import { Schema, model, Document} from 'mongoose';

const userProfileSchema = new Schema({
    username:{
        type: String,
        required: [true, 'The name is required']
    },
    password:{
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'The email is required']
    },
    cellphone:{
        type: String
    },
    roles:{
        type:[]
    },
    attempts:{
        type:Number
    },
    activeRol:{
        type:[]
    },
    verificationCode:{
        type: Number
    },
    accountEnabled:{
        type: Boolean
    }
});


interface IUser extends Document {
    userName: string;
    password: string;
    email: string;
    cellphone: string;
    roles: [];
    attempts: number;
    activeRol: [];
    verificationCode: number;
    accountEnabled: boolean;
};

export const UserProfile = model<IUser>('UserProfile', userProfileSchema, 'userProfile');