'use strict';

//Cargar modulos node para crear el servidor
var express= require("express");
var bodyParser= require ("body-parser");
var cors= require('cors')



//Ejecutar express para http
var app = express();

//Cargar archivos rutas
var article_routes = require('./routes/article');
var user_routes = require('./routes/user');
var userCliente_routes = require('./routes/userCliente');

//Cargar Middlewades
app.use(bodyParser.urlencoded({extended:false})); //Carga y utiliza el bodyParse
app.use(bodyParser.json()); //Convierte cualquier peticion en formato json
app.use(cors())



//Añadir prefijos a las rutas
app.use("/api", article_routes); //permite acceder y cargar las rutas
app.use("/user", user_routes)
app.use("/userCliente", userCliente_routes)

//Exportar el modulo
module.exports = app; //Cargar y usar este objeto desde afuera
