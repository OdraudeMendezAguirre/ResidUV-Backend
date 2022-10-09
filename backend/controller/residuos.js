const { response, request } = require('express')
const Residuo = require('../models/residuos')

const residuosPost = async (req = request, res = response) => {

    //Se obtiene el usuario autenticado
    const id_alumno = req.alumno.id_alumno
    
    const {
        tipoResiduo,
        tamanoResiduo,
        cantidad,
    } = req.body
    // console.log(req.body, alumno);

    try {

        const residuo = new Residuo({
            id_alumno,
            tipoResiduo,
            tamanoResiduo,
            cantidad,
        })

        await residuo.save()

        res.status(200).json({
            msg: 'Datos guardados correctamente ',
        })

    } catch (error) {
        console.log(error);
        res.json(error) //Aqui se logro controlar el error de las validaciones
    }

}

module.exports = {
    residuosPost
} 