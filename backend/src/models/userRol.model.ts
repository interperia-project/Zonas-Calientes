import { Schema, model, Document} from 'mongoose';

const userRolesSchema = new Schema({
    userRol:{
        type: 'string',
    },
    description:{
        type: 'string'
    }
});

interface IUserRoles extends Document {
    userRol: string;
    description: string;
};

export const UserRol = model<IUserRoles>('UserRol',userRolesSchema, 'userRol');