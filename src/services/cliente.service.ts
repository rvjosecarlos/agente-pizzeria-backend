import { CreateClientType } from "../dtos/cliente.dto.ts";
import { ClienteRepository } from "../repositories/cliente.repository.ts";
import { ClientSchema, CreateClientSchema } from "../types/index.ts";

export class ClienteService {
    static addClient = async (dto: CreateClientType) => {
        const result = await ClienteRepository.insertClient(dto);
        const { success, data, error } = ClientSchema.safeParse(result);
        if( !success ){
            throw new Error(`Error al validar la salida de la creacion de usuario CLIENT_SERVICE: ${error.message}`);
        };
        return data;
    };

    static getClients = async () => {
        const result = await ClienteRepository.findClients();
        const { success, data, error } = ClientSchema.array().safeParse(result);
        if( !success ){
            throw new Error(`Error al validar la salida de la consulta de clientes CLIENT_SERVICE: ${error.message}`);
        };
        return data;
    };
};