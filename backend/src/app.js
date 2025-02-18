import express from "express";
import cors from "cors";
import config from "./config";
import gestionUnidadesRoutes from "./routes/gestionUnidades.routes";
import authRoutes from "./routes/auth.routes";
import equiposRoutes from "./routes/equipos.routes.js";
import piezasRoutes from "./routes/piezas.routes.js";
const app = express();


app.use(cors({
    origin: "http://localhost:3000"
}))

let port;
//settings
app.set("port", config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(equiposRoutes);
app.use(gestionUnidadesRoutes);
app.use(piezasRoutes);

export default app;
