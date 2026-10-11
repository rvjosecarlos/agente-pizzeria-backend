import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller.ts";
import { validateWithZod } from "../middlewares/zodValidator.middleware.ts";
import { errorMiddleware } from "../middlewares/error.middleware.ts";
import { CreateClientSchema } from "../types/index.ts";

const router = Router();

router.post("/client", 
    validateWithZod(CreateClientSchema),
    ClienteController.createClient,
    errorMiddleware
);

router.get("/clients",
    ClienteController.getClients,
    errorMiddleware
);

export default router;