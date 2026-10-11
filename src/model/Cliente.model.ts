import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICliente extends Document {
    name: string,
    phone: string,
    idConversation: string
};

const ClienteSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true
    },
    idConversation: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

export const ClienteModel = mongoose.model<ICliente>("Cliente",ClienteSchema);