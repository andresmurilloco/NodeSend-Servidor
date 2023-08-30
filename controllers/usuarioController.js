const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

exports.nuevoUsuario = async (req,res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body;
    let usuario = await Usuario.findOne({email});
    if(usuario){
        return res.status(400).json({msg:'El usuario ya existe'})
    }

    
    usuario = await new Usuario(req.body);

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    
    try {
        usuario.save();
        res.json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
    }
}