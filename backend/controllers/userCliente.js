'use strict'

var validator = require('validator');

var fs = require('fs');
var path = require('path');
var UserCliente = require('../models/UserCliente');

const verifytokenCliente = require('./verifytokenCliente')

const jwt = require('jsonwebtoken');
const config = require('../configCliente');



var controller = {
    save: async (req, res) => {
        //Tomar los parametros por post
        var params = req.body;
        //Validar datos(validator, para controlar excepciones, errores)
        try {
            var validate_name               = !validator.isEmpty(params.name);
            var validate_apellido           = !validator.isEmpty(params.apellido);
            var validate_email              = !validator.isEmpty(params.email);
            var validate_password           = !validator.isEmpty(params.password)
            var validate_confirmpassword    = !validator.isEmpty(params.confirmpassword)
            var validate_telefono           = !validator.isEmpty(params.telefono)
            var validate_pais               = !validator.isEmpty(params.pais)
            var validate_provincia          = !validator.isEmpty(params.provincia)
            var validate_documento          = !validator.isEmpty(params.documento)
            var validate_cp                 = !validator.isEmpty(params.cp)
        } catch (err) {
            return res.status(200).send({
                status: "error",
                message: "Faltan datos por enviar2",
            });
        }



        if (validate_name && validate_apellido && validate_email && validate_password && validate_confirmpassword && validate_telefono && validate_pais && validate_provincia && validate_documento && validate_cp) {
            //Crear el objeto a guardar
            var user = new UserCliente();

            //Asignar valores al objeto
            user.name       =    params.name;
            user.apellido   =    params.apellido;
            user.email      =    params.email;
            user.password   =    params.password;
            user.telefono   =    params.telefono;
            user.pais       =    params.pais;
            user.provincia  =    params.provincia;
            user.documento  =    params.documento;
            user.cp         =    params.cp;

            user.password = await user.encryptPassword(user.password) //Para encriptar la contraseña


            //Guardar en la base de datos
            user.save((err, userStored) => {
                if (err || !userStored) {
                    return res.status(404).send({
                        status: "error",
                        message: "El usuario no se guardo",
                    });
                }


                //Devolver respuesta
                return res.status(200).send({
                    status: "success",
                    article: userStored,
                });



            });



        } else {
            return res.status(200).send({
                status: "error",
                message: "Los datos no son válidos",
            });
        }

    },

    getUsers: (req, res) => {
        const query = UserCliente.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(2);
        }

        //Find
        query.sort("-_id").exec((err, users) => {
            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al devolver los usuarios",
                });
            }
            if (!users) {
                return res.status(404).send({
                    status: "Erorr",
                    message: "No hay usuarios para mostrar",
                });
            }
            return res.status(200).send({
                status: "success",
                users,
            });
        });
    },

    getUser: (req, res) => {
        //Tomar el ID de la url
        var userId = req.params.id;
        //Comprobar que exista
        if (!userId || userId == null) {
            return res.status(404).send({
                status: "Error",
                message: "El usuario no existe",
            });
        }
        //Buscar el artículo
        UserCliente.findById(userId, (err, user) => {
            if (err || !user) {
                return res.status(404).send({
                    status: "Error",
                    message: "El usuario no existe!!!!",
                });
            }
            //Enviar respuesta JSON y devolverlo
            return res.status(200).send({
                status: "success",
                user,
            });
        });

    },

    delete: (req, res) => {
        //Tomar el Id de la url
        var userId = req.params.id;
        //Find and delete
        UserCliente.findOneAndDelete({ _id: userId }, (err, userRemoved) => {
            if (err) {
                return res.status(200).send({
                    status: "Error",
                    message: "Error al borrar",
                });
            }
            if (!userRemoved) {
                return res.status(404).send({
                    status: "Error",
                    message: "El usuario no se ha borrado",
                });
            }
            //Devolver respuesta
            return res.status(200).send({
                status: "success",
                user: userRemoved,
            });
        });
    },

    signin: async (req, res) => { //Para loguarse
        const { email, password } = req.body; //Extrae del body el contenido de email y password



        const user = await UserCliente.findOne({ email: email }) //Iguala usuario al email 
        if (!user) { //Si no existe el usuario(email), manda msj
            return res.status(401).send("El email no esta registrado")
        }
        const validPassword = await user.matchPassword(password); //Compara la contraseña del usuario con la ingresada en ese momento por el login
        if (!validPassword) {
            // return  res.status(401).send({ auth: false, token: null });
            return res.status(401).send("Contraseña incorrecta")

        }
        var token = jwt.sign({ id: user.id }, config.secret, {
        });
        res.status(200).json({ auth: true, token  })
        console.log("El token es: ", token)
        
        
    },


    perfil: async (req, res) => {
        const eltoken= req.headers.token
        console.log("Perfil", eltoken)
        //Perfil en el que muestra los datos del usuario loguado, excepto la contraseña
        const user = await UserCliente.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).json(user);
    }


};






module.exports = controller;