import UserLoginDto from "../dtos/userLogin.dto";
import UserRegisterDto from "../dtos/userRegister.dto";
import { UserProfile } from "../models/userProfile.model";


class UserRepo{

    async register(UserRegisterDto: UserRegisterDto):Promise<Boolean>{
        try {
            let userModel = new UserProfile({
                userName: UserRegisterDto.getUserName(),
                password: UserRegisterDto.getPassword(),
                email: UserRegisterDto.getEmail(),
                cellphone: UserRegisterDto.getCellphone(),
                roles:  UserRegisterDto.getRoles(),
                attempts: UserRegisterDto.getAttempts(),
                activeRol:  UserRegisterDto.getActiveRol(),
                verificationCode: UserRegisterDto.getVerificationCode(),
                accountEnabled:  UserRegisterDto.getAccountEnabled()
            });
            let usuarioCreado = await UserProfile.create(userModel);
            return true;

        } catch (error:any) {
            console.log(error);
            throw error;
        }
    }

    async updateById(userId: string, user: any): Promise<Boolean> {

        try {
            let userUpdate = await UserProfile.findByIdAndUpdate(userId, { ...user });
            console.log('answer: ', userUpdate);
            return true;

        } catch (error) {
            throw error;
        }
    }


}

export default UserRepo;