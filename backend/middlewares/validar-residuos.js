const { response, request } = require("express")


const prueba =(req = request, res = response, next)=>{

    next();
}

const tieneTipo = ( ...resto ) => {

    return (req = request, res = response, next) => {

        const tipo  =  req.body.tipoResiduo
    
        if (!tipo) {
            return res.status(400).json({
                msg: 'No se recibio el tipo de residuo'
            })
        }

        if (!resto.includes( tipo )) {
            return res.status(400).json({
                msg: `El servicio solo recibe uno de estos valores ${resto}.`
            })
        }

        next();
    }
}

module.exports = {
    tieneTipo,
    prueba
}