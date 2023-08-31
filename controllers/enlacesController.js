const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.nuevoEnlace = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre_original } = req.body;

  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;
  if (req.usuario) {
    const { password, descargas } = req.body;
    if (descargas) {
      enlace.descargas = descargas;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    enlace.autor = req.usuario.id;
  }

  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
  } catch (error) {
    console.log(error);
  }
};

//Obtener enlace
exports.ObtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  //Verificar existe enlace
  const enlace = await Enlaces.findOne({ url });
  if (!enlace) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }
  //Si existe
  res.json({ archivo: enlace.nombre });

  //Si descargas = 1, borrar entrada y archivo
  const {descargas, nombre} = enlace;
  if(descargas == 1){
    //Eliminar archivo
    req.archivo = nombre
    //Eliminar entrada
    await Enlaces.findOneAndRemove(req.params.url);
    next();
  } else{
    enlace.descargas--;
    await enlace.save();
  }
  //Si descargas > 1, reducir descargas
};
