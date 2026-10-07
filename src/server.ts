import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./config/corsOptions.ts";
import clientRouter from "./routes/cliente.routes.ts";
import itemRouter from "./routes/item.routes.ts";
import pedidoRouter from "./routes/pedido.routes.ts";
import { initDB } from "./config/db.ts";

dotenv.config();

// Conectar con la Base de datos mongo
initDB();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors(corsOptions));


// Rutas
app.use("/api", clientRouter);
app.use("/api", itemRouter);
app.use("/api", pedidoRouter);
app.get("/", (req: express.Request, res: express.Response) => res.send("Servidor vivo!"))

export { app };