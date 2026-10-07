import z from "zod";

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
    itemId: z.string(),
    cantidad: z.number()
});

const CreateDetailPedidoSchema = DetailPedidoSchema.pick({
    itemId: true,
    cantidad: true
});

const PedidoSchema = z.object({
    id: z.string(),
    clientId: z.string(),
    orderDetailIds: z.array(z.string()),
    total: z.number(),
    estado: z.string().optional()
});

const CreatePedidoSchema = PedidoSchema.pick({
    clientId: true,
    total: true
}).extend({
    orderDetailIds: z.array(CreateDetailPedidoSchema)
})

const ItemSchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    size: z.string(),
    precio: z.number()
})

const CreateItemSchema = ItemSchema.pick({
    name: true,
    size: true,
    precio: true
});

const GetItemSchema = ItemSchema.pick({
    id: true
});

const EstadosPedidoSchema = z.array(z.literal(["nuevo", "en preparación", "enviado", "completado"]));

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
    EstadosPedidoSchema
};