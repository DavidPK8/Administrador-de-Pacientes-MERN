const registrar = (req,res) => {
    res.send('Desde Veterinarios');
};

const perfil = (req, res) => {
    res.send('Desde perfil veterinarios');
};

export {
    registrar,
    perfil,
}