import mongoose, { Schema, Types, Document } from "mongoose";

export interface IOrderDetail extends Document {
    itemId: Types.ObjectId,
    cantidad: number
};

const OrderDetailSchema = new Schema({
    itemId: {
        type: Types.ObjectId,
        ref: "Item",
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const OrderDetailModel = mongoose.model<IOrderDetail>("OrderDetail", OrderDetailSchema);