const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const Alumno = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('authorization');

    if (!token) { 

        return res.status(401).json({
            error: 'No tienes permisos para eliminar - no mando token en las cabeceras'
        })
    }

    try {

        const { matricula } = jwt.verify(token, process.env.FIRMAJWT)
        
        const alumno = await Alumno.findOne({ where: { matricula }})

        if(!alumno){
            return res.status(401).json({
                error: 'No tienes permisos - usuario NO existe'
            })
        }


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