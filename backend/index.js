'use strict' //permite usar mejores practicas de desarrollo, con mejoras, formato mas actual

var mongoose = require("mongoose");
var app= require("./app");
var port= 3900;

mongoose.set("useFindAndModify", false);
mongoose.promise= global.promise;


mongoose.connect("mongodb://localhost:27017/api_rest_blog",{
                useNewUrlParser: true,
                useUnifiedTopology:true,
                })
                .then(() => {
                    console.log('La conexion a la base de datos se hizo correctamente');
                    //Crear servidor y escuchar las peticiones http
                    app.listen(port,() => {
                        console.log("Servidor corriendo en http://localhost:" + port);
                    })

                } )



