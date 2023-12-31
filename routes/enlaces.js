const express = require("express");
const enlacesController = require("../controllers/enlacesController");
const archivosController = require("../controllers/archivosController");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  enlacesController.nuevoEnlace
);

router.get('/:url', enlacesController.ObtenerEnlace, archivosController.eliminarArchivo);

module.exports = router;
