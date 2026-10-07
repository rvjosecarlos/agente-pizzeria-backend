import z from "zod";
import { CreateDetailPedidoSchema } from "../types/index.ts";

type CreateOrderDetailType = z.infer<typeof CreateDetailPedidoSchema>;

export { CreateOrderDetailType };