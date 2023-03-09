const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/', {
    dbName: 'hurto',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to the database'));

const MyModel = mongoose.model('model', 
mongoose.Schema(
    { 
        "_id": Number,
        "fecha_hecho": String,
        "cantidad": Number,
        "latitud": Number,
        "longitud": Number,
        "sexo": String,
        "edad": Number,
        "estado_civil": String,
        "grupo_actor": String,
        "actividad_delictiva": String,
        "parentesco": String,
        "ocupacion": String,
        "discapacidad": String,
        "grupo_especial": String,
        "medio_transporte": String,
        "nivel_academico": String,
        "testigo": String,
        "conducta": String,
        "modalidad": String,
        "caracterizacion": String,
        "conducta_especial": String,
        "arma_medio": String,
        "articulo_penal": String,
        "categoria_penal": String,
        "nombre_barrio": String,
        "codigo_barrio": String,
        "codigo_comuna": Number,
        "lugar": String,
        "sede_receptora": String,
        "bien": String,
        "categoria_bien": String,
        "grupo_bien": String,
        "modelo": Number,
        "color": String,
        "permiso": String,
        "unidad_medida": String,
        "fecha_ingestion": String
    },
    {collection: 'hurtoper'}));

// For backend and express
const express = require('express');
const cors = require("cors");

const app = express();
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.send("App is Working");
});

app.get("/points", async (req, resp) => {
    resp.header("Access-Control-Allow-Origin", "*");
    try {
        const result = await MyModel.find({}).limit(50);
        if (result) {
            console.log('Found a listing');
            console.log(result);
            resp.send(result.map(data => ({
                lat: data.latitud,
                lng: data.longitud
            })));
        } else {
            console.log('No listings found');
        }
    } catch (e) {
        resp.send(e);
    }
});
app.listen(5000);