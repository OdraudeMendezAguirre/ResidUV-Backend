const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const Alumno = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('authorization');

    //Se verifica que el usuario haya mandado el token
    if (!token) {
 
        return res.status(401).json({
            error: 'No hay token'
        })
    }

    try { 

        //Se verifica que el token sea valido y se estrae el id del usuario
        const { uid } = jwt.verify(token, process.env.FIRMAJWT)
        const alumno = await Alumno.findOne({ where: { id_alumno: uid } })

        //Se verifica que el alumno exista
        if(!alumno){
            return res.status(401).json({
                error: 'No tienes permisos - Alumno NO existe'
            })
        }
       
        //Se manda el alumno en la request
        req.alumno = alumno 

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}