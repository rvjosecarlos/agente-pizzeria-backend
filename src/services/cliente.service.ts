import { ClienteRepository } from "../repositories/cliente.repository.ts";

export class ClienteService {
    static addClient = async (dto: any) => {
        const result = await ClienteRepository.insertClient();
    };
};