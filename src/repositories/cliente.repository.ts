import { CreateClientType } from "../dtos/cliente.dto.ts";
import { ClienteModel } from "../model/Cliente.model.ts";

export class ClienteRepository {
    static insertClient = async (dto: CreateClientType) => {
        const result = await ClienteModel.insertOne(dto);
        return result;
    };

    static findClients = async () => {
        const result = await ClienteModel.find();
        return result;
    };

    static findClient = async (dto: { numClient: string }) => {
        const result = await ClienteModel.findOne({ phone: dto.numClient });
        return result;
    };
};