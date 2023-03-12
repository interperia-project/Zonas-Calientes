import * as nodemailer from 'nodemailer';
import OpcionesCorreo from '../classes/opciones-correo';



export default class EmailSender {

    private transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 25,                       //Puerto 465 -> secure:true, puede usarse 25, 465 o 587 en aplicaciones  SMTP de Gmail
        secure: true,                    //Usando TLS
        service: 'gmail',
        auth: {
            //user: 'proyecto.interperia@udea.edu.co',
            user: 'cristina.lopezr@udea.edu.co',
            pass: 'ygvyslkksqpvuieb'      //Pass para aplicaciones correo udea cris
        },
        tls: {
            rejectUnauthorized: false      //Conexión al servidor con TLS autofirmado o no válido
        }
    });

    private textoCorreo(){
        let textoCorreo =`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>
                <style>
                    .h1{
        
                    }
                </style>
            </title>
        </head>
        <body>
            <h1>Correo de prueba</h1>
        </body>
        </html>
        `;
        return textoCorreo;
    }

    private enviarCorreo(correo: any) {
        this.transporter.sendMail(correo, function (error, info) {
            if (error) {
                console.log('Correo no enviado', error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            };
        });
    }

}