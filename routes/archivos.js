const express = require('express');
const archivosController = require('../controllers/archivosController');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/',auth,
archivosController.subirArchivo);

module.exports = router;