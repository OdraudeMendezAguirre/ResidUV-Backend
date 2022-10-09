const { Router } = require('express');
const { check } = require('express-validator');
const { residuosPost } = require('../controller/residuos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { prueba, tieneTipo } = require('../middlewares/validar-residuos.js');

const router = Router();

router.post('/calcular', [
    validarJWT,
    // tieneTipo
    tieneTipo('VIDRIO', 'CARTON', 'PAPEL', 'PLASTICO') //Aqui se ingresan los valores permitidos
], residuosPost)


module.exports = router; 