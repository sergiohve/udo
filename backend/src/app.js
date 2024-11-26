import express from "express";
import cors from "cors";
import config from "./config";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import equiposRoutes from "./routes/equipos.routes.js";
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

app.use(productsRoutes);
app.use(authRoutes);
app.use(equiposRoutes);

export default app;
