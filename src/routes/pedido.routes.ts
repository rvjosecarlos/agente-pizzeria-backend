import { Router } from "express";
import { validateWithZod } from "../middlewares/zodValidator.middleware.ts";
import { CreatePedidoSchema } from "../types/index.ts";
import { PedidoController } from "../controllers/pedido.controller.ts";
import { errorMiddleware } from "../middlewares/error.middleware.ts";

const router = Router();

router.post("/orden",
    validateWithZod(CreatePedidoSchema),
    PedidoController.crearPedido,
    errorMiddleware
);

export default router;