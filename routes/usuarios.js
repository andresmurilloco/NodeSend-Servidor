const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
] ,usuarioController.nuevoUsuario);

module.exports = router;