import { CreateOrderDetailType } from "../dtos/detallePedido.dto.ts";
import { OrderDetailRepository } from "../repositories/detallePedido.repository.ts";
import { DetailPedidoSchema } from "../types/index.ts";


export class OrderDetailService {
    static crearDetalleOrden = async (dto: CreateOrderDetailType[]) => {
        const result = await OrderDetailRepository.insertOrderDetail(dto);
        const { success, data, error } = DetailPedidoSchema.array().safeParse(result);
        if( !success ){
            throw new Error(`Error al validar la salida al insertar el detalle del pedido - ORDER_DETAIL: ${error.message}`);
        };
        return data;
    };
};