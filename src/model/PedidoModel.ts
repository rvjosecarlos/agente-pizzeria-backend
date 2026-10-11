import mongoose, { Date, Document, Schema, Types } from "mongoose";

export interface IPedido {
    clientId: Types.ObjectId,
    orderDetailIds: Types.ObjectId[],
    total: number,
    estado: string
};

const PedidoSchema = new Schema({
    clientId: {
        type: Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    orderDetailIds: [{
        type: Types.ObjectId,
        ref: "OrderDetail",
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        trim: true,
        required: true,
        default: "nuevo"
    },
    origen: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

export const PedidoModel = mongoose.model<IPedido>("Pedido", PedidoSchema);