import { CreateClientType } from "../dtos/cliente.dto.ts";
import { ClienteModel } from "../model/Cliente.model.ts";

export class ClienteRepository {
    static insertClient = async (dto: CreateClientType) => {
        const result = await ClienteModel.insertOne(dto);
        return result;
    };
};