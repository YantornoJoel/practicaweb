'use strict'

var mongoose = require('mongoose');           //para conectar con mongodb
var Schema   = mongoose.Schema;               //para usar objetos de este tipo

var ArticleSchema= Schema ({
                    title: String,
                    content: String,
                    date: {type: Date, default: Date.now},
                    image: String,
                    precio: String,
                    marca: String
                    
},   {timestamps: true}
);

module.exports = mongoose.model('article', ArticleSchema); 
//se exporta para que pueda ser llamado en otros archivos
