import { Response, Request} from "express";
import UserRolRepo from "../repository/userRol.repo";


export let read = async (req: Request, res: Response) => {
    try {
        const userRolRepo = new UserRolRepo();

        const document = await userRolRepo.read();

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
            message: 'Error reading user roles'
        });
    }
}