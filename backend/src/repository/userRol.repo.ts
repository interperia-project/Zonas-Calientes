import UserRolDto from "../dtos/userRol.dto";
import { UserRol } from "../models/userRol.model";



class UserRolRepo {
    static find: any;
    
    async read(): Promise<UserRolDto[]>{
        return new Promise(async (resolve, reject) => {
            try {
                let userRolArray: UserRolDto[] = [];

                let documentData = await UserRol.find();

                documentData.forEach((doc: any) => {
                    userRolArray.push(new UserRolDto(doc));
                });

                resolve(userRolArray);

            } catch (error) {
                return reject(error);
            }
        })
    }
   
}

export default UserRolRepo;