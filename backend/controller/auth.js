const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Alumno = require('../models/usuario')
const { generarJsonWebToken } = require('../helpers/generar-JWT')



const login = async (req = request, res = response) => {

    const { matricula, password } = req.body

    try {

        //Aqui se valida que la matricula exista en la base de datos
        const alumno = await Alumno.findOne({ where: { matricula } })
        if (!alumno) {
            return res.status(400).json({
                msg: 'El usuario y/o contraseñas no son correctos (Matricula)'
            })
        }

        //Aqui se valida si la contraseña es correcta
        const validarPassword = bcryptjs.compareSync(password, alumno.password) //validarPassword solo devuelve un true o false
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'El usuario y/o contraseñas no son correctos (Contraseña)'
            })
        }

        //Generar json web token
        const token = await generarJsonWebToken(alumno.id)

        res.json({
            msg: `Usuario ${alumno.nombre} autenticado correctamente`,
            token    //Se manda el token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

} 


module.exports = {
    login
} 