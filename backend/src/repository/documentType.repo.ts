import DocumentTypeDto from "../dtos/documentType.dto";
import { DocumentType } from "../models/documentType.model";



class DocumentTypeRepo {
    static find: any;
    
    async read(): Promise<DocumentTypeDto[]>{
        return new Promise(async (resolve, reject) => {
            try {
                let documentTypeArray: DocumentTypeDto[] = [];

                let documentData = await DocumentType.find();

                documentData.forEach((doc: any) => {
                    documentTypeArray.push(new DocumentTypeDto(doc));
                });

                resolve(documentTypeArray);

            } catch (error) {
                return reject(error);
            }
        })
    }
   
}

export default DocumentTypeRepo;