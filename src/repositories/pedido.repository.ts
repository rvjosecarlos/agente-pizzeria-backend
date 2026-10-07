import { CreatePedidoType } from "../dtos/pedido.dto.ts";
import { PedidoModel } from "../model/PedidoModel.ts";


export class PedidoRepository {
    static insertPedido = async (dto: Pick<CreatePedidoType, "clientId" | "total" > & { orderDetailIds: string[] }) => {
        const result = await PedidoModel.insertOne(dto);
        return result;
    };
};