import { CreatePedidoType } from "../dtos/pedido.dto.ts";
import { PedidoRepository } from "../repositories/pedido.repository.ts";
import { CreateDetailPedidoSchema, DetailPedidoSchema, PedidoSchema } from "../types/index.ts";
import { OrderDetailService } from "./detallePedido.service.ts";

export class PedidoService {
    static agregarPedido = async (dto: CreatePedidoType) => {

        const resultOrderDetail = await OrderDetailService.crearDetalleOrden(dto.orderDetailIds);
        const { success: successDetail, error: errorDetail, data: dataDetail } = DetailPedidoSchema.array().safeParse(resultOrderDetail);
        if( !successDetail ){
            throw new Error(`Error al validar la salida al crear el detalle del pedido - PEDIDO_SERVICE ${errorDetail.message}`);
        };

        const orderDetailIds = dataDetail.map( orderDetail => orderDetail.id);
        
        const result = await PedidoRepository.insertPedido({
            clientId: dto.clientId,
            total: dto.total,
            orderDetailIds: orderDetailIds
        });
        const { success, data, error  } = PedidoSchema.safeParse(result);
        if( !success ){
            throw new Error(`Error al validar la salida al crear el pedido - PEDIDO_SERVICE ${error.message}`);
        };
        return data;
    };
};