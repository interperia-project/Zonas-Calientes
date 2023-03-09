import { Response, Request} from "express";
import DocumentTypeRepo from "../repository/documentType.repo";


export let read = async (req: Request, res: Response) => {
    try {
        const documentTypeRepo = new DocumentTypeRepo();

        const document = await documentTypeRepo.read();

        return res.json({
            ok:true,
            data: document,
            message: '',
            error: null
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            error: error,
            message: 'Error reading document types'
        });
    }
}