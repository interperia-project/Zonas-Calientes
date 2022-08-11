import { Schema, model, Document} from 'mongoose';

const usuariosSchema = new Schema({
    nombreCompleto:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correoElectronico:{
        type: String,
        unique: true,
        required: [true, 'El correoElectronico es requerido']
    },
    clave:{
        type: String
    }
});


interface IUsuarios extends Document {
    nombreCompleto: string;
    correoElectronico: string;
    clave: string;
};

export const Usuarios = model<IUsuarios>('Usuarios', usuariosSchema, 'usuarios');