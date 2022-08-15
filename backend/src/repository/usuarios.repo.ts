import UsuariosLoginDto from "../dtos/usuariosLogin.dto";
import UsuariosRegistroDto from "../dtos/usuariosRegistro.dto";
import { Usuarios } from "../models/usuarios.model";


class UsuariosRepo{
    async registrar(UsuariosRegistroDto: UsuariosRegistroDto):Promise<Boolean>{
        try {
            let usuariosModel = new Usuarios({
                nombreCompleto: UsuariosRegistroDto.getNombreCompleto(), 
                correoElectronico: UsuariosRegistroDto.getCorreoElectronico(),
                clave: UsuariosRegistroDto.getClave()
            });

            let usuarioCreado = await Usuarios.create(usuariosModel);
            return true;

        } catch (error:any) {
            console.log(error);
            throw error;
        }
    }


}

export default UsuariosRepo;