import z from "zod";
import { CreateDetailPedidoSchema, DetailPedidoSchema } from "../types/index.ts";

type CreateOrderDetailType = z.infer<typeof CreateDetailPedidoSchema>;
type OrderDetailType = z.infer<typeof DetailPedidoSchema>;

export { CreateOrderDetailType, OrderDetailType };