import { CreatePedidoType, EstadosPedidoType, OrderType } from "../dtos/pedido.dto.ts";
import { PedidoModel } from "../model/PedidoModel.ts";


export class PedidoRepository {
    static insertPedido = async (dto: Pick<CreatePedidoType, "clientId" | "total" > & { orderDetailIds: string[] }) => {
        const result = await PedidoModel.insertOne(dto);
        return result;
    };

    static findOrders = async (dto: EstadosPedidoType) => {
        const result = await PedidoModel.find({
            estado: { $in: dto }
        });
        return result;
    };

    static updatePedido = async (dto: OrderType) => {
        const pedido = await PedidoModel.findById(dto.id);
        if(!pedido){
            throw new Error(`No se encontró la orden para actualizar`);
        };
        pedido.estado = dto.estado ? dto.estado : "nuevo";
        await pedido.save();
        return pedido;
    };
};