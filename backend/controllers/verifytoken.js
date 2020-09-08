const jwt = require('jsonwebtoken'); //Token que se usa para permitir accesos a alguna pagina
const config = require('../config');

async function verifytoken(req, res, next) {
    const token = req.headers["token"]; //Lo que se usa en postman para ingresar el token obtenido
   
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No iniciaste sesión' });
    }
    
    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
}


module.exports = verifytoken;