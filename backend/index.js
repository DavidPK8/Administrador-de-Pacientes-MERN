import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

const app = express();
// Enviar los datos en formato json
app.use(express.json());

dotenv.config();

conectarDB();

app.use('/api/veterinarios', veterinarioRoutes);

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server ejecutandose en el puerto ${port}`);
});