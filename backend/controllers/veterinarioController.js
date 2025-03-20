import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";

// Registrar Veterinario en DB
const registrarVeterinario = async (req,res) => {
    const {email} = req.body

    // Prevenir usuarios duplicados
    const existeEmail = await Veterinario.findOne({email});

    if(existeEmail) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    // Guardar un Nuevo Veterinario
    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado);
    } catch(error) {
        console.log(error);
    }  
};

// Mostrar el perfil 
const perfilVeterinario = (req, res) => {
    res.json({msg: 'Mostrando Perfil'});
};

// Confirmar Token
const confirmarVeterinario = async (req, res) => {
    const {token} = req.params

    // Encontrar el token del usuario
    const usuarioConfirmar = await Veterinario.findOne({token});

    // Token no valido
    if(!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }

    // Resetear token si esta todo correcto
    try{
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: 'Usuario Confirmado Correctamente'});
    } catch(error) {
        console.log(error);
    }
};

// Login de Veterinarios
const autenticarVeterinario = async (req, res) => {
    const {email, password} = req.body;

    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});

    if(!usuario) {
        const error = new Error('Usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    // Revisar el password
    if(await usuario.comprobarPassword(password)) {
        // Autenticar
        res.json({token: generarJWT(usuario.id)});
    } else {
        const error = new Error('Password Incorrecto');
        return res.status(404).json({msg: error.message});
    }
};

export {
    registrarVeterinario,
    perfilVeterinario,
    confirmarVeterinario,
    autenticarVeterinario,
}