const Alumno = require('../models/usuario')

 //Aqui podriamos validar si la matricula esta correcta con una expresion regular
const existeMatricula = async (matricula = '') => {
   
    //Validar si la matricula ya existe
    const existeMatricula = await Alumno.findOne({ where: { matricula } })

    if (existeMatricula) {
        throw new Error(`La matricula: ${matricula} ya esta registrada`)
        // return res.status(400).json('La matricula ya esta registrada')s
    }

}

 //Se valida que la contraseña ingresada sea segura
const validarPassword = async (password = '') => {

    const validarPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ //La contraseña debe de tener al menos una letra mayuscula, un numero y mnimo una longitud de 8 caracteres.
    if (!password.match(validarPassword)) {
        throw new Error(`La contraseña no es valida, debe de tener al menos una letra mayuscula, un numero y minimo una longitud de 8 caracteres.`)
        // return res.status(400).json({
        //     msg: 'La contraseña ingresada no es valida. La contraseña debe de tener al menos una letra mayuscula, un numero y mnimo una longitud de 8 caracteres.'
        // })
    }
}


module.exports = {
    existeMatricula,
    validarPassword
}