import { Schema, model, Document} from 'mongoose';

const documentTypeSchema = new Schema({
    documentType:{
        type: String,
    },
    description:{
        type: String,
    },
});

interface IDocumentType extends Document{
    documentType: string;
    description: string;
}

export const DocumentType = model<IDocumentType>('DocumentType', documentTypeSchema, 'documentType');