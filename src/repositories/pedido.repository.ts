import { CreatePedidoType, EstadosPedidoType, OrderType } from "../dtos/pedido.dto.ts";
import { PedidoModel } from "../model/PedidoModel.ts";


export class PedidoRepository {
    static insertPedido = async (dto: Pick<CreatePedidoType, "clientId" | "total" | "origen"> & { orderDetailIds: string[] }) => {
        console.log("DESDE REPO", dto)
        const result = await PedidoModel.insertOne(dto);
        return result;
    };

    static findOrders = async () => {
        const result = await PedidoModel.find({
            estado: { $ne: "cancelado" }
        }).populate([
            { path: "clientId" },
            { path: "orderDetailIds", populate: { path: "itemId" } }
        ]);
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