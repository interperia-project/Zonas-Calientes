import { Schema, model, Document} from 'mongoose';


const userBasicInformationProfileSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, ref: "UserProfile"
    },
    firstName:{
        type: String,
        //required: [true, 'First name is required']
    },
    lastName:{
        type: String,
        //required: [true, 'Last name is required']
    },
    documentType:{
        type: Schema.Types.ObjectId, ref: "DocumentType",
        //required: [true, 'Document type is required']
    },
    documentId:{
        type: String,
        //required: [true, 'Document id is required']
    },
    birthDate:{
        type: String,
        //required: [true, 'Birth date is required']
    },
    gender:{
        type: Number,
        //required: [true, 'Gender is required']
    }
});

interface IUserBasicInformation extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    documentType: string;
    documentId: string;
    birthDate: string;
    gender: number;
};

export const UserBasicInformation = model<IUserBasicInformation>('UserBasicInformation', userBasicInformationProfileSchema, 'userBasicInformation');