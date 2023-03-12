import { Response, Request } from "express";
import UserRegisterDto from "../dtos/userRegister.dto";
import UserRepo from "../repository/user.repo";



export let register = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        console.log('body', body);

        const userDto = new UserRegisterDto(body);
        console.log('dto:', userDto);

        const userRepo = new UserRepo();
        const newUser = await userRepo.register(userDto)

        res.json({
            ok: true,
            data: newUser,
            message: 'Registered user successfully',
            error: null
        });

    } catch (error:any) {
        res.json({
            ok: false,
            error: error,
            message: 'Error creating user: ' + error.message
        });
    }
}

export let updateById = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const userRepo = new UserRepo();
       const answ = await userRepo.updateById(body.id, body);
        res.json({
            ok: true,
            data: answ,
            message: 'User information updated successfully',
            error: null
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error: error,
            message: 'Error updating user information'
        });
    }
}