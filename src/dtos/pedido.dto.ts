import z from "zod";
import { CreatePedidoSchema } from "../types/index.ts";

type CreatePedidoType = z.infer<typeof CreatePedidoSchema>;

export type { CreatePedidoType };