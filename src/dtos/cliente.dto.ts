import z from "zod";
import { CreateClientSchema } from "../types/index.ts";

type CreateClientType = z.infer<typeof CreateClientSchema>;

export type { CreateClientType };