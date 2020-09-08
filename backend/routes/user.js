'use strict';

var express= require('express');
var UserController = require ('../controllers/user');
const verifytoken = require('../controllers/verifytoken') //Para que se requiera el token en alguna navegacion

//var router= express.Router();

const { Router } = require('express');
const router = Router();

var multiparty = require('connect-multiparty');

const passport= require('passport')


//Rutas útiles
router.post("/save", UserController.save);
router.get("/allusers/:last?", UserController.getUsers);
router.get("/user/:id", UserController.getUser)
router.delete("/delete/:id", UserController.delete)
router.post('/signin', UserController.signin);
router.get("/perfil/:token",  verifytoken ,UserController.perfil)




module.exports= router; //exportarlo para usarlo en otra parte
