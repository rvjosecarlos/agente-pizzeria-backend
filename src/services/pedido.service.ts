import { CreatePedidoType } from "../dtos/pedido.dto.ts";
import { PedidoRepository } from "../repositories/pedido.repository.ts";
import { CreateDetailPedidoSchema, DetailPedidoSchema, PedidoSchema } from "../types/index.ts";
import { OrderDetailService } from "./detallePedido.service.ts";

export class PedidoService {
    static agregarPedido = async (dto: CreatePedidoType) => {

        const resultOrderDetail = await OrderDetailService.crearDetalleOrden(dto.orderDetailIds);
        const { success: successDetail, error: errorDetail, data: dataDetail } = DetailPedidoSchema.array().safeParse(resultOrderDetail);
        if( !successDetail ){
            console.log({errorDetail})
            throw new Error(`Error al validar la salida al crear el detalle del pedido - PEDIDO_SERVICE ${errorDetail.message}`);
        };
        console.log("PASA LA VALIDACION ZOD EL DETALLE");

        const orderDetailIds = dataDetail.map( orderDetail => orderDetail.id);

        console.log("Se crea el arreglo de ids del detalle", { orderDetailIds });

        const result = await PedidoRepository.insertPedido({
            clientId: dto.clientId,
            total: dto.total,
            orderDetailIds: orderDetailIds
        });

        const formatResult = {
            id: result.id.toString(),
            clientId: result.clientId.toString(),
            orderDetailIds: orderDetailIds,
            total: result.total,
            estado: result.estado
        };
        console.log({ formatResult })
        const { success, data, error  } = PedidoSchema.safeParse(formatResult);
        if( !success ){
            console.log("Error en la validacion zod del pedido", { error });
            throw new Error(`Error al validar la salida al crear el pedido - PEDIDO_SERVICE ${error.message}`);
        };
        return data;
    };
};