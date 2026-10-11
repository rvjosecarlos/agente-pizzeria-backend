import { Router } from "express";
import { validateWithZod } from "../middlewares/zodValidator.middleware.ts";
import { CreateOrdenSchema, CreatePedidoSchema, EstadosPedidoSchema, PedidoSchema } from "../types/index.ts";
import { PedidoController } from "../controllers/pedido.controller.ts";
import { errorMiddleware } from "../middlewares/error.middleware.ts";

const router = Router();

router.post("/orden",
    validateWithZod(CreatePedidoSchema),
    PedidoController.crearPedido,
    errorMiddleware
);

router.post("/orden-asistente",
    validateWithZod(CreateOrdenSchema),
    PedidoController.crearOrdenAsistente,
    errorMiddleware
);

router.get("/ordenes",
    //validateWithZod(EstadosPedidoSchema),
    PedidoController.getPedidos,
    errorMiddleware
);

router.put("/orden",
    validateWithZod(PedidoSchema),
    PedidoController.updatePedido,
    errorMiddleware
);

export default router;