import z from "zod";
import { CreateItemSchema, GetItemSchema, ItemSchema } from "../types/index.ts";

type CreateItemType = z.infer<typeof CreateItemSchema>;
type GetItemType = z.infer<typeof GetItemSchema>;
type ItemType = z.infer<typeof ItemSchema>;

export type { CreateItemType, GetItemType, ItemType };