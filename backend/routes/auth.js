const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login', [
    check('matricula', 'La matricula es obligaria').notEmpty(),
    check('password', 'La contraseña es obligaria').notEmpty(),
    validarCampos
], login)


module.exports = router; 