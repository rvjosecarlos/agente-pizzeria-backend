import mongoose, { Document, Schema, Types } from "mongoose";

export interface IItem extends Document {
    name: string,
    size: string,
    precio: number
};

const ItemSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    size: {
        type: String,
        trim: true,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        default: 0.0
    }
}, { timestamps: true });

export const ItemModel = mongoose.model<IItem>("Item", ItemSchema);