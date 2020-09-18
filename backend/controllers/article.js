'use strict'

var validator= require('validator');

var fs= require('fs');
var path= require('path');

var Article= require('../models/article');
const { exists } = require('../models/article');

var controller = {
    
      
///////////////////////////////////////////////////////////////
    save: (req, res) => {
    //Tomar los parametros por post
    var params= req.body;
    //Validar datos(validator, para controlar excepciones, errores)
    try{
        var validate_title= !validator.isEmpty(params.title);
        var validate_content= !validator.isEmpty(params.content);
        var validate_date= !validator.isEmpty(params.date)
        var validate_precio = !validator.isEmpty(params.precio)
        var validate_marca = !validator.isEmpty(params.marca)
    }catch(err){
                return res.status(200).send({
                status: "error",
                message: "Faltan datos por enviar",
                                            });
                }

    if(validate_title && validate_content && validate_date && validate_marca && validate_precio){
    //Crear el objeto a guardar
        var article= new Article();

        //Asignar valores al objeto
        article.title= params.title;
        article.content= params.content;
        article.date= params.date;
        article.marca = params.marca;
        article.precio = params.precio;
        article.image= null;

        //Guardar en la base de datos
        article.save((err, articleStored) => {
                if(err || !articleStored){
                        return res.status(404).send({
                        status: "error",
                        message: "El articulo no se guardo",
                                                    });    
                                        }
                        //Devolver respuesta
                        return res.status(200).send({
                            status: "success",
                            article: articleStored,
                        }); 
                                                });
                    }else {
                        return res.status(200).send({
                        status: "error",
                        message: "Los datos no son válidos",
                                                    });
                    }
                },
//////////////////////////////////////////////////////////////////
//Trae todos los artículos guardados en la base de datos mongo
getArticles: (req, res) => {
    const query = Article.find({});
    
    var last  = req.params.last;

    if(last || last != undefined){
        query.limit(2);
    }

    //Find
    query.sort("-_id").exec((err, articles) =>{
        if(err){
            return res.status(500).send({
                status: "Error",
                message: "Error al devolver los artículos",
            });
                }
        if (!articles){
            return res.status(404).send({
                status: "Erorr",
                message: "No hay artículos para mostrar!!",
            });
        }        
    return res.status(200).send ({
        status: "success",
        articles,
    });
    });
},
///////////////////////////////////////////////
getArticle: (req, res) => {
    //Tomar el ID de la url
    var articleId = req.params.id;
    //Comprobar que exista
    if(!articleId || articleId == null){
        return res.status(404).send ({
            status: "Error",
            message: "El artículo no existe",
                                    });
                                        }
//Buscar el artículo
Article.findById(articleId, (err, article) =>{
    if(err || !article){
        return res.status(404).send ({
            status: "Error",
            message: "El artículo no existe!!!!",
        });
    }
    //Enviar respuesta JSON y devolverlo
    return res.status(200).send ({
        status: "success",
        article,
    });
});

},
////////////////////////////////////////////////////////
//Actualizar datos de un articulo en concreto
update: (req, res) => {
    //Tomar el ID articulo de la url
    var articleId= req.params.id;
    //Tomamos los datos que llegan por put
    var params= req.body;
    //Validar los datos
    try{
        var validate_title= !validator.isEmpty(params.title);
        var validate_content= !validator.isEmpty(params.content);
        var validate_marca = !validator.isEmpty(params.marca)
        var validate_precio = !validator.isEmpty(params.precio)
    } catch (err) {
        return res.status(200).send({
            status: "Error",
            message: "Faltan datos por enviar",
        });
    }
    if(validate_title && validate_content && validate_precio & validate_marca){
        //Find and update
        Article.findByIdAndUpdate(
            {_id: articleId}, params,
            {new: true},
            (err, articleUpdate) =>{
                if(err){
                    return res.status(500).send({
                        status: "Error",
                        message: "Error al actualizar",
                    });
                }
            if(!articleUpdate){
                return res.status(404).send({
                    status: "Error",
                    message: "No existe el artículo",
                });
            }    
            return res.status(200).send ({
                status: "success",
                article: articleUpdate,
            });

            });
    } else {
        return res.status(200).send({
            status:"error",
            message: "La validación no es correcta",
        });
    }
},
/////////////////////////////////////////////
//Ruta delete
delete: (req, res) =>{
    //Tomar el Id de la url
    var articleId= req.params.id;
    //Find and delete
    Article.findOneAndDelete({_id: articleId}, (err, articleRemoved)=>{
        if(err){
            return res.status(200).send ({
                status: "Error",
                message: "Error al borrar",
            });
                }
        if(!articleRemoved){
            return res.status(404).send({
                status: "Error",
                message: "El artículo no se ha borrado, por ahí no existe!!",
            });
        }
        //Devolver respuesta
        return res.status(200).send({
            status: "success", 
            article: articleRemoved,
        });
    });
},
////////////////////////////////////////////////////////////////////////////////////////////////////////

//RUTA UPLOAD
upload: (req, res) => {
    //Tomar el archivo de la petición que nos envian
    var file_name = "Imagen no subida...";
    if(!req.files){
        return res.status(404).send({
            status: "Error",
            message: file_name,
        });
    }
    //Conseguir el nombre y la extensión del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");
    //Nombre del archivo
    var file_name  = file_split[2];
    //Extension del archivo
    var extension_split = file_name.split('.');
    var file_ext = extension_split[1];
    //Comprobar la extensión, que solo sea imagen, si no la borra
    if(
        file_ext != 'png' &&
        file_ext != 'jpg' && 
        file_ext != 'gif' && 
        file_ext != 'jpeg'&& 
        file_ext != 'svg' &&
        file_ext != 'jfif'
        ){
            //Borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: "Error",
                    message: "La extensión de la imagen no es valida",
                });
            });
        } else {
            //Si todo esta bien y sacamos el id de la url
            var articleId = req.params.id;
            //Buscar el articulo, asignamos el nombre de la imagen y lo actualizamos
            Article.findOneAndUpdate(
                        {_id: articleId},
                        {image: file_name},
                        {new: true},
                        (err, articleUpdate) =>{
                            if(err || !articleUpdate){
                                return res.status(200).send({
                                    status: "Error",
                                    message: "Error al guardar la imagen",
                                });
                            }
                            return res.status(200).send({
                                status: "success",
                                article: articleUpdate,
                            });
                        }


            )
        }
},
/////////////////////////////////////////////////////////////////////////////

//Metodo para sacar una imagen
getImage: (req, res) => {
    //Tomar los parametros de la imagen
    var file= req.params.image;
    //Sacar el path completo
    var path_file= "./upload/articles/" + file;
    //Comprobar si existe o no
    fs.exists(path_file, (exists) => {
        if(exists){
            return res.sendFile(path.resolve(path_file));
        }else {
            return res.status(200).send({
                status: "error",
                message: "La imagen no existe!",
            });
        }
    });
},
//////////////////////////////////////////////////////////////////////

//Metodo para buscar artículos en nuestro blog
search:(req, res) =>{
    //Sacar el string a buscar
    var searchString = req.params.search;
    //Find or
    Article.find({
        $or: [
            {title: {$regex: searchString, $options: "i"}},
            {content: {$regex: searchString, $options: "i"}},
        ],
    })
    .sort([["date", "descending"]])
    .exec((err, articles) =>{
        if(err){
            return res.status(500).send({
                status: "error",
                message: "Error en la patición de búsqueda",
            });
        }
        if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: "error",
                    message: "No hay artículos para mostrar",
                });
        }
        return res.status(200).send({
            status: "success",
            articles,
        });
    });
},


}; //Fin del controlador

module.exports= controller;
