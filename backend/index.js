import express from "express";
import conectarDB from "./config/db.js";

const app = express();

conectarDB();

app.use('/', (req, res) => {
    res.send('Hola Mundo');
});

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server ejecutandose en el puerto ${port}`);
});