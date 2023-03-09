import Server from "./classes/server";
import express from 'express';
import fileUpload from 'express-fileupload';
import colors from "colors";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';


import delitosRoutes from "./routes/delitos";
import mapasGeoJsonRoutes from "./routes/mapasGeoJson";
import uRoutes from "./routes/usuarios";
import tipoDelitoRoutes from "./routes/tipo_delito";
import hexagonosRoutes from "./routes/hexagonos";
import cantidadesRoutes from "./routes/cantidades";
import trainingInformationRoutes from "./routes/trainingInformation";

import userRoutes from "./routes/usuarios";
import userRolRoutes from "./routes/userRol";
import documentTypeRoutes from "./routes/documentType";


dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const port: number = parseInt(process.env.PORT);

const server = new Server(port);
colors.enable();

//Body parser
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());
server.app.use(fileUpload());

server.app.use(cors({
    origin: '*'
}));

//Rutas de la app
server.app.use('/delitos', delitosRoutes);
server.app.use('/mapasGeoJson', mapasGeoJsonRoutes);
server.app.use('/usuarios', uRoutes);
server.app.use('/tipoDelito', tipoDelitoRoutes);
server.app.use('/hexagonos', hexagonosRoutes);
server.app.use('/cantidades', cantidadesRoutes);
server.app.use('/trainingInformation', trainingInformationRoutes);


server.app.use('/user',userRoutes);
server.app.use('/userRol',userRolRoutes);
server.app.use('/documentType',documentTypeRoutes);




//Conexión  de Base de datos
let URI = process.env.MONGODB_URL as string;

mongoose.connect(URI,  (err) => {
    if (err) {
        console.log("\n****************************".bgRed);
        console.log("Mongo no se pudo conectar".red);
        console.log("****************************\n".bgRed);
        console.log(err);
        throw err;
    }
    console.log("\n*****************************".bgGreen);
    console.log("Mongo conectado correctamente".italic.green);
    console.log("*****************************\n".bgGreen);
});

//Levantar express
server.start(() => {
    console.log(`\n \nServidor corriendo el puerto ${server.port} \n`.italic.blue);
});

function usuariosRoutes(arg0: string, usuariosRoutes: any) {
    throw new Error("Function not implemented.");
}



