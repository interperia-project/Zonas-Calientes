import { Response, Request } from "express";
import UsuariosRegistroDto from "../dtos/usuariosRegistro.dto";
import UsuariosRepo from "../repository/usuarios.repo";



export let crear = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        console.log('body', body);

        const usuarioDto = new UsuariosRegistroDto(body);
        console.log('dto:', usuarioDto);

        const usuarioRepo = new UsuariosRepo();
        const nuevoUsuario = await usuarioRepo.registrar(usuarioDto)

        res.json({
            ok: true,
            data: nuevoUsuario,
            message: 'Usuario creado con éxito',
            error: null
        });

    } catch (error:any) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear nuevo usuario: ' + error.message
        });
    }
}