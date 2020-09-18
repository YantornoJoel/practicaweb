const mongoose = require('mongoose')
const { Schema} = mongoose
const bcrypt = require('bcryptjs') //encriptar contraseña

const UserSchema = Schema ({
    name: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
    telefono: {type: String},
    pais: {type: String},
    provincia: {type: String},
    documento: {type: String},
    cp: {type: String}

})



UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

//tomar contraseña y compararla con la base de datos
// //Se usa la funcion normal porque si se usa la flecha no se puede llamar a las propiedades del 
//useSchema
UserSchema.methods.matchPassword =  async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports= mongoose.model('UserCliente', UserSchema)