import { Types } from "mongoose";
import z from "zod";

const ItemSchema = z.object({
    id: z.union([z.string(), z.instanceof(Types.ObjectId)]),
    name: z.string(),
    size: z.string(),
    precio: z.number()
});

const CreateItemSchema = ItemSchema.pick({
    name: true,
    size: true,
    precio: true
});

const GetItemSchema = ItemSchema.pick({
    id: true
});

const ClientSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string().regex(/\d{10}/, "El número de teléfono debe ser de al menos 10 digitos"),
    idConversation: z.string()
});

const CreateClientSchema = ClientSchema.pick({
    name: true,
    phone: true,
    idConversation: true
});

const DetailPedidoSchema = z.object({
    id: z.string(),
    itemId: z.union([z.string(), z.instanceof(Types.ObjectId)]),
    cantidad: z.number()
});

const GetDetailPedidoSchema = DetailPedidoSchema.pick({
    id: true,
    cantidad: true
}).extend({
    itemId: ItemSchema
});

const CreateDetailPedidoSchema = DetailPedidoSchema.pick({
    itemId: true,
    cantidad: true
});

const PedidoSchema = z.object({
    id: z.union([z.instanceof(Types.ObjectId), z.string()]),
    clientId: z.union([z.instanceof(Types.ObjectId), z.string()]),
    orderDetailIds: z.union([z.array(z.instanceof(Types.ObjectId)), z.array(z.string())]),
    total: z.number(),
    estado: z.string().optional()
});

const GetPedidosSchema = z.object({
    id: z.string(),
    clientId: ClientSchema,
    orderDetailIds: z.array(GetDetailPedidoSchema),
    total: z.number(),
    estado: z.literal(["nuevo", "preparando", "enviado", "completado"])
});

const CreatePedidoSchema = PedidoSchema.pick({
    clientId: true,
    total: true
}).extend({
    orderDetailIds: z.array(CreateDetailPedidoSchema)
});

const EstadosPedidoSchema = z.array(z.literal(["nuevo", "preparando", "enviado", "completado"]));

export { 
    ClientSchema,
    CreateClientSchema,
    PedidoSchema,
    CreatePedidoSchema,
    DetailPedidoSchema,
    CreateDetailPedidoSchema, 
    ItemSchema, 
    CreateItemSchema,
    GetItemSchema,
    EstadosPedidoSchema,
    GetPedidosSchema
};