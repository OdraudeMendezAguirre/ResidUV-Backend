const { Router } = require('express');
const { check } = require('express-validator');
const { alumnosPost, alumnosActulizar } = require('../controller/users');
const { existeMatricula, validarPassword} = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligario').notEmpty(),
    check('password', 'La contraseña es obligaria').notEmpty(),
    check('password').custom(validarPassword),
    check('matricula', 'La matricula es obligaria').notEmpty(),
    check('matricula').custom(existeMatricula),
    check('matricula', 'La matricula tiene que ser de 9 digitos').isLength({ min: 9, max: 9 }),
    check('region', 'La region es obligaria').notEmpty(),
    check('respuesta', 'La respuesta es obligaria').notEmpty(),
    check('semestre', 'El semestre es obligario').notEmpty(),
    check('programaEducativo', 'La carrera es obligaria').notEmpty(),
    check('apellidoP', 'El apellido paterno es obligario').notEmpty(),
    check('apellidoM', 'El apellido materno es obligario').notEmpty(),
    check('facultad', 'La facultad es obligaria').notEmpty(),
    validarCampos,
], alumnosPost)

router.put('/', [
    check('matricula', 'La matricula es obligaria').notEmpty(),
    check('matricula', 'La matricula tiene que ser de 9 digitos').isLength({ min: 9, max: 9 }),
    check('respuesta', 'Si quieres actulizar tu contraseña es obligaria la respuesta que guardaste').notEmpty(),
    check('password', 'Tienes que mandar la nueva contraseña').notEmpty(),
    check('password').custom( validarPassword),
    validarCampos,
], alumnosActulizar)

module.exports = router; 
