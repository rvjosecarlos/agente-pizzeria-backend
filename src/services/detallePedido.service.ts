import { CreateOrderDetailType } from "../dtos/detallePedido.dto.ts";
import { OrderDetailRepository } from "../repositories/detallePedido.repository.ts";
import { DetailPedidoSchema } from "../types/index.ts";


export class OrderDetailService {
    static crearDetalleOrden = async (dto: CreateOrderDetailType[]) => {
        const result = await OrderDetailRepository.insertOrderDetail(dto);
        const formatResults = result.map( orderDetail => ({ 
            id: orderDetail.id.toString(), 
            itemId: orderDetail.itemId.toString(), 
            cantidad: orderDetail.cantidad }) 
        );
        const { success, data, error } = DetailPedidoSchema.array().safeParse(formatResults);
        if( !success ){
            console.log("ERROR DEL PARSEO", error.message);
            throw new Error(`Error al validar la salida al insertar el detalle del pedido - ORDER_DETAIL: ${JSON.stringify(error.message)}`);
        };
        return data;
    };
};