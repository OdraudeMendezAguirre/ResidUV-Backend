const { response, request } = require('express')
const Alumno = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const alumnosPost = async (req = request, res = response) => {

    const {
        nombre,
        apellidoP,
        apellidoM,
        matricula,
        password,
        region,
        facultad,
        programaEducativo,
        semestre,
        respuesta,
        preguntaID
    } = req.body

    try {
        const alumno = new Alumno({
            nombre,
            apellidoP,
            apellidoM,
            matricula,
            password,
            region,
            facultad,
            programaEducativo,
            semestre,
            respuesta,
            preguntaID
        })

        //Encriptando contraseña
        const salt = bcryptjs.genSaltSync(10);
        alumno.password = bcryptjs.hashSync(password, salt);
        alumno.respuesta = bcryptjs.hashSync(respuesta, salt)

        //Guardar en la base de datos
        await alumno.save()

        res.status(200).json({
            msg: 'Usuario generado correctamente',
        })

    } catch (error) {
        console.log(error);
        res.json(error) //Aqui se logro controlar el error de las validaciones
    }


}

const alumnosActulizar = async (req = request, res = response) => {

    const { matricula, respuesta, password } = req.body

    try {

        //Aqui se valida que la matricula exista en la base de datos
        const alumno = await Alumno.findOne({ where: { matricula } })
        if (!alumno) {
            return res.status(404).json({
                msg: 'La matricula no esta registrada'
            })
        }

        //Validar si la respuesta es correcta
        const validarRepuesta = bcryptjs.compareSync(respuesta, alumno.respuesta)
        if (!validarRepuesta) {
            return res.status(400).json({
                msg: 'La respuesta no es correcta'
            })
        }

        //Se encipta la nueva contraseña
        const salt = bcryptjs.genSaltSync(10);
        alumno.password = bcryptjs.hashSync(password, salt);

        //Si pasa las validaciones se actuliza la contraseña del usuario
        await alumno.update({
            password: alumno.password  //CAMPO A ACTULIZAR
        }, {
            where: {
                matricula    //DONDE LO DEBE DE ACTULIZAR
            }
        })

        //Se envia la respuesta
        res.status(200).json({
            msg: 'Contraseña actulalizada correctamente'
        })

    } catch (error) {
        console.log(error);
        res.json(error)
    }

}

module.exports = {
    alumnosPost,
    alumnosActulizar
}