import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
// Enviar los datos en formato json
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server ejecutandose en el puerto ${port}`);
});