import z from "zod";
import { CreatePedidoSchema, EstadosPedidoSchema, PedidoSchema } from "../types/index.ts";

type CreatePedidoType = z.infer<typeof CreatePedidoSchema>;
type OrderType = z.infer<typeof PedidoSchema>;
type EstadosPedidoType = z.infer<typeof EstadosPedidoSchema>;

export type { CreatePedidoType, OrderType, EstadosPedidoType };