const express = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/',[
    check('email', 'Agregue un email valido').isEmail(),
    check('password', 'Agregue una contraseña valido').not().isEmpty(),
] ,authController.autenticarUsuario);
router.get('/', auth ,authController.usuarioAutenticado);

module.exports = router;