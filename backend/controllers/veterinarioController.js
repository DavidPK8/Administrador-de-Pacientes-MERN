import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

// Registrar Veterinario en DB
const registrar = async (req,res) => {
    const {email, nombre} = req.body

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

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado);
    } catch(error) {
        console.log(error);
    }  
};

// Confirmar Token
const confirmar = async (req, res) => {
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
const autenticar = async (req, res) => {
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

// Mostrar el perfil 
const perfil = (req, res) => {
    const {veterinario} = req 

    res.json({veterinario});
};

// Resetear el password
const olvidePassword = async (req, res) => {
    const {email} = req.body;

    const existeVeterinario = await Veterinario.findOne({email});

    if(!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: 'Hemos enviado un email con las instrucciones'});
    } catch(error) {

    }
};

// Validar Token
const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido) {
        // El token es valido el usuario existe
        res.json({msg: 'Token valido y el usuario existe'});
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message});
    }
};

// Asignar un nuevo password
const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if(!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;

        await veterinario.save();
        res.json({msg: "Password modificado correctamente"});
    } catch(error) { 
        console.log(error);
    }
};

export {
    registrar,
    confirmar,
    autenticar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}