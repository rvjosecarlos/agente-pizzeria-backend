import z from "zod";
import { createClientSchema } from "../types/index.ts";

type CreateClientType = z.infer<typeof createClientSchema>;

export type { CreateClientType };